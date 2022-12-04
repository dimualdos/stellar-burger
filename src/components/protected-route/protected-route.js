import PropTypes from 'prop-types';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const ProtectedRoute = ({ onlyUnAuth = false, children, ...rest }) => {
    const location = useLocation();
    const user = useSelector(store => store.user.data);

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
}

const routeTypes = PropTypes.shape({
    path: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    computedMatch: PropTypes.object.isRequired
})

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
    rest: routeTypes
}

