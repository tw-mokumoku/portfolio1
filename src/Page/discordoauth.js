import { getDiscordOAuthPageURL, getDiscordOAuthCodeViaSearch, getRedirectURL } from "../Function/LocalRemoteSwitcher";
import { setDiscordAccessTokenCookie, setDiscordOAuthTokenCookie, setDiscordRefreshTokenCookie, set_SessionManagerDiscordListUID } from "../Function/OAuthController";
import { getLogin, getMemberData, postDiscordAuthentication } from "../Function/APIController";
import { setCurrentDiscordUserDataLocalStorage, setMemberDataLocalStorgae } from "../Function/LocalStorageController";
import { useNavigate } from "react-router-dom";
import { OverlayLoading } from "react-loading-randomizable";
import { useEffect, useState } from "react";
import axios from 'axios';
export function DiscordAuth() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const code = getDiscordOAuthCodeViaSearch();

    useEffect(() => {
        getLogin(getRedirectURL(), code)
            .then((response) => {
                if (response.data == null) navigate("/");
                set_SessionManagerDiscordListUID(response.data._smdluid);
                getMemberData()
                    .then((response) => {
                        setMemberDataLocalStorgae(response.data);
                        setLoading(false);
                        navigate("/dashboard");
                    })
            }).catch(() => {
                navigate("/");
            })
    }, []);

    /*
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
        getLogin(token, getDiscordOAuthPageURL())
        setLoading(false);
    });
    */

    return (
        <>
            <OverlayLoading active={loading} />
        </>
    );
}