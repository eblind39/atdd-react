import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

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
                    <Typography variant="h4" component="h4">
                        There is an unexpected error
                    </Typography>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={this.handleReloadClick}
                    >
                        Reload
                    </Button>
                </React.Fragment>
            )
        }
        return children
    }
}

export default ErrorBoundary
