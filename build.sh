#!/bin/bash

build() {
    echo 'building react'

    rm -rf dist/*

    # export NODE_OPTIONS=--openssl-legacy-provider
    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    npm run-script build

    mkdir -p dist
    cp -r build/* dist

    rm -rf build/

    mv dist/index.html dist/popup.html

    cp manifest.json dist/manifest.json
    cp icon.png dist/icon.png
    cp options.js dist/options.js
    cp options.html dist/options.html
    cp options.css dist/options.css
    cp background.js dist/background.js

    rm dist/service-worker.js
    rm dist/precache-manifest.b1994a7600307fabe53aeff11899ce66.js
}

build