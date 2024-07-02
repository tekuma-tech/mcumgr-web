const CSI_HEX = [0x1B, 0x5B];

import { Terminal } from '@xterm/xterm';

class TerminalManager {
    constructor() {
        this.term = new Terminal({
            'cols': 96,
            'rows': 32,
            // 'convertEol': true,
            'cursorStyle': "bar",
            'cursorBlink': true
        });

        this.term.open(document.getElementById('terminal'));
        this.term.attachCustomKeyEventHandler(ev => this._eventHandler(ev));


        this.term.onKey((event) => {
            if (event.domEvent.key.length == 1) {
                var data = new Uint8Array(1);
                data[0] = event.key.charCodeAt(0);
                this._sendMessage(data);
            }

        });

        this.keymap = [
            { "key": "Enter", "mapCode": [0x0d], }, //"preFunc": this._onEnter },
            { "key": "Tab", "mapCode": [0x09], }, // "preFunc": this._onTab },
            { "key": "ArrowLeft", "mapCode": [...CSI_HEX, 0x44], }, // "preFunc": this._editableLeft },
            { "key": "ArrowRight", "mapCode": [...CSI_HEX, 0x43], },
            { "key": "ArrowUp", "mapCode": [...CSI_HEX, 0x41], }, // "directSend": true},
            { "key": "ArrowDown", "mapCode": [...CSI_HEX, 0x42], },
            { "key": "Backspace", "mapCode": [0x08], }, // "preFunc": this._editableLeft },
            { "key": "Delete", "mapCode": [...CSI_HEX, 0x43, 0x08], },
        ];

        this._sendMessage = null;
    }
    _close() {
        this.term.dispose();
    }
    _eventHandler(ev) {
        // console.log(ev);
        if (ev.type === 'keydown') {
            for (let i in this.keymap) {
                if (this.keymap[i].key == ev.key) {
                    if (this.keymap[i].preFunc) {
                        if (!this.keymap[i].preFunc(this)) {
                            return true;
                        }
                    }

                    var data = Uint8Array.from(this.keymap[i].mapCode);
                    this._sendMessage(data);

                    if (this.keymap[i].postFunc) {
                        this.keymap[i].postFunc(this);
                    }
                    return true;
                }
            }
        }
    }
    _write(chunk) {
        this.term.write(chunk);
    }
    // _onEnter(termManager) {
    //     // console.log("on Enter");
    //     const buffer = termManager.term.buffer.active;
    //     const message = buffer.getLine(buffer.baseY + buffer.cursorY).translateToString(true);
    //     const data = new Uint8Array(Math.max(message.length - 8, 1));
    //     if (message.length == 0) {
    //         data[0] = ' ';
    //     } else {
    //         for (var i = 0; i < message.length - 8; i++) {
    //             data[i] = message.charCodeAt(i + 8);
    //         }
    //     }
    //     termManager._sendMessage(data);
    //     return true;
    // }
    // _onTab(termManager) {
    //     // console.log("on Tab");
    //     const buffer = termManager.term.buffer.active;
    //     const message = buffer.getLine(buffer.baseY + buffer.cursorY).translateToString(true);
    //     const data = new Uint8Array(Math.max(message.length - 8 + 1, 1));
    //     for (var i = 0; i < message.length - 8; i++) {
    //         data[i] = message.charCodeAt(i + 8);
    //     }
    //     data[data.length - 1] = 0x09;
    //     termManager._sendMessage(data);
    //     return true;
    // }

    // _editableLeft(termManager) {
    //     const buffer = termManager.term.buffer.active;
    //     const cursor = buffer.cursorX;
    //     const isWrapped = buffer.getLine(buffer.baseY + buffer.cursorY).isWrapped;
    //     if (cursor > 8) { //TODO: 8 should be look for $
    //         return true;
    //     }
    //     if (isWrapped) {
    //         return true;
    //     }
    //     return false;
    // }

    onSendMessage(callback) {
        this._sendMessage = callback;
        return this;
    }
}
