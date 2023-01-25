import { FunctionComponent, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutAuth } from '../services/actions/auth';
import { useForm, useAppDispatch } from '../hooks/hooks';
import { TStateReducer } from '../services/reducers';
import styles from './css/profile.module.css';


export const LeftSectionInProfile: FunctionComponent = () => {
    const dispatch: any = useAppDispatch();
    let onLogout = (e: MouseEvent<HTMLAnchorElement>) => {
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
                <Link to={{ pathname: `/` }} onClick={onLogout} >
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


export const Profile: FunctionComponent = () => {
    const { data } = useSelector((state: TStateReducer) => state.user);
    const { values, handleChange } = useForm({ email: `${data ? (data.email) : ('')}`, password: `${data ? (data.password) : ('')}`, name: `${data ? (data.name) : ('')}` });

    return (
        <section className={styles.section}>
            <div className={styles.leftContainer}>
                <LeftSectionInProfile />
                <form
                    className={styles.form}>
                    <Input
                        type={'text'}
                        placeholder={`Имя`}
                        value={values.name}
                        name={"name"}
                        onChange={(e) => handleChange(e)}
                        icon={'EditIcon'}
                    />
                    <Input
                        type={'text'}
                        placeholder={`Логин`}
                        value={values.email}
                        name={"email"}
                        onChange={(e) => handleChange(e)}
                        icon={'EditIcon'}
                    />
                    <Input
                        type={'password'}
                        placeholder={"Пароль"}
                        value={values.password}
                        name={"password"}
                        onChange={(e) => handleChange(e)}
                        icon={'EditIcon'}
                    />
                </form>

            </div>
        </section>
    )
}
