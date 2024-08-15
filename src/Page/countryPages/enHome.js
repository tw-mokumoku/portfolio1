import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export function ENHome() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    }, []);
    return (
        <>
            <Helmet
                title={'【Discord List】Discord Server Bulletin Board｜You can find out right away if the call is active!'}
                meta={[
                    { name: 'description', content: "Discord List solves the server search problems of all discord users. It is a bulletin board site where you can find out right away the number of people currently on the call even before you enter the server. You don't have to worry about finding an active servers anymore! DiscordList is a service that supports you to enjoy discord as much as possible." },
                    { name: 'keywords', content: 'Discord List, discord, Disocrd, discord list, bulletin board' },
                    { property: 'og:title', content: 'Discord List' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:description', content: "You can find out right away if the call is active! The number of voice chat connection will be listed after you search. Let's quickly find a server on the Discord List♪" },
                    { property: 'og:url', content: 'https://discordlist.kolysis.com/en' },
                ]}
            />
            <div></div>
        </>
    );
}
