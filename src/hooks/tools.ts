import shallowEqual from "react-redux/es/utils/shallowEqual";
import { useAppSelector } from "../Redux/store";

export const useCurrentTool = () => {
    const traits = useAppSelector(({ toolsReducer: { currentTool } }) => currentTool, shallowEqual);

    return traits;
};