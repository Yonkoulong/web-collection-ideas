import moment from "moment";

export const formatDate = (date) => {
    if (!date) {
        return "_";
    }

    return moment(date).format("MM-DD-YYYY");
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

export const ideaFilter = {
    ALL: 'all',
    MOST_POPULAR: 'most-popular',
    MOST_VIEWED: 'most-viewed',
    LASTEST_IDEAS: 'lastest-ideas',
    MOST_COMMENTS: 'most-comments'
}


export const reactionType = {
    DISLIKE: 0,
    LIKE: 1
}