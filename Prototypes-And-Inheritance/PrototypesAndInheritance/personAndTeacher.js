function personAndTeacher() {
    class Person {
        constructor(n, e) {
            this.name = n;
            this.email = e;
        }
    }

    class Teacher extends Person {
        constructor(n, e, s) {
            super(n, e);
            this.subject = s;
        }
    }

    return {Person, Teacher};
}