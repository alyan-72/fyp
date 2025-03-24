require('dotenv').config();
const express = require('express');
const responseHandler = require('./src/middlewares/responseHandler.js');
const cors = require('./src/middlewares/cors.js');
const logger = require('./src/middlewares/logger.js');
const authenticateToken = require('./src/middlewares/authToken.js');
const dbConnect = require('./src/utils/dbConnect.js');

const app = express();

app.use(express.json());
app.use(cors);
app.use(logger);
app.use(responseHandler);

const authRoutes = require('./src/routes/authRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');

app.use('/protected', authenticateToken);

app.use('/auth', authRoutes);
app.use('/protected/users', userRoutes);

const port = process.env.PORT || 3000;

// Server startup
app.listen(port, () => {
    dbConnect();
    console.log(`Server Running at Port ${port}`);
});
