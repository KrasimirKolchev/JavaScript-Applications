class Company {
    constructor () {
        this.departments = [];
    }

    addEmployee(name, salary, position, department) {
        if (name == null || name === "undefined" || salary == null || salary === "undefined" || position == null
            || position === "undefined" || department === null || department === 'undefined') {
            throw new Error("Invalid input!");
        }

        if (name.trim() === "" || salary.trim === "" || typeof salary !== 'number'|| position.trim() === "" || department.trim() === "") {
            throw new Error("Invalid input!");
        }

        if (Number(salary) < 0) {
            throw new Error(' Invalid input!');
        }

        this.departments.push({name, salary, position, department});
        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }

    bestDepartment() {
        let depSet = new Set(Array.from(this.departments.map(e => e.department)));
        let depts = this.departments;
        let depMap = [];

        for (const dep of depSet) {
            let sum = depts.filter(d => d.department === dep).reduce((a, b) => a + b.salary, 0)
                / depts.filter(d => d.department === dep).length;
            depMap.push([sum, dep]);
        }

        depMap.sort((f, s) => s[0] - f[0]);
        let bestDep = depMap[0];
        let bestEmpl = Array.from(depts.filter(e => e.department === bestDep[1]));
        bestEmpl.sort(function (e1, e2) {
            let sorted = e2.salary - e1.salary;

            if (sorted === 0) {
                sorted = e1.name.localeCompare(e2.name);
            }

            return sorted;
        });

        let output = `Best Department is: ${bestDep[1]}\nAverage salary: ${bestDep[0].toFixed(2)}`;
        bestEmpl.forEach(e => output += `\n${e.name} ${e.salary} ${e.position}`);

        return output;
    }

}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());