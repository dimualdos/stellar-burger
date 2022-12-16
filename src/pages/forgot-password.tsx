
import { useCallback, useEffect, FunctionComponent, SyntheticEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { restorePassword } from '../services/actions/auth';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from '../hooks/hooks';
import { TStateReducer } from '../services/reducers';
import { useAppDispatch } from '../hooks/hooks';
import styles from './css/page.module.css';


export const ForgotPass: FunctionComponent = () => {
    const { values, handleChange } = useForm({ email: '' });
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { passwordData } = useSelector((state: TStateReducer) => state.user);


    const resetPassword = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault();
            dispatch(restorePassword(values));
        },
        [dispatch, values]);

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
                        value={values.email}
                        name="email"
                        onChange={(e) => handleChange(e)} />
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
