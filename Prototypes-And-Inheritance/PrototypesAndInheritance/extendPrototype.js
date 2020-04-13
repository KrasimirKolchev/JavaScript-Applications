function extendPrototype(clazz) {
    clazz.prototype.species = "Human";
    clazz.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`;
    }
}