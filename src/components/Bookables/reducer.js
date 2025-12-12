export default function reducer(state, action) {
    switch (action.type) {
        case "SET_GROUP":
            return {
                ...state,
                group: action.payload,
                bookableIndex: 0
            }
        case "SET_BOOKABLE_INDEX":
            return {
                ...state,
                bookableIndex: action.payload
            }
        case "TOGGLE_HAS_DETAILS":
            return {
                ...state,
                hasDetail: !state.hasDetail
            }
        case "NEXT_BOOKABLE":
            const count = state.bookables.bookables.filter(
                b => b.group === state.group).length
            return {
                ...state,
                bookableIndex: (state.bookableIndex + 1) % count
            }
    }

}