import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

const CartOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted", data);

    axios
      .post("https://pizzas-backend.azurewebsites.net/users", data)
      .then((response) => {
        console.log("Server response:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error.response.data.message);
      });
  };

  return (
    <div className="cart cart--order">
      <h1>Checkout</h1>
      <form action="quickOrder" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          id="surname"
          {...register("surname", { required: "Surname is required" })}
        />
        {errors.surname && <p>{errors.surname.message}</p>}

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
        {errors.email && <p>{errors.email.message}</p>}

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
                // onlyCountries={["ua"]}
                countryCodeEditable={false}
              />
            )}
          />
        </div>
        <input type="submit" />
      </form>
    <div>
      
    </div>
    </div>
  );
};

export default CartOrder;