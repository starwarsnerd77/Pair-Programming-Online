import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";



export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <div>
                <label htmlFor="Email">Email:</label>
                <input
                type="text"
                id="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button onClick={() => login()}>Login</button>
            <div>
                <a onClick={() => navigate("/signup")}>Don't have an account? Sign up here!</a>
            </div>
            <div>
                <a onClick={() => signInWithRedirect(auth, provider)}>Sign in with Google</a>
            </div>
        </div>
    )
}