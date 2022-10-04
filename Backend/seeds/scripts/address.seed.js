const dbConstants = require('../../db.constants');
const Ufs = require('../files/ufs');
const Localities = require('../files/locality');

class AddressSeed {

    _connectionRef;

    constructor(connection){
        this._connectionRef = connection;
    }

    execAddressSeeds = async () => {
        await this._createUfs();
        await this._createLocalidades();
        await this._createSampleAddress();
    }

    _createUfs = async () => {
        const UfInsertQueries = []; 

        for(const Uf of Ufs.ufs){

            for(const Key of Object.keys(Uf)){

                UfInsertQueries.push(`
                    (${Key}, '${Uf[Key]}', 'Uf of ${Uf[Key]}', 1, ${dbConstants.indicatorsTypes.UF})
                `);
            }
        }

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO
                indicator_entity (id, value, description, active, indicatorTypeId)
            VALUES
                ${UfInsertQueries.join(',')}
        `);
    }

    _createLocalidades = async () => {

        const LocalityInsertQueries = [];
        const UfLocalityInsertQueries = []; 

        for(const Locality of Localities.localities){

            for(const Key of Object.keys(Locality)){
                const Uf = Key.toString().substring(0,2);

                LocalityInsertQueries.push(`
                    (${Key}, "${Locality[Key]}", "Locality of ${Locality[Key]}", 1, ${dbConstants.indicatorsTypes.LOCALITY})
                `);

                UfLocalityInsertQueries.push(`
                    (${Uf}, ${Key})
                `);
            }
        }

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO 
                indicator_entity (id, value, description, active, indicatorTypeId)
            VALUES 
                ${LocalityInsertQueries.join(',')}
        `);

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO 
                ufs_localities_entity (ufId, localityId)
            VALUES 
                ${UfLocalityInsertQueries.join(',')}
        `);
    }

    _createSampleAddress = async () => {

        await this._connectionRef.query(`
            INSERT OR IGNORE INTO address_entity (pais, ufId, localidadeId, logradouro, bairro, numero, complemento, cep, active)
            VALUES ('BR', 31, 3106200, 'Rua Campos Elíseos', 'Nova Suíssa', '456', 'N/A', '30421214', 1)
        `)
    }
}

module.exports = { AddressSeed }