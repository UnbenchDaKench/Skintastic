import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import "./Account.scss"

function Account() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    
    Auth.currentAuthenticatedUser()
      .then((userData) => setUser(userData))
      .catch(() => {
        Auth.federatedSignIn();
      });
  }, []);
  //   console.log(user)
  return <div className="Account">testing authentication</div>;
}

export default Account;
