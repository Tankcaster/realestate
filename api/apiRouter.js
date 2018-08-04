const express = require('express');
const housesRouter = require('./housesRouter');

const apiRouter = express.Router();

apiRouter.use('/houses', housesRouter);

module.exports = apiRouter;
