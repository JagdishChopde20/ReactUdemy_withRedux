import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { apiUrl } from '../../helpers/globals';

import { useRef } from "react";

import styles from './AddCourse.module.css';
import Card from "../../components/UI/Card/Card";
import Button from '../../components/UI/Button/Button';

const AddCourse = (props) => {
    const navigate = useNavigate();

    const newCourseNameRef = useRef();
    const newCourseRatingRef = useRef();

    const addCourseHandler = event => {
        event.preventDefault();

        // Post HTTP Request
        axios.post(apiUrl, {
            name: newCourseNameRef.current.value,
            rating: newCourseRatingRef.current.value,
        })
            .then(function (response) {
                console.log(response);
                alert('New Course Added.');

                // Navigate to all courses page
                navigate('/');

                // reset the form
                newCourseNameRef.current.value = '';
                newCourseRatingRef.current.value = '';
            })
            .catch(function (error) {
                console.log(error);
                alert('Something went wrong.');
            });

    }

    return (
        <React.Fragment>
            <h3 className={styles.heading}>ADD COURSE</h3>

            <Card>
                <form onSubmit={addCourseHandler}>
                    <p className={styles['form-control']}>
                        <label htmlFor="newCourseName">Course Name </label>
                        <input id="newCourseName" ref={newCourseNameRef} required></input>
                    </p>

                    <p className={styles['form-control']}>
                        <label htmlFor="newCourseRating">Course Rating </label>
                        <input id="newCourseRating" type="number" ref={newCourseRatingRef}
                            min="0" max="5" step=".5" required></input>
                    </p>

                    <center>
                        <Button type="submit">Add Course</Button>
                    </center>
                </form>
            </Card>

        </React.Fragment>
    )
}

export default AddCourse;