import { isExternalModule } from 'typescript';

describe('equality matchers', () => {
    it('toEqual - basic usage', () => {
        expect(1 + 1).toEqual(2);
        expect('Juntao').toEqual('Juntao');
        expect({ name: 'Juntao' }).toEqual({ name: 'Juntao' });
    });

    it('toBe - basic usage', () => {
        expect(2 + 2).toBe(4);
        expect('Qiu').toBe('Qiu');
        // expect({ name: 'Ernest' }).toBe({ name: 'Ernest' }); // <- FAIL - For primitives,
            // like strings, numbers and booleans you can use toBe. While objects and everything use toEqual
    });
});

describe('opposite matching', () => {
    it('not - basic usage', () => {
        expect(1 + 2).not.toEqual(2);
    });
});

describe('regex', () => {
    it('match regular expression', () => {
        expect('Juntao').toMatch(/\w+/);
    });
    it('regex - match numbers', () => {
        expect('185-3345-3343').toMatch(/^\d{3}-\d{4}-\d{4}$/);
        // expect('1845-3345-3343').toMatch(/^\d{3}-\d{4}-\d{4}$/); // <- FAIL
    });
});

describe('compare numbers', () => {
    it('compare numbers', () => {
        expect(1 + 2).toBeGreaterThan(2);
        expect(1 + 2).toBeGreaterThanOrEqual(2);

        expect(1 + 2).toBeLessThan(4);
        expect(1 + 2).toBeLessThanOrEqual(4);
    });
});

describe('match arrays', () => {
    let users = Array();

    beforeEach(() => {
        users = ['Juntao', 'Abruzzi', 'Alex'];
    });

    it('common tests - simple array', () => {
        expect(users).toContainEqual('Juntao');
        expect(users).toContain(users[0]);
    });
    it('object in array', () => {
        const usersArr = [
            {  name: 'Juntao' },
            {  name: 'Alex' },
            {  name: 'Enest' },
        ];

        expect(usersArr).toContainEqual({ name: 'Juntao' }); // PASS
        // expect(usersArr).toContain({ name: 'Juntao' }); // FAIL - We need object comparison better
    });
});

describe('object matchers', () => {
    it('match object', () => {
        const user = {
            name: 'Juntao',
            address: 'Xian, Shaanxi, China',
        }

        expect(user.name).toBeDefined();
        // expect(user.age).not.toBeDefined(); // TS error due to static typing
    });
});

describe('stringContaining, arrayContaining, objectContaining', () => {
    it('string contains', () => {
        const givenName = expect.stringContaining('Juntao');
        expect('Juntao Qiu').toEqual(givenName);
    });
    it('array containing', () => {
        const users = ['Juntao', 'Abruzzi', 'Alex'];
        const userSet = expect.arrayContaining(['Juntao', 'Abruzzi']);
        expect(users).toEqual(userSet);
    });
    it('object containg', () => {   // <-Powerful matcher
        const user = {
            name: 'Juntao Qiu',
            address: 'Xian, Shaanxi, China',
            projects: [
                { name: 'ThoughtWorks University' },
                { name: 'ThoughtWorks Core Business Beach' },
            ]
        };

        const matcher = expect.objectContaining({
            name: expect.stringContaining('Juntao'),
            projects: expect.arrayContaining([
                { name: expect.stringContaining('ThoughtWorks') },
            ])
        })

        expect(user).toEqual(matcher);
    });
});