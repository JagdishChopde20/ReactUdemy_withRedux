import React from 'react';

import Card from '../components/UI/Card/Card';
import Header from '../components/Header/Header';
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <React.Fragment>
            <Header />

            <Card>
                <h1>An error occurred!</h1>
                <p>Could not find this page.</p>
                <Link to="/">Go to Home Page</Link>
                <br /><br />
            </Card>
        </React.Fragment>
    );
}