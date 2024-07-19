import { getDiscordOAuthTokenViaSearch } from "../Function/LocalRemoteSwitcher";
import { setDiscordAccessTokenCookie, setDiscordOAuthTokenCookie, setDiscordRefreshTokenCookie } from "../Function/OAuthController";
import { postDiscordAuthentication } from "../Function/APIController";
import { setCurrentDiscordUserDataLocalStorage, setCurrentDiscordUserGuildsLocalStorage } from "../Function/LocalStorageController";
import { useNavigate } from "react-router-dom";
export function DiscordAuth() {
    const navigate = useNavigate();

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
                            navigate("/dashboard");
                        });
                });
        })
        .catch((response) => {
            console.log("Err_postDiscordAuthentication: ", response);
            navigate("/");
        });
}