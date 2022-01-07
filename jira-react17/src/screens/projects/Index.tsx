import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { EpicScreen } from 'screens/epic/Index'
import { KanbanScreen } from 'screens/kanban/Index'

export const ProjectScreen = () => {
    return (
        <div>
            <h1>ProjectScreen</h1>
            <Link to={'Kanban'}>看板</Link>
            <Link to={'Epic'}>任务栏</Link>
            <Routes>
                <Route path={'Kanban'} element={<KanbanScreen />} />
                <Route path={'Epic'} element={<EpicScreen />} />
                <Route index element={<KanbanScreen />} />
            </Routes>
        </div>
    )
}
