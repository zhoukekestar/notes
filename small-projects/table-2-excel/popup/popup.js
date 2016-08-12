btnRunCodeOnExtension.onclick = function() {

  var noti = new Notification('通知标题', {icon: "../icon.png", body: "通知消息"});
  noti.onclose = function() {
    console.log('Notification: close');
  }
  noti.onclick = function() {
    console.log('Notification: click');
    // noti.close();
  }

}

btnRunCodeOnPage.onclick = function() {
  var code = function() {
    console.log('Run code on page.');
    try {
      toast('Run code on page.');
    } catch (e) {
      alert('Run code on page.')
    }

  }
  chrome.tabs.executeScript(null, {code: '!(' + code.toString() + ')();'});
}

btnOptions.onclick = function() {
  chrome.tabs.create({url:"./../options/options.html"});
}
