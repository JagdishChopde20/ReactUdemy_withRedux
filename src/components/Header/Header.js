
import React, { Fragment } from 'react';

import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header(props) {
    return (
        // <React.Fragment>
        <Fragment>
            <header className={styles.appBar}>
                <h2 className={styles.heading}>
                    React Udemy
                </h2>
            </header>

            {props.isLoggedIn && (
                <nav>
                    <p>
                        <NavLink to="/" className={({isActive}) => isActive ? styles.active : undefined} >Home</NavLink> &nbsp; | &nbsp;
                        <NavLink to="/add-course" className={({isActive}) => isActive ? styles.active : undefined}>Add Course</NavLink>
                    </p>
                    <hr />
                </nav>
            )}
        </Fragment>
        // </React.Fragment>
    )
}

export default Header;