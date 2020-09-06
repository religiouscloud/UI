import React from "react";
import './styles.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function Header() {
  return (
    <header>
      <div className="signout">
      <AmplifySignOut />
      </div>
      <h1>
        PoojaPath
      </h1>
    </header>
  );
}

export default withAuthenticator(Header);
