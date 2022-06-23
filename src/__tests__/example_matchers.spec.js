describe('matchers', () => {
    it('toBe', () => {  // ===
        expect(true).toBe(true);
    });
    it('toEqual', () => {
        const data = { one: 1 };
        data['two'] = 2;
        expect(data).toEqual({ one: 1, two: 2 });

        const arr = ['one', 'two'];
        expect(arr).toEqual(['one', 'two']);
    });
    it('not', () => {
        expect(true).not.toBe(false);
    });
    it('regex', () => {
        expect('team').not.toMatch(/I/i);
    });
});