const express = require('express');
const housesRouter = require('./housesRouter');
const landRouter = require('./landRouter');

const apiRouter = express.Router();

apiRouter.use('/houses', housesRouter);
apiRouter.use('/land', landRouter);

module.exports = apiRouter;
