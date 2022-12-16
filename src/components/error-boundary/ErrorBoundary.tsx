import { Component, ReactNode } from 'react';
import ErrorMessage from '../error-message/error-message';


interface IErrorProps {
    error: boolean;
    children?: ReactNode;
}

class ErrorBoundary extends Component<IErrorProps> {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
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

