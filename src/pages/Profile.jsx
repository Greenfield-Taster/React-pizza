import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import AvatarEditor from "react-avatar-editor";
import profileIcon from "../assets/img/profile.png";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { register, handleSubmit, formState, control, setValue } = useForm();
  const { errors } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user) || {};

  const logOut = () => {
    dispatch(clearUser(user.userId));
    navigate("/React-pizza");
  };

  return (
    <div className="container">
      <div className="profile">
        <div className="profileNavigationSideBar">
          <h2>Personal account </h2>
          <nav>
            <ul>
              <li>Profile</li>
              <li>Followed pizzas</li>
              <li>Orders history</li>
              <li>Download personal data</li>
              <li onClick={logOut}>Logout</li>
              <li>Delete account</li>
            </ul>
          </nav>
        </div>
        <div className="profileUserInfo">
          <div>
            <div className="profileHeader">
              <div className="profileChangeAvatar">
                <AvatarEditor
                  image={profileIcon}
                  width={100}
                  height={100}
                  border={10}
                  scale={1.2}
                  grid={true}
                  backgroundColor="#d89f9f;"
                  borderRadius={50}
                />
              </div>
              <div className="profileHeaderInfo">
                <h3>{user.username}</h3>
                <p>+{user.phoneNumber}</p>
              </div>
            </div>
            <form className="profileForm" action="editProfile">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                defaultValue={user.username || ""}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="errorText">{errors.name.message}</p>
              )}
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                defaultValue={user.email || ""}
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
                  defaultValue={user.phoneNumber || ""}
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
              <button className="button button-delimiter">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
