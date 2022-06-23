import { isExternalModule } from 'typescript';

expect.extend({
    toMatchJSONPath(received, argument) {
        const jp = require('jsonpath');
        const result = jp.query(received, argument);
        if (result.length > 0) {
            return {
                pass: true,
                message: () => 'matched'
            }
        } else {
            return {
                pass: false,
                message: () => `expected ${JSON.stringify(received)} to match jsonpath ${argument}`
            }
        }
    }
});

describe('jsonpath matcher', () => {
    it('matches jsonpath', () => {
        const user = {
            name: 'Juntao',
        }
        expect(user).toMatchJSONPath('$.name');
    });
    it('does not match jsonpath', () => {
        const user = {
            name: 'Juntao',
            address: 'ThoughtWorks',
        }
        expect(user).not.toMatchJSONPath('$.age');
    });
});