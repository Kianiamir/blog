#!/usr/bin/env bash

#------------------------------------------------------------------------------
# Builds the Hugo site for Cloudflare Workers deployment.
# https://gohugo.io/host-and-deploy/host-on-cloudflare/
#------------------------------------------------------------------------------

set -euo pipefail

build_temp_dir=""

cleanup() {
  if [[ -n "${build_temp_dir}" && -d "${build_temp_dir}" ]]; then
    rm -rf "${build_temp_dir}"
  fi
}

trap cleanup EXIT SIGINT SIGTERM

main() {
  DART_SASS_VERSION=1.101.0
  GO_VERSION=1.26.4
  HUGO_VERSION=0.163.3
  NODE_VERSION=24.16.0

  export TZ=UTC
  export HUGO_CACHEDIR="${PWD}/.cache/hugo"

  build_temp_dir=$(mktemp -d)
  pushd "${build_temp_dir}" > /dev/null

  mkdir -p "${HOME}/.local"

  echo "Installing Dart Sass ${DART_SASS_VERSION}..."
  curl -sLO "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
  tar -C "${HOME}/.local" -xf "dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
  export PATH="${HOME}/.local/dart-sass:${PATH}"

  echo "Installing Go ${GO_VERSION}..."
  curl -sLO "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz"
  tar -C "${HOME}/.local" -xf "go${GO_VERSION}.linux-amd64.tar.gz"
  export PATH="${HOME}/.local/go/bin:${PATH}"

  echo "Installing Hugo Extended ${HUGO_VERSION}..."
  curl -sLO "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
  mkdir -p "${HOME}/.local/hugo"
  tar -C "${HOME}/.local/hugo" -xf "hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
  export PATH="${HOME}/.local/hugo:${PATH}"

  echo "Installing Node.js ${NODE_VERSION}..."
  curl -sLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz"
  tar -C "${HOME}/.local" -xf "node-v${NODE_VERSION}-linux-x64.tar.gz"
  export PATH="${HOME}/.local/node-v${NODE_VERSION}-linux-x64/bin:${PATH}"

  popd > /dev/null

  echo "Verifying installations..."
  echo "Dart Sass: $(sass --version)"
  echo "Go: $(go version)"
  echo "Hugo: $(hugo version)"
  echo "Node.js: $(node --version)"

  echo "Configuring Git..."
  git config --global core.quotepath false
  if [ "$(git rev-parse --is-shallow-repository)" = "true" ]; then
    git fetch --unshallow
  fi

  echo "Initializing git submodules..."
  git submodule update --init --recursive

  if [ -f package-lock.json ]; then
    echo "Installing Node.js dependencies..."
    npm ci
  fi

  echo "Building the site..."
  hugo build --gc --minify
}

main "$@"
