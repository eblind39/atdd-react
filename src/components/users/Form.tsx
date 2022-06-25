import React, { SyntheticEvent, useReducer } from 'react';
import { User } from '../../types/users';
// import { actionTypes } from '../../types/Users/users';

enum actionTypes {
    CHANGE_VALUE = 'change_value',
    CLEAR = 'clear'
}

interface FormState {
    inputValues: User
}

interface FormProps {
    onNewUser: (newUser: User) => void;
}

const INITIAL_STATE = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
};

type FormReducerAction = {
    type: actionTypes.CHANGE_VALUE,
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: actionTypes.CLEAR
}

const formReducer = (state: FormState['inputValues'], action: FormReducerAction) => {
    switch (action.type) {
        case actionTypes.CHANGE_VALUE:
            const {inputName, inputValue} = action.payload;
            return {
                ...state,
                [inputName]: inputValue,
            }
        case actionTypes.CLEAR:
            return INITIAL_STATE;
    }
}

const Form = ({ onNewUser }: FormProps): JSX.Element  => {
    // const [ inputValues, setInputValues ] = useState<FormState['inputValues']>(INITIAL_STATE);

    const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE);

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onNewUser(inputValues);
        handleClear();
    }

    const handleChange = (evt: SyntheticEvent) => {
        let target = evt.target as HTMLInputElement | HTMLTextAreaElement;
        const {name, value} = target;
        dispatch({
            type: actionTypes.CHANGE_VALUE,
            payload: {
                inputName: name,
                inputValue: value
            }
        });
    }

    // const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const {name, value} = evt.target;
    //     dispatch({
    //         type: 'change_value',
    //         payload: {
    //             inputName: name,
    //             inputValue: value
    //         }
    //     });
    // }

    const handleClear = () => {
        dispatch({ type: actionTypes.CLEAR });
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <input type="number" value={inputValues.id} name='id' placeholder='id' onChange={handleChange} />
                <input type="input" value={inputValues.email} name='email' placeholder='email' onChange={handleChange} />
                <input type="input" value={inputValues.first_name} name='first_name' placeholder='first_name' onChange={handleChange} />
                <input type="input" value={inputValues.last_name} name='last_name' placeholder='last_name' onChange={handleChange} />
                <textarea value={inputValues.avatar} name='avatar' placeholder='avatar' onChange={handleChange} />
                <button type='button' onClick={handleClear}>Clear the form</button>
                <button type='submit'>Save new user!</button>
            </form>
        </React.Fragment>
    );
}

export default Form;