const dbConstants = require('../../db.constants');

class RoleSeed {

    _connectionRef;

    constructor(connection){
        this._connectionRef = connection;
    }

    execRoleSeeds = async () => {
        await this._createAdminRole();
        await this._createClientRole();
    }
    
    _createAdminRole = async () => {

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO indicator_entity (id, value, description, active, indicatorTypeId)
            VALUES (${dbConstants.indicators.role.ADMIN_ROLE}, 'Admin role', 'Role with admin privileges', 1, ${dbConstants.indicatorsTypes.ROLE})
        `);

    }

    _createClientRole = async () => {

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO indicator_entity (id, value, description, active, indicatorTypeId)
            VALUES (${dbConstants.indicators.role.CLIENT_ROLE}, 'Client role', 'Role with client privileges', 1, ${dbConstants.indicatorsTypes.ROLE})
        `);

    }

}

module.exports = { RoleSeed }