class Person {
    #first;
    #last;
    constructor (fName, lName) {
        this.#first = fName;
        this.#last = lName;
    }

    get firstName() {
        return this.#first;
    }

    set firstName(fName) {
        return this.#first = fName;
    }

    get lastName() {
        return this.#last;
    }

    set lastName(lName) {
        return this.#last = lName;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(fullName) {
        let full = fullName.split(' ');
        if (full.length === 2) {
            this.firstName = full[0];
            this.lastName = full[1];
        }
        return `${this.firstName} ${this.lastName}`;
    }
}

let person = new Person("Peter", "Ivanov");
console.log(person.fullName);//Peter Ivanov
person.firstName = "George";
console.log(person.fullName);//George Ivanov
person.lastName = "Peterson";
console.log(person.fullName);//George Peterson
person.fullName = "Nikola Tesla";
console.log(person.firstName);//Nikola
console.log(person.lastName);//Tesla


