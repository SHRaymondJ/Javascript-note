import './App.css'
import { useAuth } from 'context/AuthContext'
import { AuthenticatedApp } from 'AuthenticatedApp'
import { UnauthenticatedApp } from 'unauthenticatedApp/Index'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    const { user } = useAuth()
    return (
        <div className="App">
            <Router>
                <ErrorBoundary>
                    {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
                </ErrorBoundary>
            </Router>
        </div>
    )
}

export default App
