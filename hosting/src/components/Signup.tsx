import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";


export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  function signup() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        console.log(user);
      });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
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
      <button onClick={() => signup()}>Sign Up</button>
      <div>
        <a onClick={() => navigate("/login")}>Already have an account? Log in here!</a>
      </div>
      <div>
        <a onClick={() => signInWithRedirect(auth, provider)}>Sign in with Google</a>
      </div>
    </div>
  );
}