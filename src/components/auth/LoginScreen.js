import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLoginWithEmailPassword, startLoginWithGoogle } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);


    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startLoginWithGoogle());
    }

    return (
        <div className="auth__contenedor animate__animated animate__fadeIn animate__faster">
            <div className="auth__title">Welcome</div>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >Login</button>

                <div className="auth__social-networks">
                    <div className="auth__or">
                        <div className="linea">&nbsp;</div>
                        <div className="leyenda">Or</div>
                        <div className="linea">&nbsp;</div>
                    </div>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            Sign in with google
                        </p>
                    </div>
                </div>
                <div className="auth__create-account">
                    Don't have an account?
                    <Link to="/auth/register" className="link">&nbsp;Click here</Link>
                </div>
            </form>
        </div>
    )
}
