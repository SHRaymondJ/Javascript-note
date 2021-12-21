import './App.css'
import { useAuth } from 'context/AuthContext'
import { AuthenticatedApp } from 'AuthenticatedApp'
import { UnauthenticatedApp } from 'unauthenticatedApp/Index'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { FullPageErrorFallback } from 'components/libs'

function App() {
    const { user } = useAuth()
    return (
        <div className="App">
            <ErrorBoundary>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </ErrorBoundary>
        </div>
    )
}

export default App
