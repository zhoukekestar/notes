---
layout: post
title:  "蓝牙小记"
date:   2018-06-24
tags: [notes]
commentIssueId: 87
---



蓝牙小记，Web Bluetooth Test。



## Demo

请使用最新的 Chrome 打开此页面。

<style>
    .radar {
      height: 1px;
      width: 1px;
    }

    button.checkBattery {
      position: relative;
      left: 50%;
      width: 300px;
      font-size: 30px;
      margin-left: -150px;
      padding: 20px;
      border-radius: 5px;
    }
    body.scan, body.scan * {
      background-color: black !important;
      color: #000 !important;
      border-color: #000 !important;
    }
    .scan button {
      display: none;
    }
    .scan .radar {
      width: 100%;
      height: auto;
      margin-top: -300px;
    }
    /* 结果页 */
    .result {
      display: none;
    }
    .checked button,
    .checked .radar {
      display: none;
    }
    .checked .result{
      display: block;
      font-size: 30px;
      top: 50%;
      text-align: center;
      width: 100%;
      margin-top: -30px;
      padding: 50px;
    }
  </style>
  <button class='checkBattery' onclick='onButtonClick()'>Check Battery</button>
  <img class='radar' src='https://user-images.githubusercontent.com/7157346/42122910-c7ec5906-7c7b-11e8-900d-1f330cf0a176.gif' />
  <p class='result'></p>
  <script>
    var bluetoothDevice;

    /**
     * 蓝牙必须由用户手动触发才可以
     */
    function onButtonClick() {
      document.body.classList.add('scan');
      bluetoothDevice = null;

      navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          0x180F, // battery_service https://www.bluetooth.com/specifications/gatt/services
        ]
      }).then(device => {
        console.log(`device name: ${device.name}`);
        bluetoothDevice = device;
        device.addEventListener('gattserverdisconnected', () => {
          console.log('> Bluetooth Device disconnected & re-connect');
          device.gatt.connect();
          console.log('> Bluetooth connected');
        });
        return device.gatt.connect();
      }).then(server => {
        // battery_service https://www.bluetooth.com/specifications/gatt/services
        return server.getPrimaryService(0x180F);
      }).then(service => {
        // battery_level https://www.bluetooth.com/specifications/gatt/characteristics
        return service.getCharacteristic(0x2A19);
      }).then(characteristic => {
        return characteristic.readValue();
      }).then(dataView => {
        setTimeout(() => {

          document.querySelector('.result').innerHTML = `Current Battery: ${dataView.getInt8(0)}`;
          document.body.classList.remove('scan');
          document.body.classList.add('checked');
        }, 3000)
        // let decoder = new TextDecoder('utf-8');
        // console.log('val: ' + decoder.decode(val));
        // console.log()
        // for (var i = 0; i < 16; i++) {
        //   try {

        //     var descriptor = await characteristic.getDescriptor(0x2900 + i);
        //     console.log('i = ' + i);
        //     var value = await descriptor.readValue();
        //     let decoder = new TextDecoder('utf-8');
        //     console.log('User Description: ' + decoder.decode(value));
        //   } catch (e) {
        //     console.log(i + ' not work');
        //   }
        // }
      }).catch(err => {
        console.log(err);
      });
    }
  </script>



## Simple Code

```js
var bluetoothDevice;

navigator.bluetooth.requestDevice({  
    acceptAllDevices: true
}).then(device => { 
    console.log(`device name: ${device.name}`);
    return device.gatt.connect()
}).catch(err => {
    console.log(err);
})

```



## 调试小技巧

Chrome 打开 `chrome://bluetooth-internals` 

## References

* [GATT Overview](https://www.bluetooth.com/specifications/gatt/generic-attributes-overview)
* [Interact with BLE devices on the Web](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web)
* [Bluetooth APIs](https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice)
* [automatic-reconnect](https://googlechrome.github.io/samples/web-bluetooth/automatic-reconnect.html)