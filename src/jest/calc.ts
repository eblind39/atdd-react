type CalcOptions = {
    precision: number;
};

class Calculator {
    private _x: number = 0;
    private _y: number = 0;
    private _options: CalcOptions = { precision: 0 };

    constructor() { }

    get X(): number { return this._x }
    set X(newVal: number) { this._x = newVal }

    get Y(): number { return this._y }
    set Y(newVal: number) { this._y = newVal }

    get Options(): CalcOptions { return this._options }
    set Options(newVal: CalcOptions) { this._options = newVal }

    public sum = (x: number, y: number): number => {
        this.copyVals(x, y);
        return this.setPrecision(this._x + this._y);
    }
    
    public subs = (x: number, y: number): number => {
        this.copyVals(x, y);
        return this.setPrecision(this._x - this._y);
    }
    
    public mult= (x: number, y: number): number => {
        this.copyVals(x, y);
        return this.setPrecision(this._x * this._y);
    }
    
    public divis = (x: number, y: number): number => {
        this.copyVals(x, y);
        return this.setPrecision(this._x!==0 ? this._x / this._y : 0);
    }

    private copyVals(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    private setPrecision(val: number): number {
        return Number((val).toPrecision(this._options.precision))
    }

    public dispose() {
        // console.log('Calc dispose...');
    }
}

export default Calculator;
export type { CalcOptions };
