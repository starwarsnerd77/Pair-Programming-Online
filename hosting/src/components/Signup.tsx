// import { useState } from "react";
// import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";


// export const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const provider = new GoogleAuthProvider();

//   function signup() {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then(({user}) => {
//         console.log(user);
//       });
//   }

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         />
//       </div>
//       <button onClick={() => signup()}>Sign Up</button>
//       <div>
//         <a onClick={() => navigate("/login")}>Already have an account? Log in here!</a>
//       </div>
//       <div>
//         <a onClick={() => signInWithRedirect(auth, provider)}>Sign in with Google</a>
//       </div>
//     </div>
//   );
// }

import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export const Signup = () => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        const passwordConfirm = data.get('password-confirm')?.toString();

        if (password === passwordConfirm) {
          createUserWithEmailAndPassword(auth, email ? email : "", password ? password : "")
            .then(({user}) => {
              console.log(user);
            });
        }
    };

    return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Create Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password-confirm"
                label="Confirm Password"
                type="password"
                id="password"
            />
            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            /> */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Create Account
            </Button>
            <Grid container>
                <Grid item>
                <Link variant="body2" onClick={() => navigate("/login")}>
                    {"Already have an account? Login"}
                </Link>
                </Grid>
            </Grid>
            <Button 
                variant="text"
                className="login-with-google-btn"
                onClick={() => signInWithRedirect(auth, provider)}
                sx={{ mt: 3}}
            >
                Sign in with Google
            </Button>
            </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
    </ThemeProvider>
    );
}