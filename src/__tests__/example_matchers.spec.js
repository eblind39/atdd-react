const getRole = (key) => {
    let rolesList = [
        {
            code: 5,
            key: 'driver_last_mile'
        }
    ];
    const role = rolesList.find((e) => e.key===key)
    if (!role) {
        return {
            code: '999',
            key: 'UNKNOWN_ROLE'
        };
    }
    return role;
}

describe('matchers', () => {
    it('getRole', () => {
        // const role = getRole(3);
        expect(getRole('driver_last_mile')).toEqual(        {
            code: 5,
            key: 'driver_last_mile'
        });
    });
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