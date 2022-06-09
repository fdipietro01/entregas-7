const { request, response } = require("express");
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */

const authVerification = (req, res, next) => {
  if (req.headers.admin !== undefined && req.headers.admin === "true") {
    next();
  } else {
    res.send({
      error: -1,
      method: req.method,
      descripcion: `${req.originalUrl}: No estás autorizado`,
    });
  }
};

module.exports = authVerification;