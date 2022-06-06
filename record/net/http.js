import { createServer } from "net";


let i = 0;


const server = createServer(socket => {
    const buffer = [];
    let body = JSON.stringify({ body: "xxxxx", code: 200, success: "OK" });

    socket.on("data", ch => {
        buffer.push(ch);
        socket.write(Buffer.from(`HTTP/1.1 200 OK\r\nConnection: keep-alive\r\nContent-Type: application/json\r\nContent-Length: ${body.length}\r\n\r\n${body}`));
        console.log("---data event--------", i++);
    });

    socket.on("end", () => {
        let raw = buffer.toString();

        console.log(raw);
        if (raw.includes("close")) {
            socket.end();
            console.log("关闭连接");
        }else {
            console.log("保持连接");
        }
    });
});



server.listen(4096, () => {
    console.log(`server open, port is %d`, 4096);
});
