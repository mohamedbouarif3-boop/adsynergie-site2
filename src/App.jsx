12:58:04 AM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
12:58:03 AM: Netlify Build                                                 
12:58:03 AM: ────────────────────────────────────────────────────────────────
12:58:03 AM: ​
12:58:03 AM: ❯ Version
12:58:03 AM:   @netlify/build 35.2.11
12:58:03 AM: ​
12:58:03 AM: ❯ Flags
12:58:03 AM:   accountId: 69069df5351e068cfa798b5a
12:58:03 AM:   baseRelDir: true
12:58:03 AM:   buildId: 69069e73d8051371aa5f6ae8
12:58:03 AM:   deployId: 69069e73d8051371aa5f6aea
12:58:03 AM: ​
12:58:03 AM: ❯ Current directory
12:58:03 AM:   /opt/build/repo
12:58:03 AM: ​
12:58:03 AM: ❯ Config file
12:58:03 AM:   /opt/build/repo/netlify.toml
12:58:03 AM: ​
12:58:03 AM: ❯ Context
12:58:03 AM:   production
12:58:03 AM: ​
12:58:03 AM: build.command from netlify.toml                               
12:58:03 AM: ────────────────────────────────────────────────────────────────
12:58:03 AM: ​
12:58:03 AM: $ npm run build
12:58:03 AM: > adsynergie-site@0.0.1 build
12:58:03 AM: > vite build
12:58:03 AM: vite v5.4.21 building for production...
12:58:03 AM: transforming...
12:58:04 AM: ✓ 4 modules transformed.
12:58:04 AM: x Build failed in 360ms
12:58:04 AM: error during build:
12:58:04 AM: [vite:esbuild] Transform failed with 1 error:
12:58:04 AM: /opt/build/repo/src/App.jsx:280:0: ERROR: Unterminated string literal
12:58:04 AM: file: /opt/build/repo/src/App.jsx:280:0
12:58:04 AM: 
12:58:04 AM: Unterminated string literal
12:58:04 AM: 278|          <section ref={ref} className="py-10">
12:58:04 AM: 279|              <div className={`max-w-4xl mx-auto grid grid-cols-3 gap
280|  
   |  ^

    at failureErrorWithLog (/opt/build/repo/node_modules/esbuild/lib/main.js:1472:15)
    at /opt/build/repo/node_modules/esbuild/lib/main.js:755:50
    at responseCallbacks.<computed> (/opt/build/repo/node_modules/esbuild/lib/main.js:622:9)
    at handleIncomingPacket (/opt/build/repo/node_modules/esbuild/lib/main.js:677:12)
    at Socket.readFromStdout (/opt/build/repo/node_modules/esbuild/lib/main.js:600:7)
    at Socket.emit (node:events:519:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Readable.push (node:internal/streams/readable:392:5)
    at Pipe.onStreamRead (node:internal/stream_base_commons:189:23)
​
12:58:04 AM: "build.command" failed                                        
12:58:04 AM: ────────────────────────────────────────────────────────────────
12:58:04 AM: ​
12:58:04 AM:   Error message
12:58:04 AM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
12:58:04 AM: ​
12:58:04 AM:   Error location
12:58:04 AM:   In build.command from netlify.toml:
12:58:04 AM:   npm run build
12:58:04 AM: ​
12:58:04 AM:   Resolved config
12:58:04 AM:   build:
12:58:04 AM:     command: npm run build
12:58:04 AM:     commandOrigin: config
12:58:04 AM:     publish: /opt/build/repo/dist
12:58:04 AM:     publishOrigin: config
12:58:04 AM:   redirects:
12:58:04 AM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
12:58:04 AM: Build failed due to a user error: Build script returned non-zero exit code: 2
12:58:04 AM: Failing build: Failed to build site
12:58:04 AM: Finished processing build request in 15.392s
