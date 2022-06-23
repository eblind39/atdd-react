import { isExternalModule } from 'typescript';

describe('jest mock', () => {
    it('create a callable function', () => {
        const mock = jest.fn();
        mock('Juntao');
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledWith('Juntao');
        expect(mock).toHaveBeenCalledTimes(1);
    });
    it('mock implementation', () => {
        const fakeAdd = jest.fn().mockImplementation((a, b) => 5)

        expect(fakeAdd(1, 1)).toBe(5);
        expect(fakeAdd).toHaveBeenCalledWith(1, 1);
    });
});

const fetchUser = (id, process) => {
    return fetch(`http://localhost:4000/users/${id}`);
}

describe('mock API call', () => {
    const user = {
        name: 'Juntao'
    }

    it('mock fetch', () => {
        // given
        global.fetch = jest.fn().mockImplementation(() => Promise
        .resolve({ user }));
        const process = jest.fn();

        // when
        fetchUser(111).then(x => console.log(x));

        // then
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/users/111');
    });
});