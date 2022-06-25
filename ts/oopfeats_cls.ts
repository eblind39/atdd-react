import { isExternalModule } from "typescript";
import { Point2D } from "./geometry";

//******************* */
// Class inheritance
class Animal {
    public name: string;
    private fatIndex: number = 0;
    readonly apiEndpoint: string = '/Animals';

    protected isAlive: boolean = true;

    public constructor(theName: string, isAlive: boolean) {
        this.name = theName;
    }

    public move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Frog extends Animal {
    constructor(name: string, isAlive: boolean) {
        super(name, isAlive);
    }

    move(distanceInMeters = 5) {
        console.log('Jumping...');
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string, isAlive: boolean) {
        super(name, isAlive);
    }

    move(distanceInMeters = 45) {
        console.log('Galloping...');
        super.move(distanceInMeters);
    }
}

let jack = new Frog('Froggy the Traveller', true);
let mrhorse: Animal = new Horse('Mr. Horse', true);
let zoo: Animal[] = [new Frog('Kermit', true), new Horse('Infinity', true)];

jack.move();
mrhorse.move(34);

//******************* */
// Protected constructor
class Person {
    protected name: string;
    protected constructor(theName: string) {
        this.name = theName;
    }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);    // only this class can access to base class constructor
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}`;
    }
}

let howard = new Employee('Howard', 'Sales');
// let john = new Person('John'); - Error, protected constructor, not public


howard.getElevatorPitch();

// Classes features
// Getters and Setters
let passcode = 'secret_passcode';

class Customer {
  private _fullName: string = '';

  get fullName(): string {
    return this._fullName;
  }
  set fullName(newValue: string) {
    if (passcode && passcode === 'secret_passcode') {
      this._fullName = newValue;
    } else {
      console.log('Error: Unauthorized update of employee!');
    }
  }
}

let employee = new Customer();
employee.fullName = 'Bob Nylon';
if (employee.fullName) console.log(employee.fullName);

// Static props
class Grid {
    static origin: Point2D = {x: 0, y: 0};

    public constructor(public scale: number) {

    }

    public calculateDistanceFromOrigin(point: Point2D) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist*xDist + yDist*yDist);
    }
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);
console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 3, y: 4}));