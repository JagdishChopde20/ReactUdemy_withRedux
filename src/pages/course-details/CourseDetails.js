import { useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import { Link, useParams } from "react-router-dom";
import Card from "../../components/UI/Card/Card";

import styles from './CourseDetails.module.css';
import Button from "../../components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, deleteCourseReset, fetchCourseDetails } from "../../redux";

export default function CourseDetails() {
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const course = useSelector(state => state.courseDetails);
    const isLoading = useSelector(state => state.isLoading);
    const isError = useSelector(state => state.isError);
    const isCourseDeleted = useSelector(state => state.isCourseDeleted);

    // HTTP Get Request using axios
    const fetchData = useCallback(async () => {
        try {
            if (!params.courseId) return;

            dispatch(fetchCourseDetails(params.courseId));
        } catch (error) {
            console.log(error);
        }
    }, [params.courseId, dispatch])

    useEffect(() => {
        // Fetch courses at startup
        fetchData();
    }, [fetchData]);

    let courseContent = <Card><h3>No Course Details Found.</h3></Card>;

    if (isLoading) {
        courseContent = <Card><h3>Loading...</h3></Card>;
    } else if (isError) {
        courseContent = <Card><h3>Unable to fetch course details.</h3></Card>;
    }


    const navigateToHome = useCallback(() => {
        navigate('/');
        dispatch(deleteCourseReset());
    }, [navigate, dispatch]);

    useEffect(() => {
        if (isCourseDeleted) {
            alert('Course Deleted.');
            // Navigate to all courses page
            navigateToHome();
        } else if (isError) {
            alert('Something went wrong.');
        }
    }, [isError, isCourseDeleted, navigateToHome]);

    const deleteCourseHandler = (courseId) => {
        const res = window.confirm('Are you sure you want to delete?');
        if (!res) return;

        // Delete course
        dispatch(deleteCourse(courseId));
    }

    return (
        <div>

            {!course && courseContent}

            {course && (
                <div>
                    <p className={styles.subtitle}>COURSE DETAILS</p>
                    <h1> {course.name} </h1>
                    <Card>
                        <div className={styles.rating}>&#9733; {Number(course.rating).toFixed(1)} </div>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum recusandae autem earum ducimus harum ratione voluptatum, pariatur similique cupiditate perspiciatis distinctio dolores exercitationem itaque eum id commodi! Mollitia, blanditiis dolor!
                        </p>

                        <Button onClick={() => deleteCourseHandler(params.courseId)}>Delete</Button>
                        <br /><br />
                    </Card>
                </div>
            )}

            <Link to="..">Go Back</Link>

            <br /><br />
        </div>
    );
}
