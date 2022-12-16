
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';
import { loginUser } from '../services/actions/auth';
import styles from './css/page.module.css';


export function LoginPage() {
    const dispatch = useDispatch();
    const { values, handleChange } = useForm({ email: '', password: '' });

    const { loginUserRequest } = useSelector(state => state.user);

    const handleClick = useCallback(
        (e) => {
            e.preventDefault();
            if (loginUserRequest) return;
            dispatch(loginUser(values));
        }, [loginUserRequest, dispatch, values]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <form
                    onSubmit={handleClick}
                    className={styles.form}>
                    <h1 className={styles.heading}>Вход</h1>
                    <Input
                        placeholder="E-mail"
                        value={values.email}
                        name="email"
                        onChange={(e) => handleChange(e)} />
                    <PasswordInput
                        placeholder="Пароль"
                        value={values.password}
                        name="password"
                        onChange={(e) => handleChange(e)}
                        icon='ShowIcon'
                    />
                    <button
                        type='submit'
                        className={styles.buttonConstructor}>
                        <p className={styles.buttonText}>Войти</p>
                    </button>
                </form>

                <div className={styles.containerBottom}>
                    <div className={styles.divPerson}>
                        <p className={styles.textPerson}>Вы - новый пользователь?
                            <Link to={{ pathname: `/register` }}
                                className={styles.textLinkPerson}> Зарегистрироваться</Link>
                        </p>
                    </div>

                    <div className={styles.divPerson}>
                        <p className={styles.textPerson}>Забыли пароль?
                            <Link to={{ pathname: `/forgot-password` }}
                                className={styles.textLinkPerson}> Восстановить пароль</Link>
                        </p>
                    </div>
                </div>

            </div>
        </section>

    )
}