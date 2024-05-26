import React from "react";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";

Modal.setAppElement("#root");

const RegisterModal = ({ isOpen, onRequestClose }) => {
  const { handleSubmit, control, formState, register } = useForm();
  const { errors } = formState;

  const onSumbit = (data) => {
    console.log("Form submitted", data);
    onRequestClose();
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
      <h2>Register</h2>
      <form
        className="registerModalForm"
        action="registerUser"
        onSubmit={handleSubmit(onSumbit)}
      >
        <div className="block">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="errorText">{errors.name.message}</p>}
        </div>

        <div className="block">
          <label htmlFor="phone">Phone</label>
          <div className="phoneForm">
            <Controller
              control={control}
              name="phone"
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
          {errors.phone && <p className="errorText">{errors.phone.message}</p>}
        </div>

        <button className="button button-delimiter" type="submit">
          Register
        </button>
      </form>
    </Modal>
  );
};

export default RegisterModal;
