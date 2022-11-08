// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


const gen = () => {
    new QRious({
        element: document.getElementById('qr'),
        value: document.getElementById('message').value,

        background: 'white',
        backgroundAlpha: 0.8,
        foreground: 'black',
        foregroundAlpha: 0.8,
        level: 'H',
        // padding: 25,
        // size: 500,
    });
};

const read = () => {
    let video = document.createElement("video");
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let msg = document.getElementById("result");

    const userMedia = { video: { facingMode: "environment" } };
    navigator.mediaDevices.getUserMedia(userMedia).then((stream) => {
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        startTick();
    });

    function startTick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let code = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
            if (code) {
                // console.log(code);
                let decoded = Encoding.codeToString(Encoding.convert(code.binaryData, { to: 'UNICODE', from: 'AUTO' }));

                drawRect(code.location);

                // msg.innerText = code.data;
                msg.innerText = decoded;

                video.pause();
                return;
            } else {
                msg.innerText = "Detecting...";
            }
        }
        setTimeout(startTick, 250);
    }

    function drawRect(location) {
        drawLine(location.topLeftCorner, location.topRightCorner);
        drawLine(location.topRightCorner, location.bottomRightCorner);
        drawLine(location.bottomRightCorner, location.bottomLeftCorner);
        drawLine(location.bottomLeftCorner, location.topLeftCorner);
    }

    function drawLine(begin, end) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#FF3B58";
        ctx.beginPath();
        ctx.moveTo(begin.x, begin.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }
};


window.addEventListener('DOMContentLoaded', (event) => {
    // フォーカス時に全選択
    document.getElementById('result').addEventListener('focus', function () {
        this.select();
    });

    // 変換
    document.getElementById('message').addEventListener('keyup', function () {
        gen();
    });

    document.getElementById('canvas').addEventListener('click', function () {
        read();
    });

    document.getElementById('message').value = location.href;
    gen();
});
