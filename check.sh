#!/usr/bin/env bash

set -u

PASS_COUNT=0
FAIL_COUNT=0

ok() {
  printf "✅ %s\n" "$1"
  PASS_COUNT=$((PASS_COUNT + 1))
}

ng() {
  printf "❌ %s\n" "$1"
  FAIL_COUNT=$((FAIL_COUNT + 1))
}

check_command() {
  local cmd="$1"
  if command -v "$cmd" >/dev/null 2>&1; then
    ok "$cmd: found ($(command -v "$cmd"))"
  else
    ng "$cmd: not found"
  fi
}

check_npm_package() {
  local pkg="$1"
  if npm ls "$pkg" --depth=0 >/dev/null 2>&1; then
    ok "npm package installed: $pkg"
  else
    ng "npm package missing: $pkg"
  fi
}

echo "=== Command Check ==="
check_command git
check_command node
check_command npm
echo

if [ ! -f "package.json" ]; then
  ng "package.json not found in current directory: $(pwd)"
  echo
  echo "=== Result ==="
  if [ "$FAIL_COUNT" -eq 0 ]; then
    echo "ALL CHECKS PASSED ($PASS_COUNT passed)"
    exit 0
  else
    echo "CHECKS FAILED ($FAIL_COUNT failed, $PASS_COUNT passed)"
    exit 1
  fi
fi

if [ ! -d "node_modules" ]; then
  ng "node_modules not found (npm install not done yet?)"
fi

echo "=== npm Package Check ==="
check_npm_package "@supabase/supabase-js"
check_npm_package "@google/genai"
check_npm_package "@google/generative-ai"
echo

echo "=== Result ==="
if [ "$FAIL_COUNT" -eq 0 ]; then
  echo "ALL CHECKS PASSED ($PASS_COUNT passed)"
  exit 0
else
  echo "CHECKS FAILED ($FAIL_COUNT failed, $PASS_COUNT passed)"
  exit 1
fi
