
import { useCallback, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getNewPassword } from '../services/actions/auth';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { TStateReducer } from '../services/reducers';
import { useForm, useAppDispatch } from '../hooks/hooks';
import styles from './css/page.module.css';


export function ResetPass() {

    const dispatch = useAppDispatch();
    const { values, handleChange } = useForm({ password: '', token: '' });

    const { passwordData } = useSelector((state: TStateReducer) => state.user);
    //? стандартная отправка формы без пользовательского хука
    // const [form, setValue] = useState({ password: '', token: '' });
    // const onChange = e => {
    //     setValue({ ...form, [e.target.name]: e.target.value });
    // };

    const resetPassword = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault();
            if (!passwordData) return;
            dispatch(getNewPassword(values));
        },
        [dispatch, passwordData, values]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {passwordData ?
                    (<form
                        onSubmit={resetPassword}
                        className={styles.form}>
                        <h1 className={styles.heading}>Восстановление пароля</h1>
                        <Input
                            type={'password'}
                            placeholder="Введите новый пароль"
                            value={values.password}
                            name={'password'}
                            onChange={(e) => handleChange(e)}
                            icon={'ShowIcon'}
                        />
                        <Input
                            type={'text'}
                            placeholder="Введите код из письма"
                            value={values.token}
                            name={"token"}
                            onChange={(e) => handleChange(e)} />
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
                    )}

                <div className={styles.divPerson}>
                    <p className={styles.textPerson}>Вспомнили пароль?
                        <Link to={{ pathname: `/login` }}
                            className={styles.textLinkPerson}> Войти</Link></p>
                </div>
            </div>
        </section>


    )
}
