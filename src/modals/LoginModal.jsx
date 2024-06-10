import React, { useState } from "react";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import googleIcon from "../assets/img/googleIcon.png";
import { setUser } from "../redux/slices/userSlice";

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, onRequestClose }) => {
  const { handleSubmit, control, formState, register } = useForm();
  const { errors } = formState;
  let [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const moveToRegisterPage = () => {
    setIsOpenModal(false);
    onRequestClose();
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://pizzas-identity.azurewebsites.net/api/users/login",
        data
      );
      const token = response.data.token;
      const decodedToken = jwtDecode(token);

      console.log(decodedToken);

      const userData = {
        email:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ],
        username:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
        role: decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
        userId:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ],
        phoneNumber: response.data.phoneNumber,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(setUser(userData));
      onRequestClose();
    } catch (error) {
      console.log("login error", error);
    }
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
