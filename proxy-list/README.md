# demo

```js
var request = require('request');
var ips = '106.75.197.134:8081,117.21.182.110:80';
ips = ips.split(',');

var sendRequest = function(i) {
	if (i >= ips.length) return;

	process.env.HTTP_PROXY = 'http://' + ips[i];
	// request('http://ip.chinaz.com/getip.aspx', {timeout: 1500}, function (error, response, body) {
	//   if (!error && response.statusCode == 200) {
	//     console.log(body);
	//   } else {
	//   	console.log(error)
	//   }


	  request('http://xhs.easy-cp.com:8080/newNetLottery_web3g/toupiao/insertDetail?userId=35', {timeout: 10000}, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log(body);
		  } else {
		  	console.log(error)
		  }

      sendRequest(i + 1)
		})

	// })

}

sendRequest(0);

```

demo2
```js
var request = require('request');
var ips = [];

var sendRequest = function(i) {
	if (i >= ips.length) {
    getIPs();
    return;
  }

	process.env.HTTP_PROXY = 'http://' + ips[i];

  request('http://xhs.easy-cp.com:8080/newNetLottery_web3g/toupiao/insertDetail?userId=35', {timeout: 2000}, function (error, response, body) {
    console.log(ips[i] + " RESULT:")
	  if (!error && response.statusCode == 200) {
	    console.log(body);
	  } else {
	  	console.log(error)
	  }

    sendRequest(i + 1)
	})
}

var getIPs = function() {

  // request('https://kingproxies.com/api/v2/proxies.json?key=freesample&alive=1&protocols=&type=&country_code=', function(error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     body = JSON.parse(body)
  //     body = body.data;
  //     for (var i = 0; i < body.proxies.length; i++) {
  //       ips.push(body.proxies[i].ip + ':' + body.proxies[i].port)
  //     }
  //     console.log(ips)
  //     sendRequest(0)
  //   } else {
  //     console.log('getIPS ERROR:')
  //     console.log(error)
  //     setTimeout(function(){
  //       getIPs();  
  //     }, 2000)
      
  //   }
  // })

  request('http://www.66ip.cn/mo.php?tqsl=100', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      ips = body.match(/\d*\.\d*\.\d*\.\d*:\d*/g);
      console.log('getIPs RESULT:')
      console.log(ips);
      sendRequest(0);
    } else {
      console.log('getIPS ERROR:')
      console.log(error)
      setTimeout(function(){
        getIPs();  
      }, 2000)
      
    }
  })

}

getIPs();
```


# http://www.xicidaili.com/nt

```js
var result = [];
var eles = document.querySelectorAll('#ip_list tr + tr')
for (var i = 0; i < eles.length; i++) {
  result.push(eles[i].children[2].innerHTML + ':' + eles[i].children[3].innerHTML);
}
result.join(',')
```


# http://www.haodailiip.com/guonei

```js
var result = [];
var eles = document.querySelectorAll('.proxy_table tr + tr')
for (var i = 0; i < eles.length; i++) {
  result.push((eles[i].children[0].innerHTML + ':' + eles[i].children[1].innerHTML).replace(/[\r\n\s]*/g, ''));
}
result.join(',')
```

# https://www.us-proxy.org/

```js
var result = [];
var eles = document.querySelectorAll('#proxylisttable tbody tr')
for (var i = 0; i < eles.length; i++) {
  result.push((eles[i].children[0].innerHTML + ':' + eles[i].children[1].innerHTML).replace(/[\r\n\s]*/g, ''));
}
result.join(',')
```


# http://proxylist.hidemyass.com/

```js
var result = [];
var eles = document.querySelectorAll('#listable tbody tr')
i = 0;
for (var i = 0; i < eles.length; i++) {
  var ip = '';

  var ele = eles[i].children[1].children[0];
  for (var j = 0; j < ele.childNodes.length; j++) {

    var node = ele.childNodes[j];
    var style = {};
    try {
      style = getComputedStyle(node);
    } catch (e) {}

    if (node.nodeName === '#text') {
      ip += node.textContent;
    } else if (node.nodeName !== 'STYLE' && style.display !== 'none') {
      ip += node.innerHTML;
    } else {
      console.log(style.display);
    }
  }

  result.push((ip + ':' + eles[i].children[2].innerHTML).replace(/\s/g, ''));
}
result.join(',')
```
