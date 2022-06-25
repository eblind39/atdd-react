import { isExternalModule } from 'typescript';

// using number type
function identity(arg: number): number {
    return arg;
}

// using Any
function identityAny(arg: any): any {
    return arg;
}

// using Generics
function identityGen<T>(arg: T): T {
    return arg;
}
let numberOutput = identityGen<Number>(1);
let stringOutput = identityGen<String>('Ernst');
console.log(numberOutput, stringOutput);

// by using TS type inference
let numberOutTI = identityGen(5);
let stringOutTI = identityGen('Raphael');
console.log(numberOutTI, stringOutTI);

// Generic iface
interface GenericIdentityFn<T> {
    (arg: T): T;
}
function identityIF<T>(arg: T): T {
    return arg;
}
let myIdentIF: GenericIdentityFn<number> = identityIF;

// Generic cls
class GenericNumber<T> {
    private _zeroValue: T;
    private _addFn: (x: T, y: T) => T;

    constructor(zeroVal: T, addFn: (x: T, y: T) => T) {
        this._zeroValue = zeroVal;
        this._addFn = addFn;
    }

    get zeroValue() { return this._zeroValue; }
    set zeroValue(newVal: T) { this._zeroValue = newVal; }

    get addFn() { return this._addFn; }
    set addFn(newVal: (x: T, y: T) => T) { this._addFn = newVal; }
}
let fnAdd = (x: number, y: number) => x + y;
let myGenNumber = new GenericNumber<number>(0, fnAdd);
console.log(myGenNumber.addFn(5, 4));
let fnAddPlusTax = (x: number, y: number) => x + y + (0.15 * (x + y));
myGenNumber.addFn = fnAddPlusTax;
console.log(myGenNumber.addFn(5, 4), myGenNumber.constructor.name);

// Restric type, in the following example,
// we admit only types that have a 'length' prop
interface Lengthwise {
    length: number;
}

function loggingID<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
loggingID<string>('Ernest');
loggingID<string[]>(['a', 'b']);
loggingID<number[]>([1, 2, 3, 4]);
loggingID({length: 7, value: 'Jose'}); // type inference with a json with length prop

// gen params in gen constraints
function getProp<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
console.log(getProp(x, 'a'));
// console.log(getProp(x, 'm')); 
//      ERROR - Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'

// Symbol
let symk = Symbol('name');
let obj = {
    [symk]: 'Ernest',
}
console.log(obj[symk]);

// obj prop, class members
const getClassNameSymbol = Symbol();

class C {
    private _prop: string;

    constructor(prop: string) {
        this._prop = prop;
    }

    [getClassNameSymbol]() {
        return this.constructor.name;
    }

    get Prop(): string { return this._prop; }
    set Prop(newVal: string) { this._prop = newVal; }
}

let c: C = new C('Ernest');
let className: string = c[getClassNameSymbol]();
console.log(className);