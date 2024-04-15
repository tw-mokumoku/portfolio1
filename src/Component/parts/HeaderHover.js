/* Component */
import { ButtonWrapper, RoundButtonWrapper } from "../Section/Main";
import { useEffect } from "react";
/* react */
import { useState } from "react";
/* etc */
import OutsideClickHandler from 'react-outside-click-handler';

export function HoverWrapper(props) {
    const [hoverToggle, setHoverToggle] = useState(false);
    return (
        <div>
            <OutsideClickHandler onOutsideClick={(event) => {
                const container = document.getElementsByClassName(props.hoverElementClassName)[0];
                if (container !== undefined && container !== event.target && !container.contains(event.target)) setHoverToggle((value) => !value);
            }}
            >
                <ButtonWrapper
                    onClick={() => {
                        setHoverToggle((value) => !value);
                        props.onClick();
                    }}
                    styleButtonWrapper={{ height: "100%" }}
                >
                    {props.children}
                </ButtonWrapper>
            </OutsideClickHandler>
            {(hoverToggle && props.hoverElement) || (props.visible && props.hoverElement)}
        </div>
    );
}
export function RoundHoverWrapper(props) {
    const [hoverToggle, setHoverToggle] = useState(false);
    return (
        <div>
            <OutsideClickHandler onOutsideClick={(event) => {
                const container = document.getElementsByClassName(props.hoverElementClassName)[0];
                if (container !== undefined && container !== event.target && !container.contains(event.target)) setHoverToggle((value) => !value);
            }}>
                <RoundButtonWrapper onClick={() => {
                    setHoverToggle((value) => !value)
                }}>
                    {props.children}
                </RoundButtonWrapper>
            </OutsideClickHandler>
            {(hoverToggle && props.hoverElement) || (props.visible && props.hoverElement) }
        </div>
    );
}