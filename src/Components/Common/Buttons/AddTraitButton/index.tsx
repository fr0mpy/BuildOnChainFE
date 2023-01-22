import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { TraitTypes } from "../../../../enums/traits";
import { setModalType } from "../../../../Redux/uiSlice";
import AddIcon from "../../../Icons/AddIcon";
import { ModalType } from "../../../Resolvers/ModalResolver";
import { StyledButton } from "./styledComponents";

interface IProps {
    text?: string;
    traitOption: TraitTypes.Variant | TraitTypes.OneOfOne;
}

export const AddTraitOptionButton: React.FC<IProps> = memo(({ text, traitOption }) => {
    // console.log('rendering add trait variant button')
    const [size, setSize] = useState<number>(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (size === 0 && buttonRef.current) {
            setSize(buttonRef.current.clientHeight)
        }
    })

    const onClick = () => {
        traitOption === TraitTypes.Variant
            ? dispatch(setModalType(ModalType.AddVariant))
            : dispatch(setModalType(ModalType.AddOneOfOne))
    };

    return (
        <StyledButton ref={buttonRef} onClick={onClick}>
            {text}
            <AddIcon />
        </StyledButton>
    )
});