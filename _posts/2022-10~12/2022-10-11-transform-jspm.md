---
layout: post
title:  "@jspm/core systemjs"
date:  2022-10-11
tags: [note]
---

  transfrom @jspm/core to systemjs and load it by `systemjs.1688.com`

# rollup

```js
import * as globby from 'globby';

const configs = globby.globbySync('./nodelibs/**/*.js').map(inputFile => {
  console.log(inputFile);
  return {
    input: inputFile,
    plugins: [
      {
        name: 'extra',
        async resolveId(id, importer) {
          if (!importer) return null;
          return { id, external: true };
        }
      }
    ],
    output: {
      file: inputFile.replace('nodelibs', 'nodelibs2'),
      format: 'systemjs',
    },
  };
});

export default configs;
```

# CDN

  so you can load it by `systemjs.1688.com`

```js
System.import('https://systemjs.1688.com/@jspm/core@2.0.0-beta.24/nodelibs/browser/querystring.js');
```

