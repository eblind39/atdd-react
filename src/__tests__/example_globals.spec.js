describe('jest globals', () => {
    it('first approach', () => {
        expect(true).toBe(true);
    });
    it('second approach', () => {
        expect(false).not.toBe(true);
    });
});

describe('this is a group of test cases', () => {
    it('dummy test', () => {
        expect(1 + 2).toBe(3);
    });
});