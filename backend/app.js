const express = require('express');
const cors = require('cors');
const mongoConnect = require('./dbConnect').mongoConnect;

const userController = require('./controllers/userController');
const userRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter')
const accountRouter = require('./routers/accountRouter')
const voucherRouter = require('./routers/voucherRouter')


const app = express();

app.use(cors());
app.use(express.json())
app.use('/users',userRouter)
// app.use('/products',userController.authorize, productRouter)
app.use('/products', productRouter)
// app.use('/accounts',userController.authorize,accountRouter)
app.use('/accounts',accountRouter)
// app.use('/vouchers',userController.authorize,voucherRouter)
app.use('/vouchers',voucherRouter)



// app.use((req, res, next) => {
//     res.status(404).json({ error: req.url + ' API not supported!' });
// });

app.use((err, req, res, next) => {
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Something is wrong! Try later' });
    }
});

mongoConnect(() =>{
app.listen(3000, () => {
    console.log({status:'Server side app running'})
})
})

