{
  description = "E2E visual-regression tests for nenasilje.org (Playwright)";

  inputs = {
    # Resolves via the flake registry to the nixpkgs revision pinned on this
    # machine; recorded in flake.lock for reproducibility.
    nixpkgs.url = "nixpkgs";
  };

  outputs =
    { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" ];
      forAllSystems = f:
        builtins.foldl' (acc: system: acc // { ${system} = f system; }) { } systems;

      perSystem = system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          npmPw = (builtins.fromJSON (builtins.readFile ./package.json)).devDependencies."@playwright/test";
          # The npm @playwright/test version and nixpkgs' playwright version
          # must match exactly: nixpkgs' prebuilt browser store is generated
          # for its own playwright version, and playwright looks up browser
          # revisions by its own version.
          checkPwVersions = if pkgs.playwright.version != npmPw then
            throw ''
              Version mismatch: package.json pins @playwright/test "${npmPw}"
              but nixpkgs (flake.lock) provides playwright "${pkgs.playwright.version}".
              Align them, then run: nix flake lock && npm install --package-lock-only
            ''
          else
            null;
          # Prebuilt Playwright browsers from nixpkgs (chromium + headless
          # shell + ffmpeg), autopatchelf'd so they run on NixOS.
          browsers = builtins.seq checkPwVersions (pkgs.playwright.selectBrowsers {
            withFirefox = false;
            withWebkit = false;
          });
        in
        {
          inherit pkgs browsers;
        };
    in
    {
      devShells = forAllSystems (
        system:
        let
          p = perSystem system;
          pkgs = p.pkgs;
          browsers = p.browsers;
        in
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.nodejs_24
              browsers
            ];

            shellHook = ''
              export PLAYWRIGHT_BROWSERS_PATH="${browsers}"
              # Install npm dependencies on first shell entry (gitignored).
              if [[ ! -d node_modules ]]; then
                echo "Installing npm dependencies (npm ci)..."
                npm ci
              fi
            '';
          };
        }
      );

      # Run the suite:      nix run .#tests
      # With playwright args: nix run .#tests -- --list
      apps = forAllSystems (
        system:
        let
          p = perSystem system;
          pkgs = p.pkgs;
          browsers = p.browsers;
        in
        {
          tests = {
            type = "app";
            program = "${pkgs.writeShellApplication {
              name = "run-pw-tests";
              runtimeInputs = [ pkgs.nodejs_24 browsers ];
              text = ''
                export PLAYWRIGHT_BROWSERS_PATH="${browsers}"
                if [[ ! -f package.json ]]; then
                  echo "error: run 'nix run .#tests' from the project root (E2ETestsNenasilje)" >&2
                  exit 1
                fi
                if [[ ! -d node_modules ]]; then
                  npm ci
                fi
                npx playwright test "$@"
              '';
            }}/bin/run-pw-tests";
          };
        }
      );
    };
}