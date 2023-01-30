
import { FC } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { TStateReducer } from '../../services/reducers';
import { useAppSelector } from '../../hooks/hooks';


type TProtectedRoute = {
    onlyUnAuth?: boolean;
    children: any;
    rest?: string;
    path: string;
    exact?: boolean;
}


export const ProtectedRoute: FC<TProtectedRoute> = ({ onlyUnAuth = false, children, ...rest }) => {
    const location = useLocation();
    const user = useAppSelector((store) => store.user.data);

    if (onlyUnAuth && user) {
        const { from }: any = location.state || { from: { pathname: '/' } };
        return (
            <Route {...rest}>
                <Redirect to={from} />
            </Route>
        );
    }

    if (!onlyUnAuth && !user) {

        return (
            <Route {...rest}>
                <Redirect to={{ pathname: '/login', state: { from: location } }} />
            </Route>
        );
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    )
}

