function f() {
    class Employee {
        constructor (name, age) {
            if (new.target === Employee) {
                throw new Error('cannot instantiate directly.');
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        }

        getSalary() {
            return this.salary;
        }

        work() {
            let task = this.tasks.shift();
            console.log(this.name + task);
            this.tasks.push(task);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
    }

    class Junior extends Employee {
        constructor (name, age) {
            super(name, age);
            this.tasks.push(` is working on a simple task.`);
        }
    }

    class Senior extends Employee {
        constructor (name, age) {
            super(name, age);
            this.tasks.push(` is working on a complicated task.`);
            this.tasks.push(` is taking time off work.`);
            this.tasks.push(` is supervising junior workers.`);
        }
    }

    class Manager extends Employee {
        constructor (name, age) {
            super(name, age);
            this.dividend = 0;
            this.tasks.push(` scheduled a meeting.`);
            this.tasks.push(` is preparing a quarterly report.`);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary() + this.dividend} this month.`);    }
    }

    return {Employee, Junior, Senior, Manager};
}