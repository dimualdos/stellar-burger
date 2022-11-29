
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/actions/auth';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './css/page.module.css';


export function Register() {
    const dispatch = useDispatch();
    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const { user } = useSelector(state => state.user);
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const register = useCallback(
        (e) => {
            e.preventDefault();
            if (user) return;
            dispatch(registerUser(form));
            user.replace({ pathname: '/login' });
        }, [dispatch, form, user]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                <form className={styles.form}>
                    <h1 className={styles.heading}>Регистрация</h1>
                    <Input
                        type={'text'}
                        placeholder={`Имя`}
                        value={form.name}
                        name="name"
                        onChange={onChange} />
                    <Input
                        type={'email'}
                        placeholder={`E-mail`}
                        value={form.email}
                        name="email"
                        onChange={onChange} />
                    <PasswordInput
                        placeholder="Пароль"
                        value={form.password}
                        name="password"
                        onChange={onChange}
                    />
                    <Button onClick={register} htmlType="button" type="primary" size="medium" >
                        Зарегистрироваться
                    </Button>
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
