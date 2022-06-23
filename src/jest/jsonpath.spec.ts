import fnFilter from "./jsonpath";

describe('jsonpath', () => {
    it('extract departments from user', () => {
        let result = fnFilter();

        const matcher = expect.arrayContaining([{ name: expect.stringContaining('ThoughtWorks University') }]);
        expect(result).toEqual(matcher);
    });
});