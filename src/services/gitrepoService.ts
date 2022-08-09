import {gitRepoBaseUrl} from '../app/config'

interface Params {
    q: string
}

const getRepos = ({q}: Params) =>
    fetch(
        `/search/repositories?q=${q}&page=2&per_page=50`, // https://api.github.com
    )

export {getRepos}
