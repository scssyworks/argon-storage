import compress from './compress';
import decompress from './decompress';
import { f } from './fromCharCode';

export function toUTF16(input: any) {
    if (input == null) {
        return '';
    }
    return compress(input, 15, (a: any) => f(a + 32)) + ' ';
}

export function fromUTF16(compressed: any) {
    if (compressed == null) {
        return '';
    }
    if (compressed === '') {
        return null;
    }
    return decompress(compressed.length, 16384, (index: any) => (compressed.charCodeAt(index) - 32));
}