import { useEffect } from "react";
import { getDiscordOAuthTokenViaSearch } from "../Function/LocalRemoteSwitcher";
import { setDiscordAccessTokenCookie, setDiscordOAuthTokenCookie, setDiscordRefreshTokenCookie } from "../Function/OAuthController";
import { postDiscordAuthentication } from "../Function/APIController";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { setCurrentDiscordUserDataLocalStorage, setCurrentDiscordUserGuildsLocalStorage } from "../Function/LocalStorageController";

export function DiscordAuth() {
    const [navigateTo, setNavigateTo] = useState(<></>);
    useEffect(() => {
        const token = getDiscordOAuthTokenViaSearch();
        setDiscordOAuthTokenCookie(token);
        postDiscordAuthentication(token)
            .then((response) => {
                setDiscordAccessTokenCookie(response.data.access_token);
                setDiscordRefreshTokenCookie(response.data.refresh_token);
                setCurrentDiscordUserDataLocalStorage();
                setCurrentDiscordUserGuildsLocalStorage();
                setNavigateTo(<Navigate to="/dashboard" />);
            })
            .catch((response) => {
                console.log("Err_postDiscordAuthentication: ", response);
                setNavigateTo(<Navigate to="/" />);
            });
    }, []);
    return navigateTo;
}