# http://www.xicidaili.com/nt
···js
var result = [];
var eles = document.querySelectorAll('#ip_list tr + tr')
for (var i = 0; i < eles.length; i++) {
  result.push(eles[i].children[2].innerHTML + ':' + eles[i].children[3].innerHTML);
}
result.join(',')
```


# http://www.haodailiip.com/guonei
···js
var result = [];
var eles = document.querySelectorAll('.proxy_table tr + tr')
for (var i = 0; i < eles.length; i++) {
  result.push((eles[i].children[0].innerHTML + ':' + eles[i].children[1].innerHTML).replace(/[\r\n\s]*/g, ''));
}
result.join(',')
```

# https://www.us-proxy.org/
···js
var result = [];
var eles = document.querySelectorAll('#proxylisttable tbody tr')
for (var i = 0; i < eles.length; i++) {
  result.push((eles[i].children[0].innerHTML + ':' + eles[i].children[1].innerHTML).replace(/[\r\n\s]*/g, ''));
}
result.join(',')
```


# http://proxylist.hidemyass.com/
···js
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

  result.push(ip + ':' + eles[i].children[2].innerHTML);
}
result.join(',')
```
