const express = require('express');
const router = express.Router();

const home = require('../controllers/home.controller');
const product = require('../controllers/product.controller');
const grouping = require('../controllers/grouping.controller');
const factor = require('../controllers/factor.controller');
const template = require('../controllers/template.controller');
const payment = require('../controllers/payment.controller');
// const routineorder = require('../controllers/routine-order.controller');

router.get('/', home.landing)
router.get('/register', home.register)
router.get('/login', home.login)
router.get('/admin', (req, res) => res.redirect("/admin/home"))
router.get('/admin/home', home.index)
router.get('/admin/product', product.index)
router.get('/admin/grouping', grouping.index)
router.get('/admin/factor', factor.index)
router.get('/admin/payment', payment.index)
router.get('/factor/:code', template.factor1)
router.get('/admin/factor/:code', template.admin)
router.get('/*', (req, res)=>{
    return res.render('404')
})
// router.get('/routine', routineorder.index)

// USER routes
// router.use('/showman', userRoutes)

module.exports = router;