import {BrowserRouter, Router} from 'react-router-dom'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ElegibleType from '../types/ElegibleType'
import AuthContext from '../services/auth-context'

const getElegibleTypeDescr = (elegibleType: ElegibleType | undefined) => {
    if (typeof elegibleType === 'undefined') return 'No value given'
    switch (elegibleType) {
        case ElegibleType.EQUALORUNDER_25:
            return 'Equal or under 25'
        case ElegibleType.OVER_25:
            return 'Over 25'
    }
}

const renderWithRouter = (
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    {route = '/'} = {},
) => {
    window.history.pushState({}, 'Test page', route)

    return {
        user: userEvent.setup(),
        ...render(ui, {wrapper: BrowserRouter}),
    }
}

export {getElegibleTypeDescr, renderWithRouter}
