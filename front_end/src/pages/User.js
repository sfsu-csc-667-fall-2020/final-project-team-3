import React from "react";
import ViewListings from "../components/ViewListings";

const User = () => {
  return (
    <div>
      <h1>User</h1>
      <ViewListings userMode={true} />
    </div>
  );
};

export default User;
