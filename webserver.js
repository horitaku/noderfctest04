// httpモジュールを読み込み、インスタンスを生成
// const http = require('http');
const noderfc = require("node-rfc");

const pool = new noderfc.Pool({ connectionParameters: {
    dest: "NPL",
    user: "DEVELOPER",
    passwd: "Down1oad",
    ashost: "127.0.0.1",
    sysnr: "00",
    lang: "EN"
    }
});

// DEST=NPL
// USER=DEVELOPER
// PASSWD=Down1oad
// ASHOST=127.0.0.1
// SYSNR=00
// CLIENT=001
// LANG=EN

(async () => {
    try {
        // get a client connection instance
        const client = await pool.acquire();

        // invoke ABAP function module, passing structure and table parameters

        // ABAP structure
        const abap_structure = {
            RFCINT4: 345,
            RFCFLOAT: 1.23456789,
            RFCCHAR4: "ABCD",
            RFCCHAR2: "ZZ",
            RFCDATE: "20180625", // ABAP date format
            // or RFCDATE: new Date('2018-06-25'), // as JavaScript Date object, with clientOption "date"
        };
        // ABAP table
        let abap_table = [abap_structure];

        const result = await client.call("STFC_STRUCTURE", {
            IMPORTSTRUCT: abap_structure,
            RFCTABLE: abap_table,
        });

        // check the result
        console.log(result);
    } catch (err) {
        // connection and invocation errors
        console.error(err);
    }
})();


// // HTTPサーバーのイベントハンドラを定義
// http.createServer(function (req, res) {
//
//     // HTTPヘッダを出力
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//
//     // レスポンスの中身を出力
//     res.end('Hello World\n');
//
// }).listen(1337, '127.0.0.1'); // 127.0.0.1の1337番ポートで待機
