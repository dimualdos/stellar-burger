
import { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { restorePassword } from '../services/actions/auth';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './css/page.module.css';

export function ForgotPass() {
    const [form, setValue] = useState({ email: '' });
    const dispatch = useDispatch();
    const history = useHistory();
    const { passwordData } = useSelector(state => state.user);
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const resetPassword = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(restorePassword(form));
        },
        [dispatch, form]);

    useEffect(() => {
        if (passwordData) {
            history.replace({
                pathname: '/reset-password',
            })
        };
    }, [history, passwordData]);


    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <form
                    onSubmit={resetPassword}
                    className={styles.form}>
                    <h1 className={styles.heading}>Восстановление пароля</h1>
                    <Input
                        type={'email'}
                        placeholder={`Укажите e-mail`}
                        value={form.email}
                        name="email"
                        onChange={onChange} />
                    <button
                        type='submit'
                        className={styles.buttonConstructor}>
                        <p className={styles.buttonText}>Восстановить</p>
                    </button>
                </form>
                <div className={styles.divPerson}>
                    <p className={styles.textPerson}>Вспомнили пароль?
                        <Link to={{ pathname: `/login` }}
                            className={styles.textLinkPerson}> Войти</Link></p>
                </div>
            </div>
        </section>
    )
}
