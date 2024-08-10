import Button from 'react-bootstrap/Button';
import { getDiscordBotOAuthURL } from '../../Function/LocalRemoteSwitcher';

export function ServerPanelButtons(props) {
    return (
        <>
            {
                props.addedServer ?
                    <div className="d-flex">
                        <div className="pe-2 w-50">
                            <Button
                                className="py-2 w-100"
                                style={{ borderRadius: "10px" }}
                                href={`/server/${props.server_id}`}
                            >
                                表示
                            </Button>
                        </div>
                        <div className="ps-2 w-50">
                            <Button
                                className="py-2 w-100"
                                style={{ borderRadius: "10px" }}
                                href={`/server/edit/${props.server_id}`}
                            >
                                編集
                            </Button>
                        </div>
                    </div >
                    :
                    <Button
                        className="py-2 w-100"
                        style={{ borderRadius: "10px" }}
                        href={getDiscordBotOAuthURL(props.server_id)}
                    >
                        ディスコードに追加
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