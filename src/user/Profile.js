import React, { useState } from "react";
import { updateUser } from "./helper/userapicalls";
import UserDashboard from "./UserDashboard";

const Profile = (props) => {
  const { user, token } = props.location.state;

  const [profile, setProfile] = useState({
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
    // Object.entries(profile.formData).forEach(([key, value]) => {
    //   tempFormData.append(key, value); // Copy existing fields to tempFormData
    // });
    tempFormData.set(name, value);
    setProfile({ ...profile, [name]: value, formData: tempFormData });
  };

  const updateUserInfo = () => {
    updateUser(user._id, token, profile.formData)
      .then((res) => {
        if (res?.error) console.log(res.error);
        else console.log(res);
      })
      .catch((err) => console.log(err));
    resetFormButton();
  };

  return (
    <UserDashboard>
      <div className="container-fluid user-profile form-group my-5 me-5">
        <h2 className="user-profile-heading fw-bold text-center">
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
                value={profile.firstname}
                onChange={setFields}
              />
              <input
                type="text"
                name="lastname"
                className="form-control"
                value={profile.lastname}
                onChange={setFields}
              />
              <button
                className="edit-profile btn btn-primary ms-4"
                onClick={updateUserInfo}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <div className="user-name">
                {profile.firstname} {profile.lastname}
              </div>
              <button
                className="edit-profile btn btn-primary ms-4"
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
                value={profile.email}
                onChange={setFields}
              />
              <button
                className="edit-profile btn btn-primary ms-4"
                onClick={updateUserInfo}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <div className="user-name">{profile.email}</div>
              <button
                className="edit-profile btn btn-primary ms-4"
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
