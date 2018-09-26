(function () {
    function tryconnect(url) {
        var ws = new WebSocket(url);
        console.log(ws);
        ws.onopen = function () {
            console.log("opening up!");
            WebIO.sendCallback = function (msg) {
                ws.send(JSON.stringify(msg))
            }
            ws.onmessage = function (evt) {
                WebIO.dispatch(JSON.parse(evt.data));
            }
            WebIO.triggerConnected()
        }
        ws.onclose = function (evt) {
            if (evt.code === 1005) {
                // TODO what to do?
                //tryconnect(url)
            }
        }
    }

    tryconnect(window.websocket_url)
})();
