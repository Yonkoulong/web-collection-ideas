const adminRoutes = require("./admin.route");
const staffRoutes = require("./staff.route");
const coordinatorRoutes = require("./coordinator.route");
const managerRoutes = require("./manager.route");
const authenticate = require("./auth.route");
module.exports = [  adminRoutes,staffRoutes, coordinatorRoutes,managerRoutes, authenticate ];