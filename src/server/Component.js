export default class Component {
    #name;
    #rootPath;
    #tokens;

    constructor (name, rootPath, tokens) {
        this.#name = name;
        this.#rootPath = rootPath;
        this.#tokens = tokens;
    }

    /**
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * @returns {string}
     */
    get rootPath() {
        return this.#rootPath;
    }

    /**
     * @returns {array}
     */
    get tokens() {
        return this.#tokens;
    }
}