import React from 'react'
import NavBar from './NavBar'
import GithubSearch from '../components/github-search/github-search'
import {ErrorBoundary} from '../components/error-boundary'
import WithNavBar from '../components/withnavbar'

const RenderGitSearch = () => (
    <React.Fragment>
        <ErrorBoundary>
            <GithubSearch />
        </ErrorBoundary>
    </React.Fragment>
)

const GithubSearchPage = () => <WithNavBar element={<RenderGitSearch />} />

export default GithubSearchPage
