import { Navigate, Outlet } from 'react-router-dom';
import React from 'react'
import { RouteEndpoints } from 'Components/router/MainRouter';
import { useAuth } from 'Modules/hooks/useAuth';

export { PrivateOutlet, PrivateRoute };

type Props = {
    children: React.ReactNode[] | React.ReactNode;
    path: string;
}

function PrivateOutlet() {
    const user = useAuth();
    return user ? <Outlet /> : <Navigate to={RouteEndpoints.user.login} />;
}

function PrivateRoute(props: Props) {
    const user = useAuth();
    return user ? props.children : <Navigate to={props.path} replace />;
}