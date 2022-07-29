// output “Year: 2021, Make: Toyota, Model: Camry”
class Car {
  private _year: number;
  private _make: string;
  private _model: string;

  get Year() { return this._year; }
  set Year(newVal: number) { this._year = newVal; }

  get Make() { return this._make; }
  set Make(newVal: string) { this._make = newVal; }

  get Model() { return this._model; }
  set Model(newVal: string) { this._model = newVal; }

  constructor(year: number, make: string, model: string) {
   this._year = year;
   this._make = make;
   this._model = model;
 }

 public toString(): string {
   return `Year: ${this._year.toString()}, Make: ${this._make}, Model: ${this._model}`;
 }

 public calculateAge(): number {
   let currDate = new Date();
   return currDate.getFullYear() - this._year;
 }
}

class CarService {
  private _cars: Car[] = [
          new Car(2017, "Toyota", "Camry"),
          new Car(2021, "Jeep", "Compass"),
          new Car(2012, "Toyota", "Cross"),
          new Car(2009, "Chevrolet", "Groove"),
        ];

  public getCar(year: number, make: string, model: string): Car | undefined {
    return  this._cars.find(x => (x.Year === year && x.Make === make && x.Model === model));
 }
}

let car = new Car(2017, "Toyota", "Camry");
console.log(car.toString());
console.log(car.calculateAge());

let carserv = new CarService();
console.log(carserv.getCar(2021, "Jeep", "Compass"));