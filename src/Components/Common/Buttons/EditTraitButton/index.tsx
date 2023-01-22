import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setModalType } from "../../../../Redux/uiSlice";
import SettingsIcon from "../../../Icons/SettingsIcon";
import { ModalType } from "../../../Resolvers/ModalResolver";
import { StyledButton } from "./styledComponents";

export const EditTraitButton = memo(() => {
    // console.log('rendering edit trait button')
    const [size, setSize] = useState<number>(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (size === 0 && buttonRef.current) {
            setSize(buttonRef.current.clientHeight)
        }
    })

    const onClick = () => dispatch(setModalType(ModalType.EditTrait));

    return (
        <StyledButton sx={{ width: size }} ref={buttonRef} onClick={onClick}>
            <SettingsIcon />
        </StyledButton>
    )
});