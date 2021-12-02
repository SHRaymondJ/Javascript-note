import Index from 'screens/project-list/Index'
import './App.css'
import { TsReactTest } from 'try-use-array'
import Login from 'screens/login/Index'
import { AppProviders } from 'context/Index'

function App() {
    return (
        <div className="App">
            <AppProviders>
                {/* <Index />
            <TsReactTest /> */}
                <Login />
            </AppProviders>
        </div>
    )
}

export default App
