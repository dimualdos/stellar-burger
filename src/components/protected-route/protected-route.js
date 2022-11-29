//import { useAuth } from '../../services/auth';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { Spinner } from '../spinner/spinner';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ onlyUnAuth = false, children, ...rest }) => {
    const isAuthCheked = useSelector(state => state.user.isAuthCheked);
    const user = useSelector(state => state.user.data);
    const location = useLocation();
    if (!isAuthCheked) {
        return (<Spinner />)
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } };
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

    // let { getUser, ...auth } = useAuth();
    // const [isUserLoaded, setUserLoaded] = useState(false);

    // const init = async () => {
    //     await getUser();
    //     setUserLoaded(true);
    // };

    // useEffect(() => {
    //     init();
    // }, []);

    // if (!isUserLoaded) {
    //     return null;
    // }


    // return (
    //     <Route
    //         {...rest}
    //         render={({ location }) =>
    //             auth.user ? (
    //                 children
    //             ) : (
    //                 <Redirect
    //                     to={{
    //                         pathname: '/login',
    //                         state: { from: location }
    //                     }}
    //                 />
    //             )
    //         }
    //     />
    // );
}

