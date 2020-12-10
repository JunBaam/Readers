import React, { useState, useEffect } from "react";
import ProfileEdit from "./ProfileEdit";
import { useAppContext } from "../../store";
import Axios from "axios";

function Profile() {
  // 수정
  const [editMode, setEditMode] = useState(false);
  const changeToFalse = () => {
    setEditMode(false);
  };
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };
  const user_pk = localStorage.getItem("pk");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const apiUrl = `http://15.165.223.171:8080/api/user/${user_pk}`;
    Axios.get(apiUrl, { headers })
      .then(response => {
        const data = response.data;
        setProfile(data);
        console.log("유저정보", data);
      })

      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {editMode ? (
        <ProfileEdit changeToFalse={changeToFalse} profile={profile} />
      ) : (
        <div className="profile_card">
          <img className="user_img" src={profile.avatar} alt={profile.id} />
          <div className="user_info">
            <span className="user_email">{profile.email}</span>
            <br />
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="profile_edit_btn"
          >
            프로필 수정
          </button>
        </div>
      )}
    </>
  );
}

export default Profile;
