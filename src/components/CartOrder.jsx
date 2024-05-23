import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CartOrderDone from "./CartOrderDone";

import privatterminal from "../assets/img/cash1.png";
import googlePay from "../assets/img/terminal.png";
import { clearItems } from "../redux/slices/cartSlice";

const CartOrder = () => {
  const { register, handleSubmit, formState, control, setValue } = useForm();
  const { errors } = formState;

  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state) => state.cart);

  const [selectedPayment, setSelectedPayment] = React.useState("");
  const [cartData, setCartData] = React.useState([]);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [selectedTypeDelivery, setSelectedTypeDelivery] =
    React.useState("delivery");

  const handleTypeDeliveryChange = (value) => {
    setSelectedTypeDelivery(value);
  };

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const finishSubmitting = () => {
    setFormSubmitted(true);
    dispatch(clearItems());
  };

  const onSubmit = async (data) => {
    data.paymentMethod = selectedPayment;
    data.dataOfOrderedPizzas = cartData;
    data.deliveryType = selectedTypeDelivery;
    console.log("Form submitted", data);

    await axios
      .post("https://pizzas-backend.azurewebsites.net/orders", data)
      .then((response) => {
        console.log("Server response:", response.data);
        finishSubmitting();
      })
      .catch((error) => {
        console.error("Error submitting form:", error.response.data.message);
      });
  };

  React.useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      setCartData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="cart cart--order">
      {formSubmitted ? (
        <CartOrderDone />
      ) : (
        <>
          <div className="user-order">
            <div className="pizza-order-container">
              <h1>Your order</h1>
              <div className="pizza-order-items">
                {cartData.map((item) => (
                  <div className="pizza-order" key={item._id}>
                    <div className="pizza-info">
                      <div className="selected-description-full">
                        <h3>{item.title}</h3>
                        <div className="selected-description">
                          <p>{item.size} sm</p>,<p>{item.type}</p>
                        </div>
                      </div>
                      <h4>{item.count}</h4>
                      <h4>$ {item.price}</h4>
                    </div>
                  </div>
                ))}
                <div className="total-order-price">
                  <h4>TOTAL DUE: </h4>
                  <h2>{totalPrice}$</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-order">
            <h1>Checkout</h1>
            <form action="quickOrder" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="errorText">{errors.name.message}</p>
              )}
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
                      // onlyCountries={["ua"]}
                      countryCodeEditable={false}
                    />
                  )}
                />
              </div>
              <div className="form-group">
                <h2>Delivery Type</h2>
                <div className="deliveryButtons">
                  <div className="deliveryType">
                    <button
                      type="button"
                      onClick={() => {
                        handleTypeDeliveryChange("delivery");
                        setValue("deliveryType", "delivery");
                      }}
                      className={
                        selectedTypeDelivery === "delivery" ? " active" : ""
                      }
                    >
                      <b>🚚 Delivery</b>
                    </button>
                  </div>
                  <div className="deliveryType">
                    <button
                      type="button"
                      onClick={() => {
                        handleTypeDeliveryChange("pickup");
                        setValue("deliveryType", "pickup");
                      }}
                      className={
                        selectedTypeDelivery === "pickup" ? " active" : ""
                      }
                    >
                      <b>🏠 Self-Pickup</b>
                    </button>
                  </div>
                </div>

                {selectedTypeDelivery === "delivery" ? (
                  <div className="delivery-info">
                    <label htmlFor="region">Region</label>
                    <input
                      type="text"
                      id="region"
                      placeholder="Region"
                      {...register("region")}
                    />

                    <div className="delivery-adress">
                      <div className="street">
                        <label htmlFor="streer">Street</label>
                        <input
                          type="text"
                          id="street"
                          placeholder="Street"
                          {...register("street")}
                        />
                      </div>
                      <div className="house">
                        <label htmlFor="apartment ">Apartment </label>
                        <input
                          type="text"
                          id="apartment "
                          placeholder="74 "
                          {...register("apartment ")}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pickup-info">
                    <h3>Pickup details</h3>
                    <p>Pickup address :</p>
                    <div className="pickup-address">
                      <input type="radio" defaultChecked />
                      <label>Zaporizhzhia city, St. Govorukh 73</label>
                    </div>
                  </div>
                )}
              </div>
              <label>Comment to the order</label>
              <div className="pickup-comment">
                <textarea type="text" {...register("comment")} />
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
        </>
      )}
    </div>
  );
};

export default CartOrder;
