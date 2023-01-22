import React from "react"

type Elements = HTMLDivElement;

interface IDimensions {
    height: number;
    width: number;
}

export const useElementDimensions = (element: Elements | null): IDimensions => {
    const [{ height, width }, setDimensions] = React.useState<IDimensions>({ height: 0, width: 0 });

    React.useEffect(() => {
        if (!element) return;

        setDimensions({
            height: element.clientHeight,
            width: element.clientWidth
        });

    },);

    return {
        height,
        width
    }
}