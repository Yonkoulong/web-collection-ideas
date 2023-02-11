const AppRoutes = require("./routes");

const setupRoutes = (app) => {
    if(AppRoutes.length > 0) {
        AppRoutes.forEach((route) => {
            app.use(route);
        })
    }
};

module.exports = setupRoutes;   