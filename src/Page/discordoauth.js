import { getDiscordOAuthTokenViaSearch } from "../Function/LocalRemoteSwitcher";
import { setDiscordAccessTokenCookie, setDiscordOAuthTokenCookie, setDiscordRefreshTokenCookie } from "../Function/OAuthController";
import { postDiscordAuthentication } from "../Function/APIController";
import { setCurrentDiscordUserDataLocalStorage } from "../Function/LocalStorageController";
import { useNavigate } from "react-router-dom";
import { OverlayLoading } from "react-loading-randomizable";
import { useEffect, useState } from "react";

export function DiscordAuth() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const token = getDiscordOAuthTokenViaSearch();
    useEffect(() => {
        setDiscordOAuthTokenCookie(token);
        postDiscordAuthentication(token)
            .then((response) => {
                setDiscordAccessTokenCookie(response.data.access_token);
                setDiscordRefreshTokenCookie(response.data.refresh_token);
                setCurrentDiscordUserDataLocalStorage()
                    .then(() => {
                        setLoading(false);
                        navigate("/dashboard");
                    }).catch((response) => {
                        navigate("/");
                    });
            }).catch((response) => {
                navigate("/");
            });
    });
    return (
        <>
            <OverlayLoading active={loading} />
        </>
    );
}