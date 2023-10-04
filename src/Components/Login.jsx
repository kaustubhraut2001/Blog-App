import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../Redux/authslice";
import { Button, Logo, Input } from "./index";
import {useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import authservice from '../Appwrite/auth'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  // we got it from react-hook-form
  const { register, handleSubmit } = useForm();

  const loginuser = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);
      if (session) {
        // get the user from the service using authservice
        const user = await authservice.getcurrentuser();
        // dispatch the action
        dispatch(login(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="">
      <div className="">
        <div className="">
          <Logo />
        </div>
      </div>
      <h2>Sign in </h2>
      {error && <div className="">{error}</div>}
      // alwas use handlesubmit it is and event that is called
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <Input
            type="email"
            name="email"
            placeholder="Email : "
            // we got it from react-hook-form
            // this is from react-hook-form
            {...register("email", {
              // here we passws options
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
                  "invalid email",
              },
            })}
          />
          <input
            type="password"
            className=""
            placeholder="Password"
            {...register("password", {
              required: true,
              validate: {
                minLength: (value) => value.length >= 8 || "too short",
              },
            })}
          />
		  <Button
		  type="submit"
      onClick={handleSubmit(loginuser)}

		  >Sign In</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
