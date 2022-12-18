const authRouter = require("./auth");
const cusRouter = require("./customer");
const shipperRouter = require("./shipper");
const adminRouter = require("./admin")



const initRouter = (app) => {
    app.use('/api/v1/auth', authRouter);
    // customer
    app.use('/api/v1/customer',cusRouter);
    // shipper 
    app.use('/api/v1/shipper', shipperRouter);
    // admin
    app.use('/api/v1/admin', adminRouter);

    return app.use('/', (req,res) => {
        res.send('server on...')
    })
}

module.exports = initRouter;