import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { IDrawingPoints } from '../enums/canvas';
import { TraitTypes } from '../enums/traits';
import { generateGUID } from '../helpers/strings';
import { ITrait, IUniqueTrait } from '../types/traits';

export enum ContractAddress {
	Goerli = '0xA179e8a35d0d9f8431e14599502bB9B8f2415b72',
	Ethereum = '',
	Arbitrum = '0x81a0480CF348865F85e2c0D92f63510b27a30190'
}

export interface IAppState {
	walletAddress: string;
	contractAddress: ContractAddress;
	newTraitName: string;
	currentTrait: string;
	currentTraitVariant: string;
	traits: Record<string, ITrait>;
	oneOfOnes: Record<string, IUniqueTrait>;
}

export const defaultColorPalette = ['#000000', ...Array(15).fill('white')];

export const initialState: IAppState = {
	walletAddress: '',
	contractAddress: ContractAddress.Goerli,
	newTraitName: '',
	currentTrait: '',
	currentTraitVariant: '',
	traits: {
		// 888: {
		// 	name: 'Hat',
		// 	type: TraitTypes.Variant,
		// 	rarity: 100,
		// 	variants: {
		// 		111: {
		// 			name: 'Cap',
		// 			renderStack: [],
		// 			undoStack: [],
		// 			imgData: '',
		// 			rarity: 100
		// 		},
		// 		222: {
		// 			name: 'Trilby',
		// 			renderStack: [],
		// 			undoStack: [],
		// 			imgData: '',
		// 			rarity: 100
		// 		}
		// 	}
		// },
		// 999: {
		// 	name: 'Shoes',
		// 	type: TraitTypes.Variant,
		// 	rarity: 100,
		// 	variants: {
		// 		555: {
		// 			name: 'Trainers',
		// 			renderStack: [],
		// 			undoStack: [],
		// 			imgData: '',
		// 			rarity: 100
		// 		},
		// 		666: {
		// 			name: 'Flip Flops',
		// 			renderStack: [],
		// 			undoStack: [],
		// 			imgData: '',
		// 			rarity: 100
		// 		}
		// 	}
		// }
	},
	oneOfOnes: {
		// 333: {
		// 	name: 'Haku',
		// 	type: TraitTypes.OneOfOne,
		// 	imgData: '',
		// 	renderStack: [],
		// 	undoStack: []
		// },
		// 444: {
		// 	name: 'Gaiku',
		// 	type: TraitTypes.OneOfOne,
		// 	imgData: '',
		// 	renderStack: [],
		// 	undoStack: []
		// }
	},
}

export const traitSlice = createSlice({
	name: 'traitSlice',
	initialState,
	reducers: {
		setTraitVariant: (state, { payload: { coordinates, imgData } }: PayloadAction<{ imgData: string, coordinates: Array<Array<IDrawingPoints>> }>) => {
			const currentState = current(state);
			const { traits, currentTrait, currentTraitVariant } = currentState;

			state.traits = {
				...currentState.traits,
				[currentState.currentTrait]: {
					name: traits[currentTrait].name,
					type: traits[currentTrait].type,
					rarity: traits[currentTrait].rarity,
					variants: {
						...currentState.traits[currentTrait].variants,
						[currentTraitVariant]: {
							name: currentState.traits?.[currentTrait].variants?.[currentTraitVariant]?.name ?? '',
							renderStack: coordinates,
							undoStack: currentState.traits[currentTrait].variants?.[currentTraitVariant]?.undoStack ?? [],
							imgData,
							rarity: currentState.traits[currentTrait].variants?.[currentTraitVariant]?.rarity ?? 0
						}
					}

				}
			}
		},
		setDefaultTrait: (state) => {
			const { traits } = current(state);
			state.currentTrait = Object.keys(traits)[0];
		},
		setNewTrait: (state, { payload: { name, id } }: PayloadAction<{ name: string, id?: string }>) => {
			const { traits } = current(state);
			const traitKey = id ? id : generateGUID();

			state.traits = {
				...traits,
				[traitKey]: {
					name,
					type: TraitTypes.Variant,
					variants: {},
					rarity: 100
				}
			}
		},
		updateTraitName: (state, { payload: name }: PayloadAction<string>) => {
			const { currentTrait } = current(state);

			state.traits = {
				...state.traits,
				[currentTrait]: {
					...state.traits[currentTrait],
					name
				}
			};
		},
		updateTraitVariantName: (state, { payload: name }: PayloadAction<string>) => {
			const { currentTrait, currentTraitVariant } = current(state);

			state.traits = {
				...state.traits,
				[currentTrait]: {
					...state.traits[currentTrait],
					variants: {
						...state.traits[currentTrait].variants,
						[currentTraitVariant]: {
							...state.traits[currentTrait].variants?.[currentTraitVariant] ?? { imgData: '', renderStack: [], undoStack: [], name: '', rarity: 0 },
							name
						}
					}
				}
			};
		},
		updateOneOfOneName: (state, { payload: name }: PayloadAction<string>) => {
			const { currentTraitVariant } = current(state);

			state.oneOfOnes = {
				...state.oneOfOnes,
				[currentTraitVariant]: {
					...state.oneOfOnes[currentTraitVariant],
					name
				}
			};
		},
		deleteTrait: (state, { payload: traitToRemove }: PayloadAction<string>) => {
			const { [traitToRemove]: _, ...traits } = current(state).traits
			state.traits = Object.keys(traits).length > 0 ? traits : {};
		},
		deleteTraitVariant: (state, { payload: traitToRemove }: PayloadAction<string>) => {
			const { traits, currentTrait } = current(state);
			const { [traitToRemove]: _, ...variants } = traits[currentTrait].variants ?? {};

			state.traits = {
				...state.traits,
				[currentTrait]: {
					...state.traits[currentTrait],
					variants: Object.keys(variants).length > 0 ? variants : {}
				}
			};
		},
		deleteOneOfOne: (state, { payload: oneOfOneToRemove }: PayloadAction<string>) => {
			const { [oneOfOneToRemove]: _, ...oneOfOnes } = current(state).oneOfOnes
			state.oneOfOnes = oneOfOnes;
		},
		setNewTraitVariant: (state, { payload: { name, id } }: PayloadAction<{ name: string, id?: string }>) => {
			const { traits, currentTrait, } = current(state);
			const traitKey = id ? id : generateGUID();

			state.traits = {
				...traits,
				[currentTrait]: {
					...traits[currentTrait],
					variants: {
						...traits[currentTrait].variants,
						[traitKey]: {
							name,
							renderStack: [],
							undoStack: [],
							imgData: '',
							rarity: 100
						}
					}
				}
			}
		},
		setNewOneOfOne: (state, { payload: { name, id } }: PayloadAction<{ name: string, id?: string }>) => {
			const { oneOfOnes } = current(state);
			const traitKey = id ? id : generateGUID();

			state.oneOfOnes = {
				...oneOfOnes,
				[traitKey]: {
					name,
					type: TraitTypes.OneOfOne,
					renderStack: [],
					undoStack: [],
					imgData: ''
				}
			}
		},
		setCurrentTrait: (state, { payload }: PayloadAction<string>) => {
			state.currentTrait = payload
		},
		setCurrentTraitVariant: (state, { payload }: PayloadAction<string>) => {
			if (payload) {
				state.currentTraitVariant = payload
			} else {
				state.currentTraitVariant = ''
			}
		},
		pushToTraitRenderStack: (state, { payload }: PayloadAction<Array<IDrawingPoints>>) => {
			const { traits, currentTrait, currentTraitVariant } = current(state);

			state.traits = {
				...traits,
				[currentTrait]: {
					...traits?.[currentTrait],
					variants: {
						...traits?.[currentTrait]?.variants,
						[currentTraitVariant]: {
							name: traits?.[currentTrait]?.variants?.[currentTraitVariant]?.name ?? '',
							imgData: traits?.[currentTrait]?.variants?.[currentTraitVariant]?.imgData ?? '',
							undoStack: traits?.[currentTrait]?.variants?.[currentTraitVariant]?.undoStack ?? [],
							renderStack: [...traits?.[currentTrait].variants?.[currentTraitVariant]?.renderStack ?? [], payload],
							rarity: traits?.[currentTrait]?.variants?.[currentTraitVariant]?.rarity ?? 0
						}
					}
				}
			}
		},
		pushToOneOfOneRenderStack: (state, { payload }: PayloadAction<Array<IDrawingPoints>>) => {
			const { oneOfOnes, currentTraitVariant } = current(state);

			state.oneOfOnes = {
				...oneOfOnes,
				[currentTraitVariant]: {
					...oneOfOnes?.[currentTraitVariant],
					renderStack: [...oneOfOnes?.[currentTraitVariant]?.renderStack ?? [], payload]
				}
			}
		},
		undoTrait: (state) => {
			const { traits, currentTrait, currentTraitVariant } = current(state);

			const { renderStack = [] } = traits[currentTrait].variants?.[currentTraitVariant] ?? {}

			if (renderStack.length) {
				const renderStackCopy = [...renderStack];
				const undoPoint = renderStackCopy.pop();

				if (undoPoint) {
					state.traits = {
						...traits,
						[currentTrait]: {
							...traits[currentTrait],
							variants: {
								...traits[currentTrait].variants,
								[currentTraitVariant]: {
									name: traits[currentTrait].variants?.[currentTraitVariant].name ?? '',
									imgData: '',
									renderStack: renderStackCopy,
									undoStack: [...traits[currentTrait].variants?.[currentTraitVariant].undoStack ?? [], undoPoint],
									rarity: traits[currentTrait].variants?.[currentTraitVariant].rarity ?? 0
								}
							}

						}
					}
				}
			}
		},
		undoOneOfOne: (state) => {
			const { oneOfOnes, currentTraitVariant } = current(state);

			const { renderStack = [] } = oneOfOnes?.[currentTraitVariant] ?? {}

			if (renderStack.length) {
				const renderStackCopy = [...renderStack];
				const undoPoint = renderStackCopy.pop();

				if (undoPoint) {
					state.oneOfOnes = {
						...oneOfOnes,
						[currentTraitVariant]: {
							...oneOfOnes[currentTraitVariant],
							renderStack: renderStackCopy,
							undoStack: [...oneOfOnes?.[currentTraitVariant]?.undoStack ?? [], undoPoint],
						}
					}
				}
			}
		},
		redoTrait: (state) => {
			const { traits, currentTrait, currentTraitVariant } = current(state);

			const { undoStack = [] } = traits[currentTrait].variants?.[currentTraitVariant] ?? {}

			if (undoStack.length) {

				const undoStackCopy = [...undoStack]
				const redoPoint = undoStackCopy.pop();

				if (redoPoint) {
					state.traits = {
						...traits,
						[currentTrait]: {
							...traits[currentTrait],
							variants: {
								...traits[currentTrait].variants,
								[currentTraitVariant]: {
									name: traits[currentTrait].variants?.[currentTraitVariant].name ?? '',
									imgData: traits[currentTrait].variants?.[currentTraitVariant].imgData ?? '',
									renderStack: [...traits[currentTrait].variants?.[currentTraitVariant].renderStack ?? [], redoPoint],
									undoStack: undoStackCopy,
									rarity: traits[currentTrait].variants?.[currentTraitVariant].rarity ?? 0
								}
							}

						}
					}
				}
			}
		},
		redoOneOfOne: (state) => {
			const { oneOfOnes, currentTraitVariant } = current(state);

			const { undoStack = [] } = oneOfOnes?.[currentTraitVariant] ?? {}

			if (undoStack.length) {

				const undoStackCopy = [...undoStack]
				const redoPoint = undoStackCopy.pop();

				if (redoPoint) {
					state.oneOfOnes = {
						...oneOfOnes,
						[currentTraitVariant]: {
							...oneOfOnes[currentTraitVariant],
							renderStack: [...oneOfOnes[currentTraitVariant].renderStack ?? [], redoPoint],
							undoStack: undoStackCopy,
						}
					}
				}
			}
		},
		updateTraitRarity: (state, { payload }: PayloadAction<number>) => {
			const { currentTrait } = current(state);

			state.traits = {
				...state.traits,
				[currentTrait]: {
					...state.traits[currentTrait],
					rarity: payload
				}
			};
		},
		updateTraitVariantRarity: (state, { payload }: PayloadAction<number>) => {
			const { currentTrait, currentTraitVariant } = current(state);

			state.traits = {
				...state.traits,
				[currentTrait]: {
					...state.traits[currentTrait],
					variants: {
						...state.traits[currentTrait].variants,
						[currentTraitVariant]: {
							...state.traits[currentTrait].variants?.[currentTraitVariant] ?? { imgData: '', renderStack: [], undoStack: [], name: '', rarity: 0 },
							rarity: payload
						}
					}
				}
			};
		},
		clearVariantStacks: (state) => {
			const { traits, currentTrait, currentTraitVariant } = current(state);

			state.traits = {
				...traits,
				[currentTrait]: {
					...traits[currentTrait],
					variants: {
						...traits?.[currentTrait]?.variants,
						[currentTraitVariant]: {
							...traits?.[currentTrait]?.variants?.[currentTraitVariant] ?? { imgData: '', renderStack: [], undoStack: [], name: '', rarity: 0 },
							renderStack: [],
							undoStack: []
						}
					}
				}
			}
		},
		clearOneOfOneStacks: (state) => {
			const { oneOfOnes, currentTraitVariant } = current(state);

			state.oneOfOnes = {
				...oneOfOnes,
				[currentTraitVariant]: {
					...oneOfOnes?.[currentTraitVariant],
					renderStack: [],
					undoStack: []
				}
			}
		},
	},
});


export const {
	setTraitVariant,
	setNewTrait,
	updateTraitName,
	updateTraitVariantName,
	updateOneOfOneName,
	setNewTraitVariant,
	setNewOneOfOne,
	deleteTrait,
	deleteTraitVariant,
	deleteOneOfOne,
	setCurrentTrait,
	setCurrentTraitVariant,
	undoTrait,
	redoTrait,
	pushToTraitRenderStack,
	pushToOneOfOneRenderStack,
	updateTraitRarity,
	updateTraitVariantRarity,
	redoOneOfOne,
	undoOneOfOne,
	clearVariantStacks,
	clearOneOfOneStacks
} = traitSlice.actions;

export default traitSlice.reducer;