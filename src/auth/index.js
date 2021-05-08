import React from 'react';

import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'


var uiConfig = {
    // ログイン完了時のリダイレクト先
    signInSuccessUrl: '/',

    // 利用する認証機能
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID  //メール認証
    ],

    // 利用規約のURL(任意で設定)
    // tosUrl: 'http://example.com/kiyaku/',
    // プライバシーポリシーのURL(任意で設定)
    // privacyPolicyUrl: 'http://example.com/privacy'
  };

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

export default () => {
  let innerText = ""
  let innerHTML = ""
  firebase.auth().onAuthStateChanged( (user) => {

    if(user) {
      innerText   = 'Login Complete!';
      innerHTML = `${user.displayName}さんがログインしました`;
      console.log(user);
    }
    else {
      innerText = 'Not Login';
    }
  });

  return (
    <div>
      <h1>{innerText}</h1>
      <div>{innerHTML}</div>
    </div>
  )
}
