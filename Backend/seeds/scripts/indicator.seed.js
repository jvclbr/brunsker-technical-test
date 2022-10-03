const RoleSeed = require('./role.seed').RoleSeed;

class IndicatorSeed {

    _connectionRef;

    constructor(connection){
        this._connectionRef = connection;
    }

    execIndicatorSeeds = async () => {
        await new RoleSeed(this._connectionRef).execRoleSeeds();
    }
}

module.exports = { IndicatorSeed }