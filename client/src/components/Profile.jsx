import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {

  const { user } = useAuth0();

  return (
    <div>
      <div className="card-profile">
        <img className="img-profile" src={user.picture} alt={user.name}/>
        <h1 className="card-name">{user.name}</h1>
        <p className="card-email">{user.email}</p>
      </div>
      </div>
  );
};

export default Profile;