export const StringRequired = (v, fieldName) => {
    if (v == null) {
        console.log(v);
        return `${fieldName} is required.`;
    }
    console.log(v);
    return !!String(v).trim() || `${fieldName} is required.`;
};
