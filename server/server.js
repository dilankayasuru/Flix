const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Database/Connect');

const registerRoute = require('./Routes/register.route');
const loginRoute = require('./Routes/login.route');
const updateUserRoute = require('./Routes/upadateProfile.route');
const changePasswordRoute = require('./Routes/passwordChange.route');
const getUserRoute = require('./Routes/getUser.route');

const postProductRoute = require('./Routes/postProduct.route');
const getProductsRoute = require('./Routes/getAllProducts.route');
const getProductsCategoryRoute = require('./Routes/getProductByCategory.route');
const getProductById = require('./Routes/getProductById.route');
const updateProduct = require('./Routes/updateProduct.route');
const getFeaturedRoute = require('./Routes/getFeaturedProducts.route');
const getVariant = require('./Routes/getVariant.route');
const singleProductRoute = require('./Routes/getProductSingle.route');
const getEditProduct = require('./Routes/getProductEdit');

const postOrderRoute = require('./Routes/postOrder.route');
const getOrder = require('./Routes/getOrderById.route');
const getOrdersUser = require('./Routes/getOrdersByUser.route');
const getOrdersAdmin = require('./Routes/getOrdersAdmin.route');
const updateOrderRoute = require('./Routes/updateOrder.route');

const postReviewRoute = require('./Routes/postReview.route');
const getReviewsRoute = require('./Routes/getReviews.route');

const getCartRoute = require('./Routes/getCart.route');
const addToCartRoute = require('./Routes/addToCart.route');
const deleteCartItemRoute = require('./Routes/deleteCartItem.route');

const checkoutRoute = require('./Routes/checkout.route');


const cancelOrder = require('./Routes/changeOrder.user.route');

require('dotenv').config();
connectDB(process.env.MONGODB_URL);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/update-user', updateUserRoute);
app.use('/get-user', getUserRoute);
app.use('/password', changePasswordRoute);

app.use('/post-product', postProductRoute);
app.use('/get-products', getProductsRoute);
app.use('/get-product-category', getProductsCategoryRoute);
app.use('/get-product-by-id', getProductById);
app.use('/update-product', updateProduct);
app.use('/featured', getFeaturedRoute);
app.use('/get-variant', getVariant);
app.use('/product', singleProductRoute);

app.use('/post-order', postOrderRoute);
app.use('/get-order', getOrder);
app.use('/get-orders-user', getOrdersUser);
app.use('/get-orders-admin', getOrdersAdmin);
app.use('/update-order', updateOrderRoute);

app.use('/post-review', postReviewRoute);
app.use('/get-reviews', getReviewsRoute);

app.use('/get-cart', getCartRoute);
app.use('/add-to-cart', addToCartRoute);
app.use('/delete-cart-item', deleteCartItemRoute)

app.use('/checkout', checkoutRoute);

app.use('/get-edit', getEditProduct);

app.use('/cancel-order', cancelOrder);

