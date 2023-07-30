import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Auth from "../Auth/Auth";
import styles from './Layout.module.css';
import Loading from "../../components/UI/Laoding/Loading";
import { useSelector } from "react-redux";

export default function Layout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check auth state from localStorage
    useEffect(() => {
        // console.log('useEffect');
        const auth = localStorage.getItem('auth');
        const boolAuth = auth === 'login' ? true : false;
        (boolAuth !== isLoggedIn) && setIsLoggedIn(boolAuth);

        // Auto logout
        // if (boolAuth) {
        //   setTimeout(() => {
        //     logoutHandler();
        //     console.log('auto logout')
        //   }, 5000);
        // }
    }, [isLoggedIn]);
    //

    // Login
    const loginHandler = () => {
        setIsLoggedIn(true);
        localStorage.setItem('auth', 'login');
    }

    // Logout
    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.setItem('auth', 'logout');
    }

    // loading from Redux
    const isLoading = useSelector(state => state.isLoading);
    const isAddLoading = useSelector(state => state.isAddLoading);

    return (
        <div className={styles.flex}>
            <div>
                {/* {ReactDOM.createPortal(<Header isLoggedIn={isLoggedIn} />, document.getElementById('header-root'))} */}
                <Header isLoggedIn={isLoggedIn} />

                <div className={styles.container}>
                    <Auth isLoggedIn={isLoggedIn} onClick={!isLoggedIn ? loginHandler : logoutHandler}>
                        {!isLoggedIn ? 'Welcome Guest!' : 'Welcome Jagdish!'}
                    </Auth>
                    <br />

                    {(isLoading || isAddLoading) && <Loading />}

                    {isLoggedIn && <Outlet />}
                </div>
                <br />
            </div>
            <div className={styles.footerBar}> &copy; Jagdish Chopde - 2023 </div>
        </div>
    );
}