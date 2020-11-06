import React from 'react';
import '../App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Info from '../components/Info';
import Registration from '../components/Registration';
import AuthState from '../context/auth/user/AuthState';
import AlertState from '../context/alert/AlertState';
import VehicleRegistration from '../components/VehicleRegistration';

const AppRouter = () => {
    return (
        <AuthState>
            <AlertState>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route exact path='/info' component={Info} />
                            <Route exact path='/vehicle' component={VehicleRegistration} />
                            <Route exact path='/registration/:id' component={Registration} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </AlertState>
        </AuthState>
    );
};

export default AppRouter;
