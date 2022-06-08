const {request, response} = require('express');
/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {*} next 
 */


const authVerification = (req, res, next) => {
    if (req.header("X-Auth-Token")) {
        next();
    } else {
        res.send({
            error: -1,
            descripcion: `${req.originalUrl}: No estás autorizado"`
        });
    }
}