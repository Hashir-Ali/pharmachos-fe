"use client";
import Link from "next/link";
import { useSessionStorage, useLocalStorage } from "usehooks-ts";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CSSProperties, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect, useRouter } from "next/navigation";
import { Timeout } from "ahooks/lib/useRequest/src/types";
import { usePostRequest } from "@/hooks/usePostRequest";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

const bgImage: CSSProperties = {
  background: "url('/assets/images/bg-green.svg') no-repeat",
  backgroundSize: "cover",
};

const LoginErrorMsg = "Please double check your email and password.";
const LoginSuccessMsg = "Login Successful. Redirecting ...";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  remember: yup.bool(),
});

type LoginResponse = {
  access_token: string;
};

type LoginForm = {
  email: string;
  password: string;
  remember?: boolean;
};

export default function Login() {
  let timeout: Timeout;
  const router = useRouter();
  const { isAuthenticated } = useIsAuthenticated();
  const [_, setAccessTokenLS] = useLocalStorage("accessToken", "");
  const [__, setAccessTokenSS] = useSessionStorage("accessToken", "");
  const { data, fetchData, error, loading, fetched } =
    usePostRequest<LoginResponse>("/auth/login");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ email, password }: LoginForm) => {
    fetchData({ username: email, password });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!data?.access_token) return;
    const { remember } = getValues();
    remember
      ? setAccessTokenLS(data.access_token)
      : setAccessTokenSS(data.access_token);
  }, [data]);

  if (data && !error) {
    timeout = setTimeout(() => {
      router.replace("/dashboard");
    }, 1000);
  }

  return (
    <div className={`overflow-y-hidden h-screen flex flex-row`}>
      <div className='basis-full lg:basis-1/2 bg-white flex flex-col justify-center items-center'>
        <div className='flex gap-x-3 p-5 absolute top-0 left-0'>
          <img src='/assets/images/logo.svg' alt='Logo' />
          <Link href='/stocks' className=' text-primary-green text-lg'>
            <b>Pharmacy</b> OS
          </Link>
        </div>
        <div className='flex flex-col min-w-[384px] w-1/2 px-5'>
          <div className='text-center mb-8'>
            <h1 className='font-semibold text-2xl md:text-3xl'>
              Streamline <br className='hidden lg:block' /> prescriptions with
              ease
            </h1>
            <p className='mt-5 text-gray-800'>
              Welcome back! Please enter your details.
            </p>
          </div>
          <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <FormControl variant='outlined'>
              <p className='mb-2'>Email</p>
              <TextField
                fullWidth
                size='small'
                placeholder='Enter your email'
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </FormControl>
            <FormControl variant='outlined'>
              <p className='mt-5 mb-2'>Password</p>
              <TextField
                fullWidth
                size='small'
                type='password'
                placeholder='••••••••'
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </FormControl>
            <div className='flex justify-between items-center mt-3'>
              <FormControlLabel
                control={<Checkbox {...register("remember")} />}
                label='Remember for 30 days'
              />
              <Link href='#' className=' text-primary-green text-sm'>
                Forgot Password
              </Link>
            </div>
            <Button
              className=' bg-primary-green mt-5 h-10'
              variant='contained'
              disableElevation
              type='submit'
              disabled={loading || fetched}
            >
              {loading && <CircularProgress size={20} className='mr-3' />}
              Sign In
            </Button>
          </form>
          <div className='mt-5'>
            {error && (
              <Alert severity='error'>
                {error?.message}. {LoginErrorMsg}
              </Alert>
            )}
            {fetched && <Alert severity='success'>{LoginSuccessMsg}</Alert>}
          </div>
        </div>
      </div>
      <div className='basis-1/2 hidden lg:block' style={bgImage}>
        <div className='flex justify-end p-5'>
          <Button
            variant='outlined'
            className='bg-transparent text-white border-white hover:text-white hover:border-white hover:outline-none'
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
