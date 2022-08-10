import {gitRepoBaseUrl} from '../app/config'

interface Params {
    q: string
    rowsPerPage: number
    currentPage: number
}

const getRepos = ({q, rowsPerPage, currentPage}: Params) =>
    fetch(
        `/search/repositories?q=${q}&page=${currentPage}&per_page=${rowsPerPage}`, // https://api.github.com
    )

export {getRepos}
