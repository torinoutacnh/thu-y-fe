import { Navigate, Outlet } from 'react-router-dom';
import React from 'react'
import { RouteEndpoints } from 'Components/router/MainRouter';
import { useStoreSelector } from 'Modules/Redux';

export { PrivateOutlet, PrivateRoute };

type Props = {
    children: React.ReactNode;
    path: string;
}

function PrivateOutlet() {
    const { user } = useStoreSelector((state: any) => state.login);
    return user ? <Outlet /> : <Navigate to={RouteEndpoints.user.login} />;
}

function PrivateRoute({ children, path }: Props) {
    const { user } = useStoreSelector((state: any) => state.login);
    return user ? { children } : <Navigate to={path} replace />;
}