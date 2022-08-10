import {HTTPStatusCodes} from '../types/HttpCodes'
import {getReposPerPage, makeFakeResponse} from './gitrepo'

const handlePaginated = (req: any, res: any, ctx: any) => {
    let per_page = Number(req.url.searchParams.get('per_page') ?? 30)
    let page = Number(req.url.searchParams.get('page') ?? 1)

    return res(
        ctx.status(HTTPStatusCodes.OK_STATUS),
        ctx.json({
            ...makeFakeResponse(),
            items: getReposPerPage({
                perPage: per_page,
                currentPage: page,
            }),
        }),
    )
}

export {handlePaginated}
