#!/bin/bash
# SessionStart hook for Claude Code on the web / Remote Control.
# Installs dependencies so the linter is ready before the session begins.
set -euo pipefail

cd "$CLAUDE_PROJECT_DIR"

# Only do remote-env setup when running in Claude Code on the web.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Idempotent: npm install is safe to re-run and benefits from container caching.
npm install

echo "ERSUS Astra session ready: lint via 'npm run lint', preview via 'npm run serve'."
