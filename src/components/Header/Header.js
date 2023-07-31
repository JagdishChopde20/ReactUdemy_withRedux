
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Button from '../UI/Button/Button';
import { toggleServerStatus } from '../../redux';

function Header(props) {
    // Redux
    const dispatch = useDispatch();
    const isServerWorking = useSelector(state => state.isServerWorking);

    const toggleServerStatusHandler = () => {
        dispatch(toggleServerStatus());
    }

    return (
        // <React.Fragment>
        <Fragment>
            <header className={styles.appBar}>
                <h2 className={styles.heading}>
                    React Udemy
                </h2>
                <Button className={styles.btnServerStatus} onClick={toggleServerStatusHandler}>
                    {isServerWorking ? <span>&#10003;</span> : <span>&#10539;</span>}
                    &nbsp; Server 
                </Button>
            </header>

            {
                props.isLoggedIn && (
                    <nav>
                        <p>
                            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined} >Home</NavLink> &nbsp; | &nbsp;
                            <NavLink to="/add-course" className={({ isActive }) => isActive ? styles.active : undefined}>Add Course</NavLink>
                        </p>
                        <hr />
                    </nav>
                )
            }
        </Fragment >
        // </React.Fragment>
    )
}

export default Header;