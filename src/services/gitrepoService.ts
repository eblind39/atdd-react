import {gitRepoBaseUrl} from '../app/config'

interface Params {
    q: string
    rowsPerPage: number
    currentPage: number
}

const getRepos = ({q, rowsPerPage, currentPage}: Params) =>
    fetch(
        `https://api.github.com/search/repositories?q=${q}&page=${currentPage}&per_page=${rowsPerPage}`, //
    )

export {getRepos}
