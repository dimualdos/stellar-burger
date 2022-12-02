import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutAuth } from '../services/actions/auth';
import styles from './css/profile.module.css';


export const LeftSectionInProfile = () => {
    const dispatch = useDispatch();
    let onLogout = (e) => {
        e.preventDefault();
        dispatch(logoutAuth());
    }

    return (

        <nav>
            <div>
                <NavLink
                    to={{ pathname: '/profile' }} exact
                    className={styles.textProfile}
                    activeClassName={styles.styleActiveClass}>
                    <p>Профиль</p>
                </NavLink>
                <NavLink to={{ pathname: `/profile/orders` }} exact
                    className={styles.textProfile}
                    activeClassName={styles.styleActiveClass}>
                    <p>История заказов</p>
                </NavLink>
                <Link to={{ pathname: `/` }} onClick={onLogout}>
                    <li className={styles.textProfile} > <p>Выход</p> </li>
                </Link>
            </div>
            <div>
                <p className={styles.textPersonal}>
                    В этом разделе Вы можете изменить свои персональные данные
                </p>
            </div>
        </nav>
    )
}


export const Profile = () => {
    const { data } = useSelector(state => state.user);
    const [form, setValue] = useState({ email: `${data ? (data.email) : ('')}`, password: `${data ? (data.password) : ('')}`, name: `${data ? (data.name) : ('')}` });
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <LeftSectionInProfile />
                <form
                    className={styles.form}>
                    <Input
                        type={'text'}
                        placeholder={`Имя`}
                        value={form.name}
                        name={"name"}
                        onChange={() => onChange}
                        icon={'EditIcon'}
                    />
                    <Input
                        type={'text'}
                        placeholder={`Логин`}
                        value={form.email}
                        name={"email"}
                        onChange={() => onChange}
                        icon={'EditIcon'}
                    />
                    <PasswordInput
                        type={'password'}
                        placeholder={"Пароль"}
                        value={form.password}
                        name={"password"}
                        onChange={() => onChange}
                        icon={'EditIcon'}
                    />
                </form>

            </div>
        </section>
    )
}
