

const packageHeaderSize = 4;
const defaultTag = 0;
const headLen = 2;


function encode(data, tag) {
    const head = Buffer.alloc(packageHeaderSize);

    head.writeInt16BE(tag || defaultTag);

    const body = Buffer.from(data);
    head.writeInt16BE(body.length, headLen);
    return Buffer.concat([head, body])
}

function decode(buffer) {
    const head = buffer.slice(0, packageHeaderSize);
    const bodyBuffer = buffer.slice(packageHeaderSize);

    return {
        tag: head.readInt16BE(),
        bodySize: head.readInt16BE(headLen),
        body: bodyBuffer.toString()
    }
}

function getPackageSize(buffer) {
    if (buffer.length < packageHeaderSize) {
        return 0;
    }
    return packageHeaderSize + buffer.readInt16BE(headLen)
}

export {
    decode, encode, getPackageSize
}