import { isExternalModule } from 'typescript';

// Very useful Fn to extract as an array specific vals 
// from the json specifying a keyprop name
function getData<Type, KeyType extends keyof Type>(
        dataList: Type[],
        dataType: KeyType
    ): Type[KeyType][] {

    return dataList.map((data) => data[dataType]);

}

// Usage
type User = {
    name: string;
    age: number;
    location: string;
};

const users: User[] = [
    { name: "Chad", age: 31, location: "Japan" },
    { name: "Bob", age: 29, location: "USA" },
    { name: "Jane", age: 30, location: "France" }
];

let arrNames: string[] = getData(users, "name");
console.log(arrNames);

// gen params in gen constraints
function getJsonProp<T, K extends keyof T>(objs: T[], key: K) {
    return objs.map((obj) => {
        return { [key]: obj[key] };
    });
}

type SingleProp = {
    propkey: "name" | "location";
}

// let arrJsonNames: Array<T extends keyof SingleProp> = getJsonProp(users, "location");
// console.log(arrJsonNames);
console.log(getJsonProp(users, "age"));