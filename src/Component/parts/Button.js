import Button from 'react-bootstrap/Button';
import { getDiscordBotOAuthURL } from '../../Function/LocalRemoteSwitcher';
import { useTranslation } from "react-i18next";

export function ServerPanelButtons(props) {
    const { t } = useTranslation();
    return (
        <>
            {
                props.addedServer ?
                    <div className="d-flex">
                        <div className="pe-2 w-50">
                            <Button
                                className="server-panel-button-view-tour py-2 w-100"
                                style={{ borderRadius: "10px" }}
                                href={`/server/${props.server_id}`}
                            >
                                {t('button.serverPanelButtons.view')}
                            </Button>
                        </div>
                        <div className="ps-2 w-50">
                            <Button
                                className="server-panel-button-edit-tour py-2 w-100"
                                style={{ borderRadius: "10px" }}
                                href={`/server/edit/${props.server_id}`}
                            >
                                {t('button.serverPanelButtons.edit')}
                            </Button>
                        </div>
                    </div >
                    :
                    <Button
                        className="py-2 w-100"
                        style={{ borderRadius: "10px" }}
                        href={getDiscordBotOAuthURL(props.server_id)}
                    >
                        {t('button.serverPanelButtons.addToDiscord')}
                    </Button>

            }
        </>
    );
}


export function SimpleButton(props) {
    return (
        <button className="simple-bt" onClick={props.onClick}>
            {props.icon}
            <p>{props.title}</p>
        </button>
    );
}