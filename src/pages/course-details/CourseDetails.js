import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Link, useParams } from "react-router-dom";
import Card from "../../components/UI/Card/Card";

import styles from './CourseDetails.module.css';
import Button from "../../components/UI/Button/Button";

export default function CourseDetails() {
    const params = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // HTTP Get Request using axios
    const fetchData = useCallback(async () => {
        try {
            if (!params.courseId) return;

            setIsLoading(true);

            const apiUrl = `https://udemy-demo-react1-default-rtdb.firebaseio.com/courses/${params.courseId}.json`;

            const res = await axios.get(apiUrl);
            const data = res.data;

            setCourse(data);
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [params.courseId])

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

    const deleteCourseHandler = (courseId) => {
        const res = window.confirm('Are you sure you want to delete?');
        if (!res) return;

        // Wrong URL -> will throw error
        const delUrl = `https://udemy-demo-react1-default-rtdb.firebaseio.com/courses/${courseId}.json`;

        axios.delete(delUrl)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    alert('Course Deleted.');
                    navigate('/');
                } else {
                    alert('Something went wrong.');
                }
            })
            .catch(function (error) {
                console.log(error);
                alert('Something went wrong.');
            });
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
