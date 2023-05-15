import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {db, analytics, provider} from '../Firebase-config'
import { useState, useEffect } from "react";

const sign_in = () => {
    const auth = getAuth();
    let user = [];

    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

    return (
        <div>
            <h1>{user.displayName}</h1>
        </div>
    )
}
export default sign_in;