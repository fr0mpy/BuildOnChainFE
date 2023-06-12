import { BaseLayerPosition } from "../enums/base";
import { IDrawingPoints } from "../enums/canvas";
import { TraitTypes } from "../enums/traits";

export interface ITraitVariants {
    name: string;
    renderStack: Array<Array<IDrawingPoints>>;
    undoStack: Array<Array<IDrawingPoints>>;
    rarity: number;
}

export interface ITraitTab extends ITrait {
    value: string;
}

export interface IOneOfOneTab extends IUniqueTrait {
    value: string;
}

export interface IRenderedTraitVariant {
    value: string;
    name: string;
    flattenedRenderStack: Array<IDrawingPoints>;
}

export interface ITrait {
    _id: string;
    name: string;
    type: TraitTypes;
    rarity: number;
    variants?: Record<string, ITraitVariants>;
}

export interface IUniqueTrait {
    _id: string;
    name: string;
    renderStack: Array<Array<IDrawingPoints>>;
    undoStack: Array<Array<IDrawingPoints>>;
    type: TraitTypes;
}

export interface IBaseLayer extends Omit<IUniqueTrait, '_id'> {
    position: BaseLayerPosition;
}

export interface IBase {
    coordinates: Array<IDrawingPoints>;
}

export interface IUniqueTrait {
    name: string,
    type: TraitTypes,
    renderStack: Array<Array<IDrawingPoints>>;
    undoStack: Array<Array<IDrawingPoints>>;
}

