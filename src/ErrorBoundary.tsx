import { Component, ErrorInfo, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{' '}
          to go back to the home page.
        </h2>
      );
    }
    return this.props.children;
  }
}
