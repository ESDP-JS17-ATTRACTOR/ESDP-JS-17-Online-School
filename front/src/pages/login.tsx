import {Inter} from 'next/font/google'
import Link from 'next/link';
import {useRouter} from "next/router";
import React, {useState} from "react";
import {GoogleLogin} from "@react-oauth/google";
import {selectLoginError, selectLoginLoading} from "@/features/users/usersSlice";
import {googleLogin, login} from "@/features/users/usersThunks";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {LoginMutation} from "../../types";
import {Alert, Avatar, Box, Button, CircularProgress, Container, Grid, TextField, Typography} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';


const inter = Inter({subsets: ['latin']})


const Login = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectLoginError);
    const logining = useAppSelector(selectLoginLoading);
    const router = useRouter();

    const [logState, setLogState] = useState<LoginMutation>({
        email: '',
        password: ''
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLogState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login(logState)).unwrap();
        await router.push('/');
    };

    const googleLoginHandler = async (credentials: string) => {
        await dispatch(googleLogin(credentials)).unwrap();
        await router.push('/');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOpenIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box sx={{pt: 2}}>
                    <GoogleLogin onSuccess={(credentialResponse) => {
                        if (credentialResponse.credential) {
                            googleLoginHandler(credentialResponse.credential);
                        }
                    }}
                                 onError={() => {
                                     console.log('Login failed');
                                 }}
                    />
                </Box>
                {error && (
                    <Alert severity="error" sx={{mt: 3, width: '100%'}}>
                        {error.error}
                    </Alert>)}
                <Box component="form"
                     onSubmit={submitFormHandler}
                     sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                autoComplete="current-email"
                                type="email"
                                value={logState.email}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={logState.password}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={logining}
                    >
                        {logining ?
                            (<Box sx={{display: 'flex'}}>
                                <CircularProgress/>
                            </Box>) : "Sign In"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/register">
                                Or sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}


export default Login;
