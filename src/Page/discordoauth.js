import { getDiscordOAuthTokenViaSearch } from "../Function/LocalRemoteSwitcher";
import { setDiscordAccessTokenCookie, setDiscordOAuthTokenCookie, setDiscordRefreshTokenCookie } from "../Function/OAuthController";
import { postDiscordAuthentication } from "../Function/APIController";
import { setCurrentDiscordUserDataLocalStorage, setCurrentDiscordUserGuildsLocalStorage, setCurrentDislistUserOwningServers } from "../Function/LocalStorageController";
import { useNavigate } from "react-router-dom";
import { OverlayLoading } from "react-loading-randomizable";
import { useState } from "react";

export function DiscordAuth() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const token = getDiscordOAuthTokenViaSearch();
    setDiscordOAuthTokenCookie(token);
    postDiscordAuthentication(token)
        .then((response) => {
            setDiscordAccessTokenCookie(response.data.access_token);
            setDiscordRefreshTokenCookie(response.data.refresh_token);
            setCurrentDiscordUserDataLocalStorage()
                .then(() => {
                    setCurrentDiscordUserGuildsLocalStorage()
                        .then(() => {
                            setCurrentDislistUserOwningServers()
                                .then(() => {
                                    setLoading(false);
                                    navigate("/dashboard");
                                }).catch((response) => {
                                    console.log("error", response);
                                })
                        });
                });
        })
        .catch((response) => {
            console.log("Err_postDiscordAuthentication: ", response);
            navigate("/");
        });
    return (
        <>
            <OverlayLoading active={loading} />
        </>
    );
}