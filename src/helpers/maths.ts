export const percentage = (value: number, percentage: number): number => (value / 100) * percentage;

export const roundNearest = (value: number, nearest: number): number => Math.round(value / nearest) * nearest;

export const roundUpToNearest = (value: number, nearest: number): number => Math.ceil(value / nearest) * nearest;

export const roundDownToNearest = (value: number, nearest: number): number => Math.floor(value / nearest) * nearest;
