import {DefaultBodyType, PathParams, rest} from 'msw'
import {HTTPStatusCodes} from '../types/HttpCodes'
import {EnumStrings} from '../types/strings'

interface InvCredsProps {
    wrongemail: string
    wrongpassword: string
}

const handlers = [
    rest.post<DefaultBodyType, PathParams<string>, DefaultBodyType>(
        '/login',
        (req, res, ctx) => {
            let role: string = ''
            const {email} = req.body as DefaultBodyType & {
                email: string
            }
            if (email === EnumStrings.EMAIL_ADMIN) role = EnumStrings.ROLE_ADMIN
            if (email === EnumStrings.EMAIL_EMPLOYEE)
                role = EnumStrings.ROLE_EMPLOYEE

            sessionStorage.setItem('is-authenticated', 'true')
            sessionStorage.setItem('user-role', role)

            return res(ctx.status(200), ctx.json({user: {role}}))
        },
    ),
]

const handleInvalidCredentials = ({wrongemail, wrongpassword}: InvCredsProps) =>
    rest.post('/login', (req, res, ctx) => {
        const {email, password} = req.body as DefaultBodyType & {
            email: string
            password: string
        }

        if (email === wrongemail && password === wrongpassword) {
            return res(
                ctx.status(HTTPStatusCodes.UNAUTHORIZED),
                ctx.json({
                    message: 'The email or password are not correct',
                }),
            )
        }

        return res(
            ctx.status(HTTPStatusCodes.OK_STATUS),
            ctx.json({message: 'Ok'}),
        )
    })

export {handlers, handleInvalidCredentials}
