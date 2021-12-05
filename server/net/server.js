import { createServer } from "net";
import { encode, decode, getPackageSize } from "./ts.js";

let t = null;

const server = createServer(socket => {

    socket.on("data", ch => {
        if (t !== null) {
            ch = Buffer.concat([t, ch]);
        }

        let packageSize = getPackageSize(ch);

        while (packageSize > 0) {
            let packageContent = ch.slice(0, packageSize);
            ch = ch.slice(packageSize);

            let ret = decode(packageContent);
            console.log(ret);

            socket.write(encode("server:" + ret.body, ret.tag + 1));
            
            packageSize = getPackageSize(ch)
        }
        t = ch;
    });

    socket.on("end", () => {
        console.log("服务端接收数据完毕");
    });

    socket.on("close", () => {
        console.log("socket close");
    });

    socket.on("error", err => {
        socket.end();
        console.log(err);
    });
});

server.listen(4096, () => {
    console.log(`server open, port i %d`, 4096);
});
