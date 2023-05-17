import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ListFavorites from "./ListFavorites";

const Profile = () => {

  const { user } = useAuth0();

  return (
    <div>
      <ListFavorites user={user} />
      </div>
  );
};

export default Profile;