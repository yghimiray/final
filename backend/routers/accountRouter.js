const express = require('express');
const accountRouter = express.Router();
const accountController = require('../controllers/accountController');

accountRouter.post('/',accountController.addAccount);
accountRouter.get('/:account_id',accountController.searchAccountById);
accountRouter.get('/name/:name',accountController.searchAccountByName);
accountRouter.get('/',accountController.searchAllAccounts);
accountRouter.put('/:account_id', accountController.updateAccount)
accountRouter.put('/transactions/:name', accountController.addTransactions)
accountRouter.delete('/:account_id', accountController.deleteAccount)



module.exports = accountRouter;