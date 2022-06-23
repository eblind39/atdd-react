import Calculator, { CalcOptions } from "./calc";

describe('calculator', () => {
    let calc: Calculator = new Calculator();

    beforeEach(() => {
        const opts: CalcOptions = { precision: 3 };
        calc = new Calculator();
        calc.Options = opts;
    });

    afterEach(() => {
        calc.dispose();
    });

    describe('should perfom addition', () => {
        it('adds two possitive numbers', () => {
            expect(calc.sum(1, 2)).toEqual(3);
        });
        it('adds two negative numbers', () => {
            expect(calc.sum(-1, -2)).toEqual(-3);
        });
        it('adds one possitive and one negative number', () => {
            expect(calc.sum(2, -1)).toEqual(1);
        });
    });
    it('should perfom substraction', () => {
        expect(calc.subs(1, 2)).toEqual(-1);
    });
    it('should perfom multiplication', () => {
        expect(calc.mult(1, 2)).toEqual(2);
    });
    it('should perfom division', () => {
        expect(calc.divis(10, 2)).toEqual(5);
    });
})