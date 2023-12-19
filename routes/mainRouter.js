const router = require('express').Router();
const userController = require('../controllers/userController');
const paymentController = require('../controllers/paymentController');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/userDetails', userController.addUserData);
router.post('/payment', paymentController.completePayment);

module.exports = router;