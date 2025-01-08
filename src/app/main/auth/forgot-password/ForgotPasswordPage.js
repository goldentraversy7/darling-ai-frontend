import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
});

const defaultValues = {
  email: "",
};

function ClassicForgotPasswordPage() {
  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const dispatch = useDispatch();

  const [isSendingLink, setIsSendingLink] = useState(false);

  function onSubmit({ email }) {
    setIsSendingLink(true);
    return;
    firebaseService
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsSendingLink(false);
        dispatch(
          showMessage({
            message: "Sent a reset password email to you.",
            variant: "success",
          })
        );
      })
      .catch((error) => {
        setIsSendingLink(false);
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
      <div className="absolute w-full h-full bg-[#000000] opacity-80" />
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow opacity-90">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <Typography className="text-2xl font-bold tracking-tight leading-tight">
            Forgot Password
          </Typography>
          {/* <img
            className="mt-32 w-144 mx-auto"
            src="assets/images/logo/logo.png"
            alt="logo"
          /> */}
          <form
            name="forgotPasswordForm"
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
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <LoadingButton
              variant="contained"
              color="secondary"
              className="w-full mt-4"
              aria-label="Send Reset Link"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              loading={isSendingLink}
            >
              Send Reset Link
            </LoadingButton>

            <Typography
              className="mt-32 text-md font-medium text-center"
              color="text.secondary"
            >
              <span>Return to</span>
              <Link className="ml-4" to="/sign-in">
                Sign In
              </Link>
            </Typography>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ClassicForgotPasswordPage;
