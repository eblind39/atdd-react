import {gitRepoBaseUrl} from '../app/config'

interface Params {
    q: string
    rowsPerPage: number
}

const getRepos = ({q, rowsPerPage}: Params) =>
    fetch(
        `/search/repositories?q=${q}&page=1&per_page=${rowsPerPage}`, //https://api.github.com
    )

export {getRepos}
