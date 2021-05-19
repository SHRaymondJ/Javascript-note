export interface IAction<T> {
    typs: string
    payload: {
        data: T
    }
}
