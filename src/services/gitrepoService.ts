import {gitRepoBaseUrl} from '../app/config'

const getRepos = () =>
    fetch(`/search/repositories?q=react+language:python&page=2&per_page=50`)

export {getRepos}
