import React from 'react'
import NavBar from './NavBar'
import GithubSearch from '../components/github-search/github-search'

const GithubSearchPage = () => {
    return (
        <React.Fragment>
            <NavBar />
            <GithubSearch />
        </React.Fragment>
    )
}

export default GithubSearchPage
