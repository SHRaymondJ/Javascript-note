import { useAppSelector } from '../app/hooks'
import { selectName } from '../features/counter/counterSlice'

function AuthorName() {
    const { name } = useAppSelector(selectName)
    return <div>{name}</div>
}

export default AuthorName
