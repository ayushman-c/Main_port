import { Component } from 'react'

/**
 * Catches runtime errors in child components and shows a fallback
 * instead of a blank white screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Something went wrong</p>
            <p className="text-sm font-mono text-zinc-500 max-w-md">
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn btn-ghost mt-4"
            >
              Try again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
