import { BaseLayerPosition } from "../enums/base";
import { IDrawingPoints } from "../enums/canvas";
import { TraitTypes } from "../enums/traits";

export interface ITraitVariants {
    name: string;
    renderStack: Array<Array<IDrawingPoints>>;
    undoStack: Array<Array<IDrawingPoints>>;
    imgData: string;
    rarity: number;
}

export interface ITraitTab extends ITrait {
    value: string;
}

export interface IOneOfOneTab extends IUniqueTrait {
    value: string;
}

export interface ITraitVariant {
    value: string;
    name: string;
    flattenedRenderStack: Array<IDrawingPoints>;
}

export interface ITrait {
    name: string;
    type: TraitTypes;
    rarity: number;
    variants?: Record<string, ITraitVariants>;
}

export interface IUniqueTrait {
    name: string;
    imgData: string;
    renderStack: Array<Array<IDrawingPoints>>;
    undoStack: Array<Array<IDrawingPoints>>;
    type: TraitTypes;
}

export interface IBaseLayer extends IUniqueTrait {
    position: BaseLayerPosition;
}

export interface IBase {
    imgData: string;
    coordinates: Array<IDrawingPoints>;
}

export interface IUniqueTrait {
    name: string,
    type: TraitTypes,
    renderStack: Array<Array<IDrawingPoints>>;
    undoStack: Array<Array<IDrawingPoints>>;
}

