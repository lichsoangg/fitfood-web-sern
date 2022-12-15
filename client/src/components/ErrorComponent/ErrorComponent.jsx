import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import './ErrorComponent.scss'
export default function ErrorBoundaryComponent({ children }) {
  return <ErrorBoundary FallbackComponent={ErrorFallBack}>{children}</ErrorBoundary>
}

function ErrorFallBack({ error }) {
  console.log(error)
  return (
    <div className='errorFallback'>
      <p>Lỗi: {error.message}</p>
    </div>
  )
}
