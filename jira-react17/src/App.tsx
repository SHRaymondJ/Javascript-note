import './App.css'
import { useAuth } from 'context/AuthContext'
import { AuthenticatedApp } from 'AuthenticatedApp'
import { UnauthenticatedApp } from 'unauthenticatedApp/Index'

function App() {
    const { user } = useAuth()
    return (
        <div className="App">
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </div>
    )
}

export default App