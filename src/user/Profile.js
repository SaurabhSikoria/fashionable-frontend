import React, { useEffect, useState } from "react";
import { updateUser } from "./helper/userapicalls";
import UserDashboard from "./UserDashboard";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../features/submenuSlice";
const Profile = (props) => {
  const { user, token } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfile());
  }, [dispatch]);

  const [userProfile, setUserProfile] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    formData: new FormData(),
  });

  const [editmode, setEditmode] = useState({
    name: false,
    email: false,
    password: false,
  });

  const resetFormButton = () => {
    const updatedEditmode = {};
    for (const key in editmode) {
      updatedEditmode[key] = false;
    }
    setEditmode(updatedEditmode);
  };

  const toggleEditMode = (field) => {
    setEditmode({ ...editmode, [field]: !editmode[field] });
  };

  const setFields = (e) => {
    const { name, value } = e.target;
    const tempFormData = new FormData();
    // Object.entries(userProfile.formData).forEach(([key, value]) => {
    //   tempFormData.append(key, value); // Copy existing fields to tempFormData
    // });
    tempFormData.set(name, value);
    setUserProfile({ ...userProfile, [name]: value, formData: tempFormData });
  };

  const updateUserInfo = () => {
    updateUser(user._id, token, userProfile.formData)
      .then((res) => {
        if (res?.error) console.log(res.error);
        else console.log(res);
      })
      .catch((err) => console.log(err));
    resetFormButton();
  };

  return (
    <UserDashboard>
      <div className="container-fluid user-userProfile form-group my-5 me-5">
        <h2 className="user-userProfile-heading fw-bold text-center">
          Personal Info.
        </h2>
        <div className="user-name my-3 px-4">
          <h6>User's Name</h6>
          {editmode.name ? (
            <div className="d-flex">
              <input
                type="text"
                name="firstname"
                className="form-control"
                value={userProfile.firstname}
                onChange={setFields}
              />
              <input
                type="text"
                name="lastname"
                className="form-control"
                value={userProfile.lastname}
                onChange={setFields}
              />
              <button
                className="edit-userProfile btn btn-primary ms-4"
                onClick={updateUserInfo}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <div className="user-name">
                {userProfile.firstname} {userProfile.lastname}
              </div>
              <button
                className="edit-userProfile btn btn-primary ms-4"
                onClick={() => toggleEditMode("name")}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="user-email my-3 px-4">
          <h6>Email</h6>
          {editmode.email ? (
            <div className="d-flex">
              <input
                type="text"
                name="email"
                className="form-control"
                value={userProfile.email}
                onChange={setFields}
              />
              <button
                className="edit-userProfile btn btn-primary ms-4"
                onClick={updateUserInfo}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <div className="user-name">{userProfile.email}</div>
              <button
                className="edit-userProfile btn btn-primary ms-4"
                onClick={() => toggleEditMode("email")}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="user-password">
          {editmode.password ? (
            <>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="New Password"
              />
              <button className="btn btn-primary ms-4" onClick={updateUser}>
                Save Password
              </button>
            </>
          ) : (
            <button
              className="btn btn-warning ms-4 my-2"
              onClick={() => toggleEditMode("password")}
            >
              Change Password
            </button>
          )}
        </div>
      </div>
    </UserDashboard>
  );
};

export default Profile;
