export default class Compiler {
    #fs;
    #subcompilers;

    constructor (fs, ...subcompilers) {
        this.#fs = fs;
        this.#subcompilers = subcompilers;
    }

    async compile (component, fragment) {
        if (typeof fragment === 'string') {
            return fragment;
        }

        const subcompiler = this.#subcompilers.find(subcompiler => subcompiler.isApplicable(fragment));
        if (!subcompiler) {
            throw new Error('No matching subcompiler known for fragment of type `' + fragment.type + '` for component `' + component.name + '`');
        }

        return subcompiler.compile(this.#fs, component, fragment);
    }

}