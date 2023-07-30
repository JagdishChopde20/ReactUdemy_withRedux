import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCourses } from '../../redux';
import styles from './Courses.module.css';

import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import ListItem from '../../components/ListItem/ListItem';

export default function Courses() {
    const navigate = useNavigate();

    // Redux
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses);
    const isLoading = useSelector(state => state.isLoading);
    const isError = useSelector(state => state.isError);

    useEffect(() => {
        if (courses && courses.length > 0) return;

        // Fetch courses at startup
        dispatch(fetchCourses());
    }, [dispatch, courses]);


    let coursesContent = <Card><h3>No Courses Found.</h3></Card>;

    if (isLoading) {
        coursesContent = <Card><h3>Loading...</h3></Card>;
    } else if (isError) {
        coursesContent = <Card><h3>Unable to fetch courses.</h3></Card>;
    }

    if (!isLoading && !isError && courses.length > 0) {
        coursesContent = <ol>
            {
                // 
                courses.map((course) => (
                    <ListItem key={course.id} item={course} onClick={() => navigate(`/course-details/${course.id}`)} />
                ))
            }
        </ol>;
    }

    return (
        <div>
            <Card>
                <h2>Courses Fetched - {courses.length} </h2>
                <Button onClick={() => dispatch(fetchCourses())} >Fetch Courses Again</Button>
                <br /><br />
            </Card>

            <br />
            <h3 className={styles.heading}>ALL COURSES</h3>

            {coursesContent}

            <br />
        </div>
    );
}