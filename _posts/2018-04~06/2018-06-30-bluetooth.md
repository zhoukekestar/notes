---
layout: post
title:  "蓝牙小记"
date:   2018-06-30
tags: [notes]
commentIssueId: 87
---



蓝牙小记，Web Bluetooth Test。

## GATT

> The Generic Attributes (GATT) define a hierarchical data structure that is exposed to connected Bluetooth Low Energy (LE) devices.
>
> GATT profiles enable extensive innovation while still maintaining full interoperability with other *Bluetooth®* devices. The profile describes a use case, roles and general behaviors based on the GATT functionality. Services are collections of characteristics and relationships to other services that encapsulate the behavior of part of a device. This also includes hierarchy of services, characteristics and attributes used in the attribute server. 
>
> GATT is built on top of the Attribute Protocol (ATT) (see Bluetooth Core System Architecture for block diagram and explanations), which uses GATT data to define the way that two Bluetooth Low Energy devices send and receive standard messages. Note that GATT is not used in Bluetooth BR/EDR implementations, which use only adopted profiles. <sup>1<sup>



GATT 定义了一个由 BLE (Bluetooth Low Energy) 提供的分层数据结构。

GATT 协议使得设备有更好扩展的同时，也能维护一整套和其他蓝牙设备的交互。

分层图大致如下：

![gatt profile hierarchy](https://user-images.githubusercontent.com/7157346/42125224-1e8ca364-7ca5-11e8-909d-3a6f894f35ff.png)

从图中也能看出，读取蓝牙设备信息的大致步骤

* 连接蓝牙，也就是连接 GATT Server
* 获取对应 service，一个蓝牙设备可能有多个 service，比如：电量，血压、心跳频率等等
* 获取 service 下的 characterristic，比如：电量水平，血压单位（毫米汞柱，千帕），血压数值等
* 读取数据，解析即可



## Demo

![jun-30-2018 18-46-19](https://user-images.githubusercontent.com/7157346/42124485-17aefb78-7c96-11e8-9841-458edad97a60.gif)

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
    body.scan img {
        display: none;
    }
    body.scan button {
      display: none;
    }
    body.scan .radar {
      display: block;
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
    
          document.querySelector('.result').innerHTML = `${bluetoothDevice.name} Battery: ${dataView.getInt8(0)}`;
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



## Demo Code

```js
      navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          0x180F, // battery_service https://www.bluetooth.com/specifications/gatt/services
        ]
      }).then(device => {
        // 连接蓝牙
        return device.gatt.connect();
      }).then(server => {
        // battery_service https://www.bluetooth.com/specifications/gatt/services
        // 获取蓝牙指定服务
        return server.getPrimaryService(0x180F);
      }).then(service => {
        // battery_level https://www.bluetooth.com/specifications/gatt/characteristics
        // 获取服务指定 characteristic
        return service.getCharacteristic(0x2A19);
      }).then(characteristic => {
        // 读取数值
        return characteristic.readValue();
      }).then(dataView => {
        console.log(dataView.getInt8(0));
      }).catch(err => {
        console.log(err);
      });
```



## iPhone 蓝牙服务简析

* `0000180a-0000-1000-8000-00805f9b34fb`  `0x180A` Device Information

  * `00002a24-0000-1000-8000-00805f9b34fb`  `0x2A24` model number:  `iPhone9,2`
  * `00002a29-0000-1000-8000-00805f9b34fb` `0x2A29` manufacturer name string: `Apple Inc.`

* `00001805-0000-1000-8000-00805f9b34fb` `0x1815` Automation IO

  * `00002a0f-0000-1000-8000-00805f9b34fb` Local Time Information: `0x2000`

    > 根据[官网描述](https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.characteristic.time_zone.xml) ，前8bit 为 TimeZone，并以 15 分钟为单位
    >
    > 0x20 * 15 / 60 = 8, 也就是东 8 区，正确

  * `00002a2b-0000-1000-8000-00805f9b34fb` Current Time: `0xe207061e151e1006ef02`

    > 0xe207：这个值不确定了，2018的16 进制为 0x07e2，不知道是不是前后8位要互调一下
    >
    > 0x06：6月
    >
    > 0x1e：30号
    >
    > 0x15：9点
    >
    > 0x1e：30分

* `0000180f-0000-1000-8000-00805f9b34fb` `0x180F` Battery Service

  * `00002a19-0000-1000-8000-00805f9b34fb` Battery Level: `52`

* `9fa480e0-4967-4542-9390-d343dc5d04ae` custom service

  * `af0badb1-5b99-43cd-917a-a77bc549e3cc` 

* `d0611e78-bbb4-4591-a5f8-487910ae4366` custom service

  * `8667556c-9a37-4c91-84ed-54ee27d90049` 



## 调试小技巧

Chrome 打开 `chrome://bluetooth-internals` 

要是一直连不上，说明之前的连接被刷新了，但在后台还连着，重启 chrome 即可

## References

1. [GATT Overview](https://www.bluetooth.com/specifications/gatt/generic-attributes-overview)
2. [Interact with BLE devices on the Web](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web)
3. [Bluetooth APIs](https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice)
4. [automatic-reconnect](https://googlechrome.github.io/samples/web-bluetooth/automatic-reconnect.html)
5. [GATT Profile 简介](https://www.race604.com/gatt-profile-intro/)