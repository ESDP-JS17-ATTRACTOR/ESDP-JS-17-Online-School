import React, {useState} from 'react';
import {Box, Button, Container, Grid, TextField} from "@mui/material";
import {RegisterMutation} from "../../types";
import {useAppDispatch} from "../../hooks";
import {register} from "@/features/users/usersThunks";
import {useRouter} from "next/router";
import Layout from "@/components/UI/Layout";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [state, setState] = useState<RegisterMutation>({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    password: ""
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState => ({...prevState, [name]: value})));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      await router.push('/');
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Layout>
      <Container>
        <Box component="form" sx={{mt: 3}} onSubmit={onFormSubmit}>
          <Grid container flexDirection="column" spacing={2}>
            <Grid item xs>
              <TextField
                name="email"
                label="E-mail"
                value={state.email}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <TextField
                name="firstName"
                label="First Name"
                value={state.firstName}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <TextField
                name="lastName"
                label="Last name"
                value={state.lastName}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <TextField
                name="country"
                label="Country"
                value={state.country}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <TextField
                name="password"
                label="Password"
                value={state.password}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <TextField
                name="phoneNumber"
                label="Phone number"
                value={state.phoneNumber}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
            >Sign Up</Button>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;