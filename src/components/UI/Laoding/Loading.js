import React from 'react';
import styles from './Loading.module.css';

function Loading() {
    return (
        <div>
            <div className={styles['loading-backdrop']}></div>
            <div className={styles['loading-popup']}>
                <div className={styles['lds-hourglass']}></div>
            </div>
        </div>
    )
}

export default Loading