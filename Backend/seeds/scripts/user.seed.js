const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const dbConstants = require('../../db.constants');

dotenv.config();

class UserSeed {

    _connectionRef;

    constructor(connection){
        this._connectionRef = connection;
    }

    execUserSeeds = async () => {
        await this._createAdminUser();
    }
    
    _createAdminUser = async () => {

        const AdminUserPassword = await this._hashUserPassword(process.env.ADMIN_PASSWORD);

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO user_entity (name, email, password, active)
            VALUES ('${process.env.ADMIN_NAME}', '${process.env.ADMIN_EMAIL}', '${AdminUserPassword}', 1)
        `)

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO users_roles_entity (userEntityId, roleEntityId)
            VALUES (1, ${dbConstants.indicators.role.ADMIN_ROLE})
        `)
    }

    _hashUserPassword = async(password) => {
        const Salt = await bcrypt.genSalt();
        const Hash = await bcrypt.hash(password, Salt);
        return Hash;
    }
}

module.exports = { UserSeed }