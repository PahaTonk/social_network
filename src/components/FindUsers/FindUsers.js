import React, { Component, Fragment } from 'react';
import {
    followAC,
    unfollowAC,
    setUsersAC,
    changeCurrentPageAC,
    setPageSizeAC,
    setTotalSizeAC,
    changeFetchingAC,
} from '../../redux/reducers/usersReducer';
import styles from './find-users.module.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { connect } from 'react-redux';
import User from './User';
import * as axios from 'axios';
import Loader from 'react-loader-spinner';
import Pagination from '../small-components/Pagination';
import findUsersHOC from './FindUsersHOC';
import { MAIN_COLOR } from '../../constants';

/**
 * @description find-users page
 * @param {Array} users users list
 * @param {Number} pageSize quantity users for one page
 * @param {Number} total total users
 */
class FindUsers extends Component {
    async componentDidMount() {
        const {
            users,
            setUsers,
            setPageSize,
            setTotalSize,
            changeFetching,
        } = this.props;

        if (users.length) return;

        changeFetching(true);

        try {
            const { data } = await axios.get('/users1.json');

            setUsers(data.users);
            setPageSize(data.pageSize);
            setTotalSize(data.total);
            changeFetching(false);
        } catch (error) {
            throw new Error(error);
        }
    }

    async componentWillUnmount() {
        const { setUsers, changeCurrentPage, changeFetching } = this.props;

        try {
            const { data } = await axios.get('/users1.json');

            setUsers(data.users);
            changeCurrentPage(1);
            changeFetching(false);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @description following/unfolowing on user
     * @param {String} id user id
     * @param {Boolean} isFriend
     */
    followingManagement = (id, isFriend) => {
        const { follow, unfollow } = this.props;

        isFriend ? unfollow(id) : follow(id);
    };

    /**
     * @description pagination logic
     * @param {Number} currentPage
     */
    paginationManagement = async currentPage => {
        const { setUsers, changeCurrentPage, changeFetching } = this.props;

        changeFetching(true);

        try {
            const {
                data: { users },
            } = await axios.get(`/users${currentPage}.json`);

            setUsers(users);
            changeCurrentPage(currentPage);
            changeFetching(false);
        } catch (error) {
            throw new Error(error);
        }
    };

    render() {
        const { users, pageSize, total, currentPage, isFetching } = this.props;
        const pagesCount = Math.ceil(+total / +pageSize);
        const usersList = users.map(user => (
            <User
                key={user.id}
                followingManagement={this.followingManagement}
                {...user}
            />
        ));
            console.log(this.props.data)
        return (
            <section className={`${styles.users} list`}>
                {isFetching ? (
                    <Loader type='Circles' color={MAIN_COLOR} />
                ) : (
                    <Fragment>
                        <div className={styles.users__list}>{usersList}</div>
                        <div className={styles.users__pagination}>
                            <Pagination
                                quantity={pagesCount}
                                activeNumber={currentPage}
                                clickCB={this.paginationManagement}
                            />
                        </div>
                    </Fragment>
                )}
            </section>
        );
    }
}

const mapStateToProps = state => {
    const {
        usersState: { users, pageSize, total, currentPage, isFetching },
    } = state;

    return { users, pageSize, total, currentPage, isFetching };
};

const mapDispatchToProps = {
    follow: followAC,
    unfollow: unfollowAC,
    changeCurrentPage: changeCurrentPageAC,
    setPageSize: setPageSizeAC,
    setTotalSize: setTotalSizeAC,
    setUsers: setUsersAC,
    changeFetching: changeFetchingAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(findUsersHOC(FindUsers));
