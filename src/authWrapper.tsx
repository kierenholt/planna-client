import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import { JWT } from './accessToken';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { LoggedInUser } from "./loggedInUser";
import { APIService } from './APIService/APIService';

interface AuthWrapperProps {
    children: React.ReactNode;
}

export const LogoutContext = createContext<() => void>(() => {});
export const UserContext = createContext<LoggedInUser | null>(null);

export function AuthWrapper(props: AuthWrapperProps) {
    const KEY_FOR_GOOGLE_ACCESS_TOKEN = "googleAccessToken";

    let [accessToken, setAccessToken] = useState<JWT | null>(null);
    let [user, setUser] = useState<LoggedInUser | null>(null);

    useEffect(() => {
        let token = getAccessTokenFromStorage();
        if (token) {
            setUser(new LoggedInUser(token));
        }
    }, []) //first time only

    async function loginSuccessHandler(credentialResponse: CredentialResponse) {
        let decoded: JWT | null = credentialResponse.credential ? jwt_decode(credentialResponse.credential) as JWT : null;
        if (decoded) {
            console.log(decoded);
            await APIService.User.getOrCreateUser(decoded);
            setAccessToken(decoded);
            localStorage.setItem(KEY_FOR_GOOGLE_ACCESS_TOKEN, JSON.stringify(decoded));
            setUser(new LoggedInUser(decoded));
        }
        else {
            throw new Error("invalid jwt");
        }
    }

    function loginErrorHandler(): void {
        throw new Error('Function not implemented.');
    }

    function logout(): void {
        setAccessToken(null);
        localStorage.removeItem(KEY_FOR_GOOGLE_ACCESS_TOKEN);
    }

    function getAccessTokenFromStorage() {
        let json = localStorage.getItem(KEY_FOR_GOOGLE_ACCESS_TOKEN);
        let token: JWT | null = json ? JSON.parse(json) : null;
        if (token) {
            return token;
        }
        return null;
    }

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
            <LogoutContext.Provider value={logout}>
            {accessToken ?
                <UserContext.Provider value={user}>
                {props.children} 
                </UserContext.Provider>
                :
                <GoogleLogin onSuccess={loginSuccessHandler} onError={loginErrorHandler} />}
            </LogoutContext.Provider>
        </GoogleOAuthProvider>
    )
}