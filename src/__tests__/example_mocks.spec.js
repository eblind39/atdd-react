import { storage } from '../lib/storage';
import { saveUsername, getUsername } from '../user';

jest.mock('../lib/storage');

describe('mock intro', () => {
    it('Example 1', () => {
        const myMock = jest.fn()
            .mockReturnValueOnce(true)
            .mockReturnValueOnce('hello world')
            .mockReturnValueOnce(5);
        // console.log(myMock);

        const result1 = myMock();
        const result2 = myMock();
        const result3 = myMock();

        // expect(myMock).toHaveBeenCalled(); // 1 time
        expect(myMock).toHaveBeenCalledTimes(3);
        
        expect(result1).toBe(true);
        expect(result2).toBe('hello world');
        expect(result3).toBe(5);
    });
});

describe('real mock', () => {
    it('local storage - save', () => {
        const usernm = 'John Doe';
        // console.log('storage', storage);  // - Mock
        saveUsername(usernm);
        expect(storage.save).toHaveBeenCalledTimes(1);
        expect(storage.save).toHaveBeenCalledWith({ key:'username', value: usernm });
    });
    it('local storage - get', () => {
        const usernm = 'John Doe';
        storage.get.mockReturnValueOnce(usernm);
        const result = getUsername();
        expect(result).toBe(usernm);

        expect(storage.get).toHaveBeenCalledTimes(1);
        expect(storage.get).toHaveBeenCalledWith({ key:'username' });
    });
});