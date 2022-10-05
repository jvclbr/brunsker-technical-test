const dbConstants = require('../../db.constants');

class IndicatorTypeSeed {

    _connectionRef;

    constructor(connection){
        this._connectionRef = connection;
    }

    execIndicatorTypeSeeds = async () => {
        await this._createRoleType();
        await this._createUfType();
        await this._createLocalityType();
        await this._createRealEstateType();
    }
    
    _createRoleType = async () => {
        await this._connectionRef.query(`
            INSERT OR IGNORE INTO indicator_type_entity (id, type, description, active)
            VALUES (${dbConstants.indicatorsTypes.ROLE}, 'Role', 'Defines a Role', 1)
        `)
    }

    _createUfType = async () => {
        await this._connectionRef.query(`
            INSERT OR IGNORE INTO indicator_type_entity (id, type, description, active)
            VALUES (${dbConstants.indicatorsTypes.UF}, 'Uf', 'Defines a Uf', 1)
        `)
    }

    _createLocalityType = async () => {
        await this._connectionRef.query(`
            INSERT OR IGNORE INTO indicator_type_entity (id, type, description, active)
            VALUES (${dbConstants.indicatorsTypes.LOCALITY}, 'Locality', 'Defines a Locality', 1)
        `)
    }

    _createRealEstateType = async () => {
        await this._connectionRef.query(`
            INSERT OR IGNORE INTO indicator_type_entity (id, type, description, active)
            VALUES (${dbConstants.indicatorsTypes.REAL_ESTATE_TYPE}, 'Real Estate Type', 'Defines a Real Estate Type', 1)
        `)
    }
}

module.exports = { IndicatorTypeSeed }