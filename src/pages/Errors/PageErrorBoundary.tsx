import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const PageErrorBoundary = () => {
  const error = useRouteError() as Error

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 400:
        return <div>Bad request</div>
      case 404:
        return <div>This page doesn't exist!</div>
      case 401:
        return <div>You aren't authorized to see this</div>
      case 503:
        return <div>Looks like our API is down</div>
      default:
        return (
          <div>
            <h1>Uh oh, something went terribly wrong 😩</h1>
            <pre>{error.message || JSON.stringify(error)}</pre>
          </div>
        )
    }
  }

  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/')}>Click here to reload the app</button>
    </div>
  )
}

export default PageErrorBoundary
