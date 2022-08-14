interface Params {
    email: string
    password: string
}

const doLogin = ({email, password}: Params) => {
    const strBody: BodyInit = `{"email":"${email}","password":"${password}"}`

    // http://localhost:3007/
    return fetch('/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: strBody,
    })
}

export {doLogin}
