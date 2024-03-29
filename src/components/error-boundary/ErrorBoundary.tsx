import { Component, ReactNode } from 'react';
import ErrorMessage from '../error-message/error-message';


interface IErrorProps {
    error?: boolean;
    children?: any;
}

class ErrorBoundary extends Component<IErrorProps> {
    state = {
        error: false
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

