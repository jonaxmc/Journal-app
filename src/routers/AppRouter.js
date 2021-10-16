import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { login } from '../actions/auth';
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { firebase } from '../firebase/firebaseConfig'
import { startLoadingNotes } from '../actions/notes';



export const AppRouter = () => {

    const dispatch = useDispatch();

    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
                
            }else{
                setIsLoggedIn(false)
            }
            setCheking(false)
        })
    }, [dispatch, setCheking, setIsLoggedIn])

    if(cheking){
        return(
            <h1>Wait...</h1>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path='/auth' component= {AuthRouter} isAuthenticated={isLoggedIn}/>
                    <PrivateRoute exact path='/' component= {JournalScreen} isAuthenticated={isLoggedIn}/>
                    <Redirect to='/auth/login'/>
                    
                </Switch>
            </div>
        </Router>
    )
}
