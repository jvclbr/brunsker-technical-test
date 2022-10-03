const dbConstants = require('../../db.constants');

class IndicatorTypeSeed {

    _connectionRef;

    constructor(connection){
        this._connectionRef = connection;
    }

    execIndicatorTypeSeeds = async () => {
        await this._createRoleType();
    }
    
    _createRoleType = async () => {
        await this._connectionRef.query(`
            INSERT OR IGNORE INTO indicator_type_entity (id, type, description, active)
            VALUES (${dbConstants.indicatorsTypes.ROLE}, 'Role', 'Defines a Role', 1)
        `)
    }
}

module.exports = { IndicatorTypeSeed }