const createConnection = require('typeorm').createConnection;
const dotenv = require('dotenv');
dotenv.config();

createConnection({
    type: 'sqlite',
    database: `${process.env.DB_NAME}.sqlite`,
    synchronize: JSON.parse(process.env.DB_SYNC),
    logging: JSON.parse(process.env.DB_LOG)
}).catch(err => {
    console.log(err)
    process.exit(1);
})
