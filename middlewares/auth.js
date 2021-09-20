const CustomErrorHandler = require('../services/CustomErrorHandler');
const JwtService = require('../services/JwtService');
//console.log('jmd---------');
const authenticateToken = async (req, res, next) => {
    //console.log(authHeader);
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }

    const token = authHeader.split(' ')[1];

    try {
        const { _id, role } = await JwtService.verify(token);
        const user = {
            _id,
            role
        }
        req.user = user;
        next();

    } catch(err) {
        return next(CustomErrorHandler.unAuthorized());
    }

}

module.exports = authenticateToken;