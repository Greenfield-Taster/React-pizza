import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import welcomeMinion from "../assets/img/welcomeMinion.jpg";

function Register() {
  const { register, handleSubmit, formState, control } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("submitted", data);

    axios
      .post(
        "https://pizzas-identity.azurewebsites.net/api/users/register",
        data
      )
      .then((response) => {
        console.log("submitted data", response.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div className="container">
      <div className="registerWrap">
        <div className="minionPicture">
          <img src={welcomeMinion} />
        </div>
        <div className="profile">
          <div className="profileUserInfo">
            <h2>Registration</h2>
            <form
              className="profileForm"
              action="editProfile"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.name && (
                <p className="errorText">{errors.username.message}</p>
              )}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="user@gmail.com"
                {...register(
                  "email",
                  {
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid email format",
                    },
                  },
                  { required: "Email is required" }
                )}
              />
              {errors.email && (
                <p className="errorText">{errors.email.message}</p>
              )}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="errorText">{errors.password.message}</p>
              )}

              <label htmlFor="phoneNumber">Phone</label>
              <div className="phoneForm">
                <Controller
                  control={control}
                  name="phoneNumber"
                  placeholder="1 (702) 123-4567"
                  rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <PhoneInput
                      {...field}
                      inputExtraProps={{
                        ref,
                        required: true,
                        autoFocus: true,
                      }}
                      country={"ua"}
                      countryCodeEditable={false}
                    />
                  )}
                />
              </div>

              <button type="submit" className="button ">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
