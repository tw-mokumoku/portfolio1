import Button from 'react-bootstrap/Button';

export function ServerPanelButtons(props) {
    return (
        <>
            {
                props.addedServer ?
                    <div className="d-flex">
                        <div className="pe-2 w-50">
                            <Button className="py-2 w-100" style={{ borderRadius: "10px" }}>View</Button>
                        </div>
                        <div className="ps-2 w-50">
                            <Button className="py-2 w-100" style={{ borderRadius: "10px" }}>Edit</Button>
                        </div>
                    </div >
                    :
                    <Button className="py-2 w-100" style={{ borderRadius: "10px" }}>Add to Discord list</Button>

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