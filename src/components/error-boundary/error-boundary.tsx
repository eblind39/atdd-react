import React from 'react'

interface Props {
    children: JSX.Element
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(): State {
        return {hasError: true}
    }

    public handleReloadClick = () => window.location.reload()

    public render() {
        const {children} = this.props
        const {hasError} = this.state
        if (hasError) {
            return (
                <React.Fragment>
                    <p>There is an unexpected error</p>
                    <button type="button" onClick={this.handleReloadClick}>
                        Reload
                    </button>
                </React.Fragment>
            )
        }
        return children
    }
}

export default ErrorBoundary
