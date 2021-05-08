import React from "react";
import { firebaseApp } from "../actions/firebase/index";

export default (props) => {
  return (
    <div>
      <h2>Home Page</h2>
      // ユーザーをログアウトさせる
      <button onClick={() => firebaseApp.auth().signOut()}>Sign out</button>
    </div>
  );
}
