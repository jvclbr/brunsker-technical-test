const dbConstants = require('../../db.constants');

class RealEstateSeed {

    _connectionRef;

    constructor(connection){
        this._connectionRef = connection;
    }

    execRealEstateSeeds = async () => {
        await this._createHouseRealEstateType();
        await this._createApartmentRealEstateType();
        await this._createSampleRealEstates();
    }
    
    _createHouseRealEstateType = async () => {

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO indicator_entity (id, value, description, active, indicatorTypeId)
            VALUES (${dbConstants.indicators.realEstate.HOUSE_REAL_ESTATE_TYPE}, 'Casa', 'House Real Estate type', 1, ${dbConstants.indicatorsTypes.REAL_ESTATE_TYPE})
        `);

    }

    _createApartmentRealEstateType = async () => {

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO indicator_entity (id, value, description, active, indicatorTypeId)
            VALUES (${dbConstants.indicators.realEstate.APARTMENT_REAL_ESTATE_TYPE}, 'Apartamento', 'Apartment Real Estate type', 1, ${dbConstants.indicatorsTypes.REAL_ESTATE_TYPE})
        `);

    }

    _createSampleRealEstates = async () => {

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO real_estate_entity (nome, valor, condominio, quartos, banheiros, mobiliado, area, venda, aluguel, active, typeId, addressId, userId)
            VALUES ('Casa teste', 160000, 800, 3, 2, 1, 120, 1, 0, 1, 55, 1, 1)
        `);

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO real_estate_entity (nome, valor, condominio, quartos, banheiros, mobiliado, area, venda, aluguel, active, typeId, addressId, userId)
            VALUES ('Apartamento teste', 320000, 1200, 3, 2, 1, 160, 0, 1, 1, 56, 1, 1)
        `);

    }

}

module.exports = { RealEstateSeed }