const isAdmin = function(req, res, next) {
    if (!req.role) return res.sendStatus(401);
    if(req.role == 'admin')
      next();
};
const isStaff = function(req, res, next) {
    if (!req.role) return res.sendStatus(401);
    if(req.role == 'staff')
    next();
};
const isQAM = function(req, res, next) {
  if (!req.role) return res.sendStatus(401);
  if(req.role == 'qam')
    next();
};
const isQAC = function(req, res, next) {
  if (!req.role) return res.sendStatus(401);
   if(req.role == 'qan')
    next();
};
module.exports = {isAdmin,isStaff,isQAM,isQAC};