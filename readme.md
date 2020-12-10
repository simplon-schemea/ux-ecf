## UX ECF

- `lighthouse.html` lighthouse report for `index.html`
- `lighthouse.min.html` lighthouse report for `dist/index.html` the minified version of `index.html`
- `wireframes` folder containing the wireframes

#### Generate Lighthouse Report

run the `server.js` (lighthouse does not support the `file` protocol) with
```shell script
node server.js [--min] [--port NUMBER]
```

##### flags
- `--min` serve `dist/index.html` instead of `index.html`
- `--port` specify the port, default to `PORT` environment variable if set, otherwise use `8080`
