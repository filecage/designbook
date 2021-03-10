export default class Doc {
    #component;
    #fs;

    constructor(component, fs) {
        this.#component = component;
        this.#fs = fs;
    }

    get route () {
        return this.componentRootPath + '/' + this.componentName;
    }

    get componentRootPath() {
        return this.#component.rootPath;
    }

    get componentName() {
        return this.#component.name;
    }

    get fs() {
        return this.#fs;
    }
}