import Button from 'react-bootstrap/Button';
export function ViewServerHeader(props) {
    return (
        <div className="view-server-header-tour d-flex flex-row mb-1">
            <div className="me-4">
                {props.serverIcon}
            </div>
            <div>
                <p className="fs-3 mb-0">{props.currentServerName}</p>
                <p className="fs-6">@{props.serverID}</p>
                <Button onClick={() => window.open(props.serverInviteURL)} className="py-2 px-3">サーバーに参加</Button>
            </div>
        </div>
    );
}