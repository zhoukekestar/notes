---
layout: post
title:  "My Snippets"
date:   2017-09-12
tags: [js]
commentIssueId: 54
---

IDE:
* VSCode
* Atom

# Atom

```

'.source.js':
  'rax init':
    'prefix': 'rax-init'
    'body':
      '''
      import { createElement, Component } from 'rax';
      import View from 'rax-view';
      import Text from 'rax-text';

      class $1 extends Component {
        state = {
        };

        constructor() {
        }

        render() {
          return (
            <View>
            </View>
          );
        }
      }
      export default $1;
      '''

```

## VSCode

### JavaScript
```
{
	"rax init": {
		"prefix": "rax-init",
		"body": [
			"import { createElement, Component } from 'rax';",
			"import View from 'rax-view';",
			"import Text from 'rax-text';",
			"",
			"class $1 extends Component {",
			"\tstate = {",
			"\t};",
			"",
			"\tconstructor(props, ctx) {",
			"\t\tsuper(props, ctx);",
			"\t}",
			"",
			"\trender() {",
			"\t\treturn (",
			"\t\t\t<View>",
			"\t\t\t</View>",
			"\t\t);",
			"\t}",
			"}",
			"export default $1;"
		],
		"description": "init rax"
	}
}
```

### HTML

```
{
	"html init": {
		"prefix": "html-init",
		"body": [
			"<html>",
			"<head>",
			"\t<title>$1</title>",
			"\t<meta charset=\"utf-8\">",
			"\t<meta name=\"viewport\" content=\"width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no\">",
			"</head>",
			"<body>",
			"\t$2",
			"</body>",
			"</html>"
		]
	}
}
```
