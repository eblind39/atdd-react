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

const validEmail = (email: string): boolean => {
    const validEmailFormat: RegExpMatchArray | null = String(email).match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )

    return !!validEmailFormat
}

const validPassword = (password: string): boolean => {
    if (password.length < 8) return false
    const validPWGuidelinesRequirements: RegExpMatchArray | null = String(
        password,
    ).match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=,~;:\\'""<>\\_\-`.[\]{}|/*()?]).*$/,
    )

    return !!validPWGuidelinesRequirements
}

export {doLogin, validEmail, validPassword}
