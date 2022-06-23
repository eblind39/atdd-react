const asyncCB = (cb) => {
    setTimeout(() => {
        cb(true);
    }, 1000);
}

const asyncPromise = () => new Promise((resolve) => resolve(true));

describe('async callbacks', () => {
    it('example of async with callback', (done) => {
        asyncCB((result) => {
            expect(result).toBe(true);
            done();
        });
    });

    it('example of async with async await', async () => {
        const result = await asyncPromise();
        expect(result).toBe(true);
    })
});

describe('promises', () => {
    it('example of async with Promise', () => {
        return asyncPromise().then((result) => expect(result).toBe(true));
    });
});