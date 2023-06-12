/**
 * 
 * @param currentGUIDs currently stored GUIDs to check (use to avoid collisions)
 * @returns a unique GUID;
 */

export const generateGUID = (currentGUIDs?: Array<string>): string => {
    const newGUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    if (!currentGUIDs?.length) return newGUID;

    return currentGUIDs.includes(newGUID) ? generateGUID() : newGUID;
}

