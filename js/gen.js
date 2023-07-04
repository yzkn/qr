// Copyright (c) 2022 YA-androidapp(https://github.com/yzkn) All rights reserved.


window.addEventListener('DOMContentLoaded', (event) => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('msg')) {
        const msg = searchParams.get('msg');
        const dim = searchParams.has('dim') ? searchParams.get('dim') : 256;
        const pad = searchParams.has('pad') ? searchParams.get('pad') : 4;
        const mtx = searchParams.has('mtx') ? searchParams.get('mtx') : -1;
        const ecl = searchParams.has('ecl') ? searchParams.get('ecl') : 'M';
        const ecb = searchParams.has('ecb') ? searchParams.get('ecb') : 1;
        const pal1 = searchParams.has('pal1') ? searchParams.get('pal1') : '#000';
        const pal2 = searchParams.has('pal2') ? searchParams.get('pal2') : '';
        const vrb = searchParams.has('vrb') ? searchParams.get('vrb') : 0;

        document.body.appendChild(
            QRCode({
                msg: msg, // メッセージ
                dim: dim, // 幅
                pad: pad, // パディング
                mtx: mtx, // マスクパターン（-1, 0 - 7）
                ecl: ecl, // 誤り訂正レベル（L, M, H, Q）
                ecb: ecb, // 誤り訂正レベルブースト（0, 1）
                pal: [pal1, pal2], // 前景色・背景色（既定値: ['#000']）
                vrb: vrb // 最適化（0, 1）
            })
        );
    } else {
        const a = document.createElement('a');
        a.href = '?msg=テキスト&dim=256&pal1=%2300CCFF&pal2=%23FEFEFE';
        a.innerText = 'テキスト';
        document.body.appendChild(a);
    }
});
