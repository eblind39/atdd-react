import React from 'react'
import NavBar from './NavBar'
import GithubSearch from '../components/github-search/github-search'
import {ErrorBoundary} from '../components/error-boundary'

const GithubSearchPage = () => {
    return (
        <React.Fragment>
            <NavBar />
            <ErrorBoundary>
                <GithubSearch />
            </ErrorBoundary>
        </React.Fragment>
    )
}

export default GithubSearchPage
