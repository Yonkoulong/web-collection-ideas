import moment from "moment";

export const formatDate = (date) => {
    if (!date) {
        return "_";
    }

    return moment(date).format("DD-MM-YYYY");
};

export const enumRoles = {
    STAFF: "staff",
    QAM: "qam",
    QAC: "qac",
    ADMIN: "admin"
}

export function isObjectEmpty(value) {
    return (
      Object.prototype.toString.call(value) === '[object Object]' &&
      JSON.stringify(value) === '{}'
    );
  }