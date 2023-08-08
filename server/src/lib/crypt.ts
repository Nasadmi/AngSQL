import crypto from 'crypto-js';

export function getRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/@'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

const key = getRandomString(32)

export function encrypt(data: string, keyData?: string) {
    const cypher = crypto.AES.encrypt(data, keyData === undefined ? key : keyData);
    return {
        data: cypher.toString(),
        key: key
    };
}

export function decrypt(data: string, key: string) {
    const decipher = crypto.AES.decrypt(data, key);
    return decipher.toString(crypto.enc.Utf8);
}