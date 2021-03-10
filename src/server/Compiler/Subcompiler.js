export default class Subcompiler {

    /**
     * Returns whether this compiler is applicable for the given fragment
     *
     * @param {Fragment} fragment
     */
    isApplicable (fragment) {
        throw new Error('isApplicable needs to be implemented');
    };

    /**
     * Compiles the given fragment and writes required files into the file system
     *
     * @param fs
     * @param {Fragment} fragment
     */
    compile (fs, fragment) {
        throw new Error('compile needs to be implemented');
    }

}