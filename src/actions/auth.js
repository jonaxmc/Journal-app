import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'
import {noteLogout} from './notes'



// const auth = getAuth();

export const startLoginWithEmailPassword = (email, password) => {

    return (dispatch) => {

        dispatch(startLoading());
        // signInWithEmailAndPassword(auth, email, password)
        //     .then(({ user }) => {
        //         dispatch(finishLoading());
        //         dispatch(
        //             login(user.uid, user.displayName)
        //         )
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         dispatch(finishLoading());
        //         Swal.fire('Error', e.message, 'error');
        //     })
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName ));

                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

    }

}

export const register = (name, email, password) => {
    return (dispatch) => {


        // createUserWithEmailAndPassword(auth, email, password)
        //     .then(async ({ user }) => {

        //         await updateProfile(user, { displayName: name })
                

        //         dispatch(
        //             login(user.uid, user.displayName)
        //         );

        //     }).catch(e => {
        //         console.log(e)
        //         Swal.fire("Error", e.message, 'error');
        //     })
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                );
            })
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })
    }
}



export const startLoginWithGoogle = () => {
    return (dispatch) => {

        // signInWithPopup(auth, googleAuthProvider)
        //     .then(({ user }) => {
        //         dispatch(
        //             login(user.uid, user.displayName)
        //         )
        //     });
        firebase.auth().signInWithPopup( googleAuthProvider )
        .then( ({ user }) => {
            dispatch(
                login( user.uid, user.displayName )
            )
        });
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async (dispatch) => {
        // await auth.signOut();
        await firebase.auth().signOut();
        dispatch(logout());

        dispatch(noteLogout())
    }
}

export const logout = () => ({
    type: types.logout
})