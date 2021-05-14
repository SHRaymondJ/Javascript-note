const defaultState = {
    user: ["No User!"],
}

export default function loginReducer(
    state = defaultState,
    action = { type: '' }
) {
    switch (action.type) {
        default:
            return state
    }
}
