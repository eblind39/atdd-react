import {DefaultBodyType, PathParams, rest} from 'msw'

export const handlers = [
    rest.post<DefaultBodyType, PathParams<string>, DefaultBodyType>(
        '/login',
        (req, res, ctx) => {
            sessionStorage.setItem('is-authenticated', 'true')

            return res(ctx.status(200))
        },
    ),
]

export default {handlers}
