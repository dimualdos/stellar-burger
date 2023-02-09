import { FormEvent, FunctionComponent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserData, logoutAuth, updateToken } from '../services/actions/auth';
import { useForm, useAppDispatch, useAppSelector } from '../hooks/hooks';
import { AppDispatch } from '../services/store';
import styles from './css/profile.module.css';
import { cookieData } from '../utils/cooke';
import likeIcon from '../images/likeIcon.png';
import { UPDATE_USER_DATA_RESET } from '../services/constants/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const elementIcon = <FontAwesomeIcon icon={faThumbsUp} />


export const LeftSectionInProfile: FunctionComponent = () => {
    const dispatch: AppDispatch = useAppDispatch();
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
    const { data, success } = useAppSelector((state) => state.user);
    const dispatch: AppDispatch = useAppDispatch();
    const { name, email, password } = data;
    const { values, handleChange } = useForm({
        email: `${email ? (email) : ('')}`,
        password: `${password ? (password) : ('')}`,
        name: `${name ? (name) : ('')}`
    });
    const [successMessage, SetSuccessMessage] = useState<string | null>();
    const [successInput, setSuccessInput] = useState<{} | null>();

    useEffect(() => {
        if (!cookieData) return;

        if (success) {
            const timeout = setTimeout(() => {
                SetSuccessMessage('Данные изменены');
                setTimeout(() => {
                    dispatch({ type: UPDATE_USER_DATA_RESET })
                }, 5000)
            })
            return () => clearTimeout(timeout)
        }

    }, [dispatch, success, handleChange, values]);


    const resetUpdateProfile = useCallback(

        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(getUserData(values));
        },
        [dispatch, values]);

    return (
        <section className={styles.section}>
            <div className={styles.leftContainer}>
                <LeftSectionInProfile />

                <form
                    onSubmit={resetUpdateProfile}
                    className={styles.form}>
                    <Input
                        type={'text'}
                        placeholder={`Имя`}
                        value={values.name}
                        name={"name"}
                        onChange={(e) => handleChange(e)}
                        onInput={(e) => setSuccessInput(e)}
                        icon={'EditIcon'}
                    />
                    <Input
                        type={'text'}
                        placeholder={`Логин`}
                        value={values.email}
                        name={"email"}
                        onChange={(e) => handleChange(e)}
                        onInput={(e) => setSuccessInput(e)}
                        icon={'EditIcon'}
                    />
                    <Input
                        type={'password'}
                        placeholder={"Пароль"}
                        value={values.password}
                        name={"password"}
                        onChange={(e) => handleChange(e)}
                        onInput={(e) => setSuccessInput(e)}
                        icon={'EditIcon'}
                    />
                    <div className={styles.row}>
                        {successInput ? (
                            <>
                                <button
                                    type='submit'
                                    className={styles.buttonConstructor}>
                                    <p className={styles.buttonText}>Изменить данные</p>
                                </button>
                            </>

                        ) : (null)}

                        {success ? (<p className={styles.buttonText}>
                            {elementIcon} {successMessage}
                        </p>) : (
                            null
                        )}

                    </div>

                </form>
            </div>
        </section>
    )
}
