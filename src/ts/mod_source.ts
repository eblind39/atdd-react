import { isExternalModule } from "typescript";

export namespace BillingTypes {
    export type T1 = {
        name: string;
    };

    export class T2 {
        private _id: number;
        constructor(id: number) { this._id = id; }
    }
    export class T3 {
        private _tax: number;
        constructor(tax: number) { this._tax = tax; }
    }

    // let msgPWGuidelines: string = `Must be a digit`;
    // const Guidelines = () =>  msgPWGuidelines
    export const string = `Must be a digit`;
}