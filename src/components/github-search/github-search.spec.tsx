import React from 'react'
import {render, screen} from '@testing-library/react'
import GithubSearch from './github-search'

describe('when the GithubSearchPage is mounted', () => {
    it('must display the title', () => {
        render(<GithubSearch />)

        expect(
            screen.getByRole('heading', {
                name: /github repositories list/i,
            }),
        ).toBeInTheDocument()
    })
})
