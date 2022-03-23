const BLUE_BIN_RECYCLABLE = 0;
const NON_BLUE_BIN_RECYCLABLE = 1;
const GENERAL_WASTE = 2;

const VALID_NON_BLUE_BIN_RECYCLABLE_CONDITIONS = ["In good condition", "In need of repair", "Spoilt beyond repair"];

const getGeneralWasteItems = (items) => {
    return items ? items.filter(item => item.bluebinrecyclable === GENERAL_WASTE) : [];
};

const getBlueBinRecyclableItems = (items) => {
    return items ? items.filter(item => item.bluebinrecyclable === BLUE_BIN_RECYCLABLE) : [];
};

const getNonBlueBinRecyclableItems = (items) => {
    return items ? items.filter(item => item.bluebinrecyclable === NON_BLUE_BIN_RECYCLABLE) : [];
};

const hasCleanedBlueBinRecyclableItems = (items) => {
    return items && items.filter(item => item.bluebinrecyclable === BLUE_BIN_RECYCLABLE && item.isCleaned).length > 0;
};

const hasCheckedNonBlueBinRecyclableItems = (items) => {
    return items && items.filter(item => item.bluebinrecyclable === NON_BLUE_BIN_RECYCLABLE
        && VALID_NON_BLUE_BIN_RECYCLABLE_CONDITIONS.includes(item.condition)).length > 0;
};

export {
    getGeneralWasteItems, getBlueBinRecyclableItems, getNonBlueBinRecyclableItems,
    hasCleanedBlueBinRecyclableItems, hasCheckedNonBlueBinRecyclableItems
};
