import { createConnection } from "net";
import { decode, getPackageSize, encode } from "./ts.js";


const client = createConnection(4096, "localhost")


const list = [
    "a",
    "b",
    "c"
]
let i = 0;


client.on("connect", () => {

    while (list.length > 0) {
        client.write(encode(list.shift(), i++));
    }

});

let t = null;

client.on("data", ch => {
    if (t !== null) {
        ch = Buffer.concat([t, ch]);
    }

    let packageSize = 0;
    while (packageSize = getPackageSize(ch)) {
        let packageContent = ch.slice(0, packageSize);
        ch = ch.slice(packageSize);
        let ret = decode(packageContent);
        console.log(ret);
    }
    t = ch;
});

