import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(6, "Password is too short - must be at least 6 chars."),
});

const defaultValues = {
  email: "admin@example.com",
  password: "password",
  remember: true,
};

function SignInPage() {
  const navigate = useNavigate();
  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [isSignIning, setIsSignIning] = useState(false);

  function onSubmit({ email, password }) {
    navigate("/");
    return;
    setIsSignIning(true);
    firebaseService
      .signIn(email, password)
      .then((user) => {})
      .catch((error) => {
        setIsSignIning(false);
        setError("email", {
          type: "manual",
          message: error.message,
        });
      });
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          className="w-full h-full"
          alt="Sign In"
          src="assets/images/auth/background.png"
        />
      </div>
      <div className="absolute w-full h-full bg-[#000000] opacity-10" />
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow opacity-90">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <Typography className="text-2xl font-bold tracking-tight leading-tight">
            Sign In
          </Typography>
          {/* <img
            className="mt-32 w-144 mx-auto"
            src="assets/images/logo/logo.png"
            alt="logo"
          /> */}
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-48"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-48"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            {/* <Link
              className="text-md font-medium mx-auto mb-8"
              to="/forgot-password"
            >
              Forgot Password?
            </Link> */}

            <LoadingButton
              variant="contained"
              color="secondary"
              className="w-full mt-16"
              aria-label="Sign in"
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              loading={isSignIning}
            >
              Sign In
            </LoadingButton>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignInPage;
