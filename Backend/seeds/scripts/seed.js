const createConnection = require('typeorm').createConnection;
const dotenv = require('dotenv');
const UserSeed = require('./user.seed').UserSeed;

dotenv.config();

createConnection({
    type: 'sqlite',
    database: `${process.env.DB_NAME}.sqlite`,
    synchronize: JSON.parse(process.env.DB_SYNC),
    logging: JSON.parse(process.env.DB_LOG)
}).then(async connection => {
    await new UserSeed(connection).execUserSeeds();
    process.exit(0);
}).catch(err => {
    console.log(err)
    process.exit(1);
})