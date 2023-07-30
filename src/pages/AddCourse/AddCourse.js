import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRef } from "react";

import styles from './AddCourse.module.css';
import Card from "../../components/UI/Card/Card";
import Button from '../../components/UI/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addCourse, addCourseReset } from '../../redux';

const AddCourse = (props) => {
    const navigate = useNavigate();

    // Redux
    const dispatch = useDispatch();
    const isAddLoading = useSelector(state => state.isAddLoading);
    const isAddError = useSelector(state => state.isAddError);
    const isCourseAdded = useSelector(state => state.isCourseAdded);

    const newCourseNameRef = useRef();
    const newCourseRatingRef = useRef();

    const navigateToHome = useCallback(() => {
        navigate('/');
        dispatch(addCourseReset());
    }, [navigate, dispatch]);

    useEffect(() => {
        if (isCourseAdded) {
            alert('New Course Added.');
            // Navigate to all courses page
            navigateToHome();
        } else if (isAddError) {
            alert('Something went wrong.');
        }
    }, [isAddError, isCourseAdded, navigateToHome]);

    const addCourseHandler = event => {
        event.preventDefault();

        const newCourse = {
            name: newCourseNameRef.current.value,
            rating: newCourseRatingRef.current.value,
        };
        dispatch(addCourse(newCourse));
    }

    return (
        <React.Fragment>
            <h3 className={styles.heading}>ADD COURSE</h3>

            <Card>
                <form onSubmit={addCourseHandler}>
                    <p className={styles['form-control']}>
                        <label htmlFor="newCourseName">Course Name </label>
                        <input id="newCourseName" ref={newCourseNameRef} required disabled={isAddLoading}></input>
                    </p>

                    <p className={styles['form-control']}>
                        <label htmlFor="newCourseRating">Course Rating </label>
                        <input id="newCourseRating" type="number" ref={newCourseRatingRef}
                            min="0" max="5" step=".5" required disabled={isAddLoading}></input>
                    </p>

                    <center>
                        <Button type="submit" disabled={isAddLoading}>{isAddLoading ? 'Loading...' : 'Add Course'}</Button>
                    </center>
                </form>
            </Card>

        </React.Fragment>
    )
}

export default AddCourse;