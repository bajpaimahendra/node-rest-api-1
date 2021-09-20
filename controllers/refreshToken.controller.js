const Joi = require('joi');
const { REFRESH_SECRET } = require('../config');
const CustomErrorHandler = require('../services/CustomErrorHandler');
const JwtService = require('../services/JwtService');
const UserModel = require('../models/user');
const RefreshToken = require('../models/refreshToken');

const refreshController = {
    async refresh(req, res, next) {
        // validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // database
        let refreshtoken;
        try {
            console.log(req.body.refresh_token);
            refreshtoken = await RefreshToken.findOne({ token: req.body.refresh_token });
            //console.log(refreshtoken);return;
            if (!refreshtoken) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            let userId;
            try {
                const { _id } = await JwtService.verify(refreshtoken.token, REFRESH_SECRET);
                userId = _id;
            } catch (err) {
                console.log(`invalid`);
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token11'));
            }

            const user = await UserModel.findOne({ _id: userId });
            if (!user) {
                return next(CustomErrorHandler.unAuthorized('No user found!'));
            }

            // tokens
            // Toekn
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
            // database whitelist
            //await RefreshToken.create({userId:user._id, token: refresh_token });
            /***Update or Insert upsert: true  */
            RefreshToken.findOneAndUpdate(
                { userId: user._id }, // find a document with that filter
                { userId: user._id, token: refresh_token }, // document to insert when nothing was found
                { upsert: true, new: true, runValidators: true }, // options
                function (err, doc) { // callback
                    if (err) {
                        // handle error
                    } else {
                        // handle document
                    }
                }
            );
            res.json({ access_token, refresh_token });

        } catch (err) {
            return next(new Error('Something went wrong ' + err.message));
        }

    }
};


module.exports = refreshController;