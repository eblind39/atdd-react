import { isExternalModule } from 'typescript';

abstract class Animal {
    abstract makeSound(): void; // no def - must override in subclasses

    move(): void {
        console.log('Doing something...');
    }
}

abstract class Department {
    constructor(public name: string) { }

    printName(): void {
        console.log(`Department name: ${this.name}`);
    }

    abstract printMeeting(): void; // must be implemented in derivated class
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing');
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating Accounting reports...');
    }
}

let department: Department; // reference created - ok
// department = new Department(); // error - abstract class
department = new AccountingDepartment(); // ok - non abstract class
department.printMeeting();
// department.generateReports(); // error - does not exist on abstract class