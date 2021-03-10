export default class Fragment {
    #type;
    #name;
    #content;
    #attributes;

    constructor(type, name, content, attributes = {}) {
        this.#type = type;
        this.#name = name;
        this.#content = content;
        this.#attributes = attributes;
    }

    /**
     * @returns {string}
     */
    get type () {
        return this.#type;
    }

    /**
     * @returns {string}
     */
    get name ()  {
        return this.#name;
    }

    /**
     * @returns {string}
     */
    get content ()  {
        return this.#content;
    }

    /**
     * @returns {object}
     */
    get attributes ()  {
        return this.#attributes;
    }

}