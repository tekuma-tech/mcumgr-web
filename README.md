# MCU Manager (Web Bluetooth and Web Serial)

This tool is the Web Bluetooth and Web Serial version of MCU Manager that enables a user to communicate with and manage remote devices running the Mynewt OS and Zephyr RTOS. It uses a connection profile to establish a connection with a device and sends command requests to the device.

The main focus is implementing firmware updates via Web Bluetooth and Web Serial, however other commands might be supported as well.

The Web Bluetooth API provides the ability to connect and interact with Bluetooth Low Energy peripherals. You’ll find Web Bluetooth:
- on the desktop (or laptop) in Chrome, Edge and Opera browsers (make sure you have the latest)
- on Android phones in Chrome (perhaps in Edge or Opera?)
- on iOS or iPadOS there is [Bluefy](https://apps.apple.com/hu/app/bluefy-web-ble-browser/id1492822055) that seems to be working.

The Web Serial API provides the ability to connect and interact with Serial peripherals. This API is on chromium based web browers. See https://developer.mozilla.org/en-US/docs/Web/API/Serial#browser_compatibility for a full list. 

You can try MCU Manager by visiting https://tekuma-tech.github.io/mcumgr-web/ with a supported browser. For security reasons, Web Bluetooth and Web Serial is only working on https addresses or localhost.

## Setting up on your machine

You will need a web server to serve the files. If you have Python, just start `python -m http.server 8000` in the project's root, and you can visit http://localhost:8000/.
