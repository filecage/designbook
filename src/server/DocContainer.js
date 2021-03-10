export default class DocContainer {
    #docs;

    constructor(...docs) {
        this.#docs = docs;
    }

    get docs () {
        return this.#docs;
    }
}