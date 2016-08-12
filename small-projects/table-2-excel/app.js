console.log('This is app.js');

chrome.extension.sendRequest({"request": "this is app.js"}, function(d){
  console.log('After sending request to extension, you can get response from background.js')
  console.log(d)
});
