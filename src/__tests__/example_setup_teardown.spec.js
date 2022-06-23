describe('setup and teardown examples', () => {
    beforeAll(() => {
        console.log('beforeAll');
    });

    beforeEach(() => {
        console.log('beforeEach');
    });

    afterAll(() => {
        console.log('afterAll');
    });

    afterEach(() => {
        console.log('afterEach');
    });

    it('example 1', () => {
        expect(true).toBe(true);
    });

    it('example 2', () => {
        expect(true).not.toBe(false);
    });
});