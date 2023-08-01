import { ADD_COURSE_FAILURE, ADD_COURSE_REQUEST, ADD_COURSE_RESET, ADD_COURSE_SUCCESS, DELETE_COURSE_FAILURE, DELETE_COURSE_REQUEST, DELETE_COURSE_RESET, DELETE_COURSE_SUCCESS, FETCH_COURSES_FAILURE, FETCH_COURSES_REQUEST, FETCH_COURSES_SUCCESS, FETCH_COURSE_DETAILS_FAILURE, FETCH_COURSE_DETAILS_REQUEST, FETCH_COURSE_DETAILS_SUCCESS, TOGGLE_SERVER_STATUS } from "./courseTypes"

const initialState = {
    courses: [],
    isLoading: false,
    isError: false,

    courseDetails: null,

    isAddLoading: false,
    isAddError: false,
    isCourseAdded: false,

    isCourseDeleted: false,

    isServerWorking: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COURSES_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_COURSES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                courses: action.payload,
                isError: false,
            }
        case FETCH_COURSES_FAILURE:
            return {
                ...state,
                isLoading: false,
                courses: [],
                isError: true,
            }
        case ADD_COURSE_REQUEST:
            return {
                ...state,
                isAddError: false,
                isAddLoading: true,
                isCourseAdded: false
            }
        case ADD_COURSE_SUCCESS:
            return {
                ...state,
                isAddLoading: false,
                isAddError: false,
                courses: [...state.courses, action.payload],
                isCourseAdded: true
            }
        case ADD_COURSE_FAILURE:
            return {
                ...state,
                isAddLoading: false,
                isAddError: true
            }
        case ADD_COURSE_RESET:
            return {
                ...state,
                isCourseAdded: false
            }
        case FETCH_COURSE_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_COURSE_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                courseDetails: action.payload,
                isError: false,
            }
        case FETCH_COURSE_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                courseDetails: null,
                isError: true,
            }

        case DELETE_COURSE_REQUEST:
            return {
                ...state,
                isError: false,
                isLoading: true,
                isCourseDeleted: false
            }
        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                courses: state.courses.filter(x => x.id !== action.payload),
                isCourseDeleted: true
            }
        case DELETE_COURSE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case DELETE_COURSE_RESET:
            return {
                ...state,
                isCourseDeleted: false
            }
        case TOGGLE_SERVER_STATUS:
            return {
                ...state,
                isServerWorking: !state.isServerWorking
            }
        default:
            return state;
    }
}

export default reducer;