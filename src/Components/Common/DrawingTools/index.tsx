import IconButton from "@mui/material/IconButton/IconButton"
import { useDispatch } from "react-redux";
import { Tools } from "../../../enums/tools";
import { resolveByType } from "../../../helpers/traits";
import { useCurrentTool } from "../../../hooks/tools";
import { setCurrentTool } from "../../../Redux/toolsSlice";
import { ColorPickerIcon } from "../../Icons/ColorPickerIcon";
import CreateIcon from "../../Icons/CreateIcon"
import { EraseIcon } from "../../Icons/EraseIcon"
import { PaintIcon } from "../../Icons/PaintIcon";

import RedoIcon from "../../Icons/RedoIcon";
import UndoIcon from "../../Icons/UndoIcon";
import { StyledToolTip } from "../StyledToolTip";
import { StyledBox, StyledSpacer } from "./styledComponents";
import ZoomOutMapIcon from "../../Icons/ZoomOutMapIcon";
import { ModalType } from "../../Resolvers/ModalResolver";
import RestorePageIcon from "../../Icons/RestorePageIcon";
import { setModalType } from "../../../Redux/uiSlice";
import { clearBaseStacks, redoBase, undoBase } from "../../../Redux/baseSlice";
import LineIcon from "../../Icons/LineIcon";
import { clearOneOfOneStacks, clearVariantStacks, redoOneOfOne, redoTrait, undoOneOfOne, undoTrait } from "../../../Redux/traitsSlice";
import { useCurrentTraitType } from "../../../hooks/traits";

export const DrawingTools = () => {
    const dispatch = useDispatch();
    const currentTool = useCurrentTool();
    const currentTraitType = useCurrentTraitType();

    const handleUndo = () => resolveByType(currentTraitType, () => dispatch(undoBase()), () => dispatch(undoTrait()), () => dispatch(undoOneOfOne()));
    const handleRedo = () => resolveByType(currentTraitType, () => dispatch(redoBase()), () => dispatch(redoTrait()), () => dispatch(redoOneOfOne()));

    const handleTool = (tool: Tools) => () => dispatch(setCurrentTool(tool));

    const activeStyling = (activeTool: Tools) => {
        return activeTool === currentTool
            ? {
                backgroundColor: 'rgba(255, 255, 255, .4)',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, .4)',

                }
            }
            : {}
    };

    const handleRescale = () => dispatch(setModalType(ModalType.RescaleCanvas));

    const handleCanvasRefresh = () => {
        resolveByType(
            currentTraitType,
            () => dispatch(clearBaseStacks()),
            () => dispatch(clearVariantStacks()),
            () => dispatch(clearOneOfOneStacks())
        )
    }

    return (
        <>
            <StyledBox>
                <StyledToolTip title={'Draw'} arrow placement={"top"}>
                    <IconButton
                        onClick={handleTool(Tools.Draw)}
                        sx={activeStyling(Tools.Draw)}
                    >
                        <CreateIcon />
                    </IconButton>
                </StyledToolTip>
                <StyledToolTip title={'Erase'} arrow placement={"top"}>
                    <IconButton
                        onClick={handleTool(Tools.Erase)}
                        sx={activeStyling(Tools.Erase)}
                    >
                        <EraseIcon />
                    </IconButton>
                </StyledToolTip>
                <StyledToolTip title={'Fill'} arrow placement={"top"}>
                    <IconButton
                        onClick={handleTool(Tools.Fill)}
                        sx={activeStyling(Tools.Fill)}
                    >
                        <PaintIcon />
                    </IconButton>
                </StyledToolTip>
                {/* <IconButton
                    onClick={handleTool(Tools.Line)}
                    sx={activeStyling(Tools.Line)}
                >
                    <PencilRulerIcon />
                </IconButton>
                </StyledToolTip> */}
                <StyledToolTip title={"Refresh Canvas"}>
                    <IconButton onClick={handleCanvasRefresh} >
                        <RestorePageIcon />
                    </IconButton>
                </StyledToolTip>
                <StyledToolTip title={'Color Picker'} arrow placement={"top"}>
                    <IconButton
                        onClick={handleTool(Tools.ColorPicker)}
                        sx={activeStyling(Tools.ColorPicker)}
                    >
                        <ColorPickerIcon />
                    </IconButton>
                </StyledToolTip>
            </StyledBox>
            <StyledBox>
                <StyledToolTip title={"Line"}>
                    <IconButton
                        onClick={handleTool(Tools.Line)}
                        sx={activeStyling(Tools.Line)}
                    >
                        <LineIcon />
                    </IconButton>
                </StyledToolTip>
                <StyledToolTip title={'Undo'} arrow placement={"top"}>
                    <IconButton onClick={handleUndo}>
                        <UndoIcon />
                    </IconButton>
                </StyledToolTip>
                <StyledToolTip title={'Redo'} arrow placement={"top"}>
                    <IconButton onClick={handleRedo}>
                        <RedoIcon />
                    </IconButton>
                </StyledToolTip>
                <StyledToolTip title={'Rescale Canvas'} arrow placement={"top"}>
                    <IconButton onClick={handleRescale}>
                        <ZoomOutMapIcon />
                    </IconButton>
                </StyledToolTip>
            </StyledBox>
            <StyledSpacer />
        </>
    )
};