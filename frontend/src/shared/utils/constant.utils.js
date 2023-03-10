import moment from "moment";

export const formatDate = (date) => {
    if (!date) {
        return "_";
    }

    return moment(date).format("DD-MM-YYYY");
};

export const enumRoles = {
    STAFF: "STAFF",
    QAM: "QAM",
    QAC: "QAM",
    ADMIN: "ADMIN"
}
