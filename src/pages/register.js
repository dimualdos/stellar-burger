
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/actions/auth';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';
import styles from './css/page.module.css';


export function Register() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { values, handleChange } = useForm({ email: '', password: '', name: '' });

    const register = useCallback(
        (e) => {
            e.preventDefault();
            if (user) return;
            dispatch(registerUser(values));
            user.replace({ pathname: '/login' });
        }, [dispatch, user, values]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                <form
                    onSubmit={register}
                    className={styles.form}>

                    <h1 className={styles.heading}>Регистрация</h1>
                    <Input
                        type={'text'}
                        placeholder={`Имя`}
                        value={values.name}
                        name="name"
                        onChange={(e) => handleChange(e)} />
                    <Input
                        type={'email'}
                        placeholder={`E-mail`}
                        value={values.email}
                        name="email"
                        onChange={(e) => handleChange(e)} />
                    <PasswordInput
                        placeholder="Пароль"
                        value={values.password}
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <button
                        type='submit'
                        className={styles.buttonConstructor}>
                        <p className={styles.buttonText}>Зарегистрироваться</p>
                    </button>
                </form>
                <div className={styles.divPerson}>
                    <p className={styles.textPerson}>Уже зарегистрованы?
                        <Link to={{ pathname: `/login` }}
                            className={styles.textLinkPerson}> Войти</Link></p>
                </div>
            </div>
        </section>
    )
}
