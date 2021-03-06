import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './../dialogs.module.scss';
import Avatar from '../../small-components/Avatar';

/**
 * @description dialog page
 * @param {String} linkId user id
 * @param {String} avatar link to user photo
 * @param {String} name user name
 */
const User = ({ linkId, avatar, name }) => {
	return (
		<NavLink
			className={`${styles.users__item} list__item`}
			activeClassName='list__item_active'
			to={`/dialogs/${linkId}`}
		>
			<Avatar avatar={avatar} name={name} classes={styles.users__ava}/>

			<div className={styles.users__info}>
				<h3 className='users__name'>{name}</h3>
			</div>
		</NavLink>
	);
};

export default User;
