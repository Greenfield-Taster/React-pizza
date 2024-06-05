import React, { useState } from "react";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import googleIcon from "../assets/img/googleIcon.png";

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, onRequestClose }) => {
  const { handleSubmit, control, formState, register } = useForm();
  const { errors } = formState;
  let [isOpenModal, setIsOpenModal] = useState(false);

  const moveToRegisterPage = () => {
    setIsOpenModal(false);
    onRequestClose();
  };

  const onSubmit = (data) => {
    console.log("Form submitted", data);

    axios
      .post("https://pizzas-identity.azurewebsites.net/api/users/login", data)
      .then((response) => {
        console.log("submit login", response.data);
        onRequestClose();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <Modal
      id={"modalId"}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      preventScroll={false}
      parentSelector={() => document.querySelector("#root")}
      closeTimeoutMs={300}
      className="register-modal"
      overlayClassName="register-modal-overlay"
    >
      <h2>Login</h2>
      <form
        className="registerModalForm"
        action="registerUser"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="block">
          <label htmlFor="phoneNumber">Phone</label>
          <div className="phoneForm">
            <Controller
              control={control}
              name="phoneNumber"
              placeholder="1 (702) 123-4567"
              rules={{
                required: "Phone number is required",
                minLength: "12",
              }}
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
          {errors.phoneNumber && (
            <p className="errorText">{errors.phoneNumbers.message}</p>
          )}
        </div>
        <div className="block">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="errorText">{errors.password.message}</p>
          )}
        </div>

        <div className="submitButton">
          <button className="button button__login" type="submit">
            Login
          </button>
        </div>
      </form>
      <div className="signInVia">
        <h3>Sign in via</h3>
        <div className="logos">
          <img src={googleIcon} />
        </div>
        <p>- or -</p>
        <Link to="/register">
          <button
            className="button button--delivery "
            onClick={moveToRegisterPage}
          >
            Register now
          </button>
        </Link>
      </div>
    </Modal>
  );
};

export default LoginModal;
