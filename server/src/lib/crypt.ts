import crypto from 'crypto-js';

function getRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/@'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

const key = getRandomString(32)

export function encrypt(data: string) {
    const cypher = crypto.AES.encrypt(data, key);
    return cypher.toString();
}

export function decrypt(data: string) {
    const decipher = crypto.AES.decrypt(data, key);
    return decipher.toString(crypto.enc.Utf8);
}