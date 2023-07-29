import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { apiUrl } from '../../helpers/globals';
import styles from './Courses.module.css';

import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import ListItem from '../../components/ListItem/ListItem';

export default function Courses() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    // HTTP Get Request using axios
    async function fetchData() {
        try {
            setIsLoading(true);

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

            setCourses(finalData);
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // Fetch courses at startup
        fetchData();
    }, []);


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
                    <ListItem key={course.id} item={course} onClick={() => navigate(`/course-details/${course.id}`) } />
                ))
            }
        </ol>;
    }

    return (
        <div>
            <Card>
                <h2>Courses Fetched - {courses.length} </h2>
                <Button onClick={fetchData} >Fetch Courses Again</Button>
                <br /><br />
            </Card>

            <br />
            <h3 className={styles.heading}>ALL COURSES</h3>

            {coursesContent}

            <br />
        </div>
    );
}