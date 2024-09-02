import Button from 'react-bootstrap/Button';
import { getDiscordBotOAuthURL } from '../../Function/LocalRemoteSwitcher';
import { useTranslation } from "react-i18next";
import CachedIcon from '@mui/icons-material/Cached';
import Tooltip from '@mui/material/Tooltip';
import { updateServerUpdatedLog } from '../../Function/APIController';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

export function ServerPanelButtons(props) {
    const { t } = useTranslation();
    const [remainSecResult, setRemainSecResult] = useState(0);
    const [remainSecCheckedEpoch, setRemainSecCheckedEpoch] = useState();
    const [isUpdatingServer, setIsUpdatingServer] = useState(false);

    const onUpdateServerUpdatedLogClicked = () => {
        const toastRemaining = (remain_epoch, toastID = null) => {
            const remainSecResult = Math.floor(remain_epoch);
            const remainHour = remainSecResult / 3600;
            var remainSec = remainSecResult % 3600;
            const remainMin = remainSec / 60;
            remainSec = remainSec % 60;
            props.toastError(
                `${t('button.serverPanelButtons.remain')} ${Math.floor(remainHour)}${t('button.serverPanelButtons.hour')}${Math.floor(remainMin)}${t('button.serverPanelButtons.minute')}${Math.floor(remainSec)}${t('button.serverPanelButtons.second')}${t('button.serverPanelButtons.ableToUp')}`,
                toastID
            );
        }
        if (remainSecResult != 0) {
            const timepassed = (Number(Date.now() / 1000) - remainSecCheckedEpoch)
            setRemainSecResult((v) => v - timepassed);
            toastRemaining(remainSecResult - timepassed);
            setRemainSecCheckedEpoch(Number(Date.now() / 1000));
            return;
        }
        if (isUpdatingServer) return;
        setIsUpdatingServer(true);
        const toastID = props.toastLoading("ƒf[ƒ^Žæ“¾’†");
        updateServerUpdatedLog(props.server_id)
            .then((response) => {
                setRemainSecResult(response.data.remain_epoch);
                props.toastSuccess(t('button.serverPanelButtons.serverUpdateSuccess'), toastID);
                setRemainSecCheckedEpoch(Number(Date.now() / 1000));
                setIsUpdatingServer(false);
            })
            .catch((response) => {
                setRemainSecResult(response.response.data.remain_epoch);
                toastRemaining(response.response.data.remain_epoch, toastID);
                setRemainSecCheckedEpoch(Number(Date.now() / 1000));
                setIsUpdatingServer(false);
            })
    }
    return (
        <>
            { props.addedServer ?
                <div className="d-flex">
                    <div className="pe-2 w-50">
                        <Button
                            className="server-panel-button-view-tour py-2 w-100"
                            style={{ borderRadius: "10px" }}
                            href={`/server/stepper/${props.server_id}`}
                        >
                            {t('button.serverPanelButtons.setting')}
                        </Button>
                    </div>
                    <div className="ps-2 w-50">
                        <Tooltip
                            title={
                                <div className="p-1" style={{ fontSize: '14px' }}>
                                    {t('button.serverPanelButtons.update')}
                                </div>
                            }
                            arrow
                        >
                            <Button
                                className="server-panel-button-edit-tour py-2 w-100"
                                style={{ borderRadius: "10px" }}
                                onClick={() => onUpdateServerUpdatedLogClicked()}
                            >
                                <CachedIcon />
                            </Button>
                        </Tooltip>
                    </div>
                </div >
                :
                <Tooltip
                    title={
                        <>
                            <div className="p-1" style={{ fontSize: '14px' }}>
                                {t('button.serverPanelButtons.mightLackOfInfo')}
                            </div>
                            <div className="p-1" style={{ fontSize: '14px' }}>
                                {t('button.serverPanelButtons.notDisplaying')}
                            </div>
                        </>
                    }
                    arrow
                >
                    <Button
                        className="py-2 w-100"
                        style={{ borderRadius: "10px" }}
                        href={`/server/stepper/${props.server_id}`}
                    >
                        {t('button.serverPanelButtons.addToDiscord')}
                    </Button>
                </Tooltip>
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