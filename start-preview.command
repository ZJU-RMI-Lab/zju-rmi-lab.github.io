#!/bin/zsh
# Double-click in Finder, or run: zsh start-preview.command
cd "${0:A:h}" || exit 1
export ASTRO_TELEMETRY_DISABLED=1
if [[ -x .local/node/bin/node ]]; then
  export PATH="$PWD/.local/node/bin:$PATH"
elif ! command -v node >/dev/null 2>&1; then
  print 'Please install Node.js 24 LTS from https://nodejs.org, then run this file again.'
  read -r '?Press Enter to close.'
  exit 1
fi
if [[ ! -d node_modules/astro ]]; then
  npm ci || exit 1
fi
print 'RMI Lab preview: http://localhost:4321'
print 'Keep this window open. Press Control+C to stop the preview.'
node node_modules/astro/bin/astro.mjs dev --host 127.0.0.1 --port 4321 --open
