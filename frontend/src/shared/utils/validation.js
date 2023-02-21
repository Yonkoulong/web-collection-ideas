export const StringRequired = (v, fieldName) => {
    if (v == null) {
        return `${fieldName} is required.`;
    }
    return !!String(v).trim() || `${fieldName} is required.`;
};
