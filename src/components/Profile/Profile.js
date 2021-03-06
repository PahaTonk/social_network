import React, { Fragment } from 'react';
import styles from './profile.module.scss';
import PersonPosts from './PersonPosts/PersonPosts';
import ProfileInfo from './ProfileInfo';

/**
 * @description profile page
 */
const Profile = () => {
    return (
        <Fragment>
            <section className={`profile__top ${styles.person}`}>
                <ProfileInfo />
            </section>
            <section className={`profile__bottom ${styles.posts}`}>
                <PersonPosts />
            </section>
        </Fragment>
    );
};

export default Profile;
