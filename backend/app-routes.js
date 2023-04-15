const AppRoutes = require("./routes");

const setupRoutes = (app) => {
    AppRoutes.forEach((route) => {
        app.use(route);
    })
};

module.exports = setupRoutes;   