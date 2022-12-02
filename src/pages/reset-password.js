
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNewPassword } from '../services/actions/auth';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './css/page.module.css';


export function ResetPass() {

    const dispatch = useDispatch();
    const [form, setValue] = useState({ password: '', token: '' });
    const { passwordData } = useSelector(state => state.user);
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const resetPassword = useCallback(
        (e) => {
            e.preventDefault();
            if (!passwordData) return;
            dispatch(getNewPassword(form));
        },
        [dispatch, form, passwordData]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {passwordData ?
                    (<form
                        onSubmit={resetPassword}
                        className={styles.form}>
                        <h1 className={styles.heading}>Восстановление пароля</h1>
                        <PasswordInput
                            type={'password'}
                            placeholder="Введите новый пароль"
                            value={form.password}
                            name={'password'}
                            onChange={onChange}
                            icon={'ShowIcon'}
                        />
                        <Input
                            type={'text'}
                            placeholder="Введите код из письма"
                            value={form.token}
                            name={"token"}
                            onChange={onChange} />
                        <button
                            type='submit'
                            className={styles.buttonConstructor}>
                            <p className={styles.buttonText}>Сохранить</p>
                        </button>
                    </form>) : (<Link to={{ pathname: `/forgot-password` }}>
                        <Button htmlType="button" type="primary" size="medium">
                            Перейти на страницу сброса пароля
                        </Button>
                    </Link>
                    )

                }
                <div className={styles.divPerson}>
                    <p className={styles.textPerson}>Вспомнили пароль?
                        <Link to={{ pathname: `/login` }}
                            className={styles.textLinkPerson}> Войти</Link></p>
                </div>
            </div>
        </section>


    )
}
