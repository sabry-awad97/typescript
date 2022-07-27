export default class CharacterRange {
    from: string;
    to: string;
    constructor(from: string, to: string) {
        this.from = from;
        this.to = to;
    }

    *[Symbol.iterator]() {
        const startChar = this.from.charCodeAt(0);
        const endChar = this.to.charCodeAt(0);
        for (let x = startChar; x <= endChar; x++) {
            yield String.fromCharCode(x);
        }
    }
}
