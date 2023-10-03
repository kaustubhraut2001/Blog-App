import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, Input } from "./index";
import { useSelector, useDispatch } from "react-redux";
import authservice from "../Appwrite/auth";
import { useForm } from "react-hook-form";
import login from "../Redux/authslice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      const userdata = await authservice.createAccount(data);
      if (userdata) {
        const user = await authservice.getcurrentuser();
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
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
      <h2>Sign up</h2>
      {error && <div className="">{error}</div>}
      // alwas use handlesubmit it is and event that is called
      <form onSubmit={handleSubmit(signup)} className="">
        <div className="">
          <input
            type="text"
            name=""
            id="name"
            className=""
            placeholder="Name"
            {...register("name", {
              required: true,
            })}
          />
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
            label="password"
            placeholder="password"
            {...register("password", {
              required: true,
            })}
          />
          \
          <Button type="submit" onclick={handleSubmit(signup)}>
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
