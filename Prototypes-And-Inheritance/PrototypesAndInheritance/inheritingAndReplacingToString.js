function InheritingAndReplToString() {
    class Person {
        name;
        email;
        constructor(n, e) {
            this.name = n;
            this.email = e;
        }

        toString() {
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Teacher extends Person {
        subject;
        constructor(n, e, s) {
            super(n, e);
            this.subject = s;
        }

        toString() {
            return super.toString().substring(0, super.toString().length - 1) + `, subject: ${this.subject})`;
        }
    }

    class Student extends Person {
        course;
        constructor(n, e, c) {
            super(n, e);
            this.course = c;
        }


        toString() {
            return super.toString().substring(0, super.toString().length - 1) + `, course: ${this.course})`;
        }
    }

    return {Person, Teacher, Student};
}