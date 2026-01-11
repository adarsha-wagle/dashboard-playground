import React, { type ReactNode } from 'react'

// Props for the fallback component
interface IErrorFallbackProps {
  error: Error | null
  onRetry: () => void
}

// Props for the ErrorBoundary component
interface ErrorBoundaryProps {
  fallback: React.ComponentType<IErrorFallbackProps>
  children: ReactNode
}

// State for the ErrorBoundary component
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  retryKey: number
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    retryKey: 0,
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error:', error.message)
    console.error('Component stack:', info.componentStack)
  }

  handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryKey: prev.retryKey + 1,
    }))
  }

  render() {
    const { hasError, error, retryKey } = this.state
    const { fallback: Fallback, children } = this.props

    if (hasError) {
      return <Fallback error={error} onRetry={this.handleRetry} />
    }

    // The key forces a full remount on retry
    return <div key={retryKey}>{children}</div>
  }
}

export default ErrorBoundary
