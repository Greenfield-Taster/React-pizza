import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

import privatterminal from "../assets/img/privatterminal_color.png";
import googlePay from "../assets/img/googlepay_color.svg";

const CartOrder = () => {
  const { register, handleSubmit, formState, control } = useForm();
  const { errors } = formState;

  const [selectedPayment, setSelectedPayment] = React.useState("");

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const onSubmit = async (data) => {
    data.paymentMethod = selectedPayment;
    console.log("Form submitted", data);
    // console.log("Selected Payment:", selectedPayment);

    await axios
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
        {errors.name && <p className="errorText">{errors.name.message}</p>}
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          id="surname"
          {...register("surname", { required: "Surname is required" })}
        />
        {errors.surname && (
          <p className="errorText">{errors.surname.message}</p>
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
        {errors.email && <p className="errorText">{errors.email.message}</p>}
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
        <div className="form-group">
          <h2>Delivery Type</h2>
          <div className="radio-options">
            <div>
              <input
                type="radio"
                id="delivery"
                {...register("deliveryType", {
                  required: "Please select a delivery option",
                })}
                value="delivery"
              />
              <label htmlFor="delivery">🚚 Delivery</label>
            </div>
            <div>
              <input
                type="radio"
                id="pickup"
                {...register("deliveryType", {
                  required: "Please select a delivery option",
                })}
                value="pickup"
              />
              <label htmlFor="pickup">🏠 Self-Pickup</label>
            </div>
          </div>
          {errors.deliveryType && (
            <p className="errorText">{errors.deliveryType.message}</p>
          )}
        </div>
        <div className="pay-form">
          <div className="pay-form-select">
            <div>
              <h3>CASH</h3>
              <div
                className={`payment-option ${
                  selectedPayment === "cash" ? "selected" : ""
                }`}
                onClick={() => handlePaymentSelection("cash")}
              >
                <img src={privatterminal} alt="Cash Payment" />
                <input
                  type="radio"
                  id="cash"
                  value="cash"
                  {...register("paymentMethod", {
                    required: "Please select a payment method",
                  })}
                  onChange={() => handlePaymentSelection("cash")}
                  checked={selectedPayment === "cash"}
                />
              </div>
            </div>

            <div>
              <h3>CASHLESS</h3>
              <div
                className={`payment-option ${
                  selectedPayment === "cashless" ? "selected" : ""
                }`}
                onClick={() => handlePaymentSelection("cashless")}
              >
                <img src={googlePay} alt="Cashless Payment" />
                <input
                  type="radio"
                  id="cashless"
                  value="cashless"
                  {...register("paymentMethod", {
                    required: "Please select a payment method",
                  })}
                  onChange={() => handlePaymentSelection("cashless")}
                  checked={selectedPayment === "cashless"}
                />
              </div>
            </div>
          </div>

          {errors.paymentMethod && (
            <p className="errorText">{errors.paymentMethod.message}</p>
          )}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default CartOrder;
