import crypto from 'crypto-js';

function getRandomString(length: number) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/@'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

const key = getRandomString(32)

export function encrypt(data: string) {
    let cypher = crypto.AES.encrypt(data, key);
    return cypher.toString();
}

export function decrypt(data: string) {
    let decipher = crypto.AES.decrypt(data, key);
    return decipher.toString(crypto.enc.Utf8);
}