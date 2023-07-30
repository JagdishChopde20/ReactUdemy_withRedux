import axios from 'axios';
import { apiUrl } from '../../helpers/globals';

import { ADD_COURSE_FAILURE, ADD_COURSE_REQUEST, ADD_COURSE_RESET, ADD_COURSE_SUCCESS, DELETE_COURSE_FAILURE, DELETE_COURSE_REQUEST, DELETE_COURSE_RESET, DELETE_COURSE_SUCCESS, FETCH_COURSES_FAILURE, FETCH_COURSES_REQUEST, FETCH_COURSES_SUCCESS, FETCH_COURSE_DETAILS_FAILURE, FETCH_COURSE_DETAILS_REQUEST, FETCH_COURSE_DETAILS_SUCCESS } from "./courseTypes";

// FETCH COURSES
export const fetchCoursesRequest = () => {
    return {
        type: FETCH_COURSES_REQUEST
    }
}

export const fetchCoursesSuccess = courses => {
    return {
        type: FETCH_COURSES_SUCCESS,
        payload: courses
    }
}

export const fetchCoursesFailure = () => {
    return {
        type: FETCH_COURSES_FAILURE,
    }
}

// Thunk
// HTTP Get Request using axios
export const fetchCourses = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchCoursesRequest());

            const res = await axios.get(apiUrl);

            const data = res.data;

            let finalData = [];
            for (const key in data) {
                // console.log(key, data[key]);
                if (key && data[key]) {
                    const element = data[key];
                    finalData.push({
                        id: key,
                        ...element
                    })
                }
            }

            dispatch(fetchCoursesSuccess(finalData));
        } catch (error) {
            dispatch(fetchCoursesFailure());
        }
    }
}

// ADD COURSE
export const addCourseRequest = () => {
    return {
        type: ADD_COURSE_REQUEST
    }
}

export const addCourseSuccess = newCourse => {
    return {
        type: ADD_COURSE_SUCCESS,
        payload: newCourse
    }
}

export const addCourseFailure = () => {
    return {
        type: ADD_COURSE_FAILURE,
    }
}

export const addCourseReset = () => {
    return {
        type: ADD_COURSE_RESET
    }
}


// Thunk
// HTTP Post Request using axios
export const addCourse = (newCourse) => {
    return async (dispatch, getState) => {
        try {
            // console.log(getState());
            dispatch(addCourseRequest());

            const res = await axios.post(apiUrl, newCourse);

            if (res.status === 200)
                dispatch(addCourseSuccess(newCourse));
            else
                dispatch(addCourseFailure());
        } catch (error) {
            dispatch(addCourseFailure());
        }
    }
}


// FETCH COURSE DETAILS
export const fetchCourseDetailsRequest = () => {
    return {
        type: FETCH_COURSE_DETAILS_REQUEST
    }
}

export const fetchCourseDetailsSuccess = courseDetails => {
    return {
        type: FETCH_COURSE_DETAILS_SUCCESS,
        payload: courseDetails
    }
}

export const fetchCourseDetailsFailure = () => {
    return {
        type: FETCH_COURSE_DETAILS_FAILURE
    }
}


// Thunk
// HTTP Get Request using axios
export const fetchCourseDetails = (courseId) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();

            const courseDetails = state.courses.find(x => x.id === courseId);

            if (courseDetails) {
                dispatch(fetchCourseDetailsSuccess(courseDetails));
                return;
            };

            // Fetch course details from server
            dispatch(fetchCourseDetailsRequest());

            const apiUrl_cDetails = `https://udemy-demo-react1-default-rtdb.firebaseio.com/courses/${courseId}.json`;
            const res = await axios.get(apiUrl_cDetails);
            const data = res.data;

            dispatch(fetchCourseDetailsSuccess(data));
        } catch (error) {
            dispatch(fetchCourseDetailsFailure());
        }
    }
}


// DELETE COURSE
export const deleteCourseRequest = () => {
    return {
        type: DELETE_COURSE_REQUEST
    }
}

export const deleteCourseSuccess = courseId => {
    return {
        type: DELETE_COURSE_SUCCESS,
        payload: courseId
    }
}

export const deleteCourseFailure = () => {
    return {
        type: DELETE_COURSE_FAILURE,
    }
}

export const deleteCourseReset = () => {
    return {
        type: DELETE_COURSE_RESET
    }
}


// Thunk
// HTTP Delete Request using axios
export const deleteCourse = (courseId) => {
    return async (dispatch) => {
        try {
            dispatch(deleteCourseRequest());

            const delUrl = `https://udemy-demo-react1-default-rtdb.firebaseio.com/courses/${courseId}.json`;
            const res = await axios.delete(delUrl);

            console.log(res);

            if (res.status === 200)
                dispatch(deleteCourseSuccess(courseId));
            else
                dispatch(deleteCourseFailure());
        } catch (error) {
            dispatch(deleteCourseFailure());
        }
    }
}
