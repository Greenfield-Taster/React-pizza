import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import welcomeMinion from "../assets/img/welcomeMinion.jpg";

function Register() {
  const { register, handleSubmit, formState, control } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("submitted", data);
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="errorText">{errors.name.message}</p>
              )}
              <label htmlFor="surname">Surname*</label>
              <input type="text" id="surname" />
              {errors.surname && (
                <p className="errorText">{errors.surname.message}</p>
              )}
              <label htmlFor="email">Email*</label>
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
              <label htmlFor="userPhoneNumber">Phone</label>
              <div className="phoneForm">
                <Controller
                  control={control}
                  name="phone"
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
