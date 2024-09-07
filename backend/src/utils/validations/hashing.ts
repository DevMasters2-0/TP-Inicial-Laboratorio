import * as crypto from 'crypto';

export function encriptSHA256(data: string): string {
    let hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}




