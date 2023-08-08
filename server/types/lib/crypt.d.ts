export declare function getRandomString(length: number): string;
export declare function encrypt(data: string, keyData?: string): {
    data: string;
    key: string;
};
export declare function decrypt(data: string, key: string): string;
