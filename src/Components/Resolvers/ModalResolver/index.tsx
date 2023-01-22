import Backdrop from "@mui/material/Backdrop/Backdrop";
import { TraitOptions } from "../../../enums/traits";
import { useAppSelector } from "../../../Redux/store";
import { AddTraitModal } from "./AddTraitModal";
import { ClearAllModal } from "./ClearAllModal";
import { EditTraitModal } from "./EditTraitModal";
import { MenuModal } from "./MenuModal";
import { MintModal } from "./MintModal";
import { RescaleCanvasModal } from "./RescaleCanvasModal";
import { WelcomeModal } from "./WelcomeModal";

export enum ModalType {
    Mint = 0,
    Menu = 1,
    Welcome = 2,
    ClearAll = 3,
    AddTrait = 4,
    AddVariant = 5,
    EditTrait = 6,
    AddOneOfOne = 7,
    RescaleCanvas = 8
}

export const ModalResolver: React.FC = () => {

    const modal = useAppSelector(state => state.uiReducer.modal);

    const renderModal = () => {
        switch (modal) {
            case ModalType.Mint:
                return <MintModal />
            case ModalType.Menu:
                return <MenuModal />
            case ModalType.Welcome:
                return <WelcomeModal />
            case ModalType.ClearAll:
                return <ClearAllModal />
            case ModalType.AddTrait:
                return <AddTraitModal traitType={TraitOptions.Trait} />;
            case ModalType.AddVariant:
                return <AddTraitModal traitType={TraitOptions.TraitVariant} />;
            case ModalType.AddOneOfOne:
                return <AddTraitModal traitType={TraitOptions.OneOfOne} />;
            case ModalType.EditTrait:
                return <EditTraitModal />;
            case ModalType.RescaleCanvas:
                return <RescaleCanvasModal />
            default:
                return null;
        }
    }


    return (
        <>
            {modal && <Backdrop open transitionDuration={400} />}
            {renderModal()}
        </>
    )
}