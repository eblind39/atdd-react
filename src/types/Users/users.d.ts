interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface UsersState {
    users: Array<User>;
}

enum actionTypes {
    CHANGE_VALUE = 'change_value',
    CLEAR = 'clear'
}

export { User, UsersState, actionTypes };