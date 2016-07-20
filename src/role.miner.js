let util = require('helpers');

var roleMiner = {
    run: function(creep) {
        util.mineShit(creep);
        // refactor later to fall back to upgrading from storage if no energy available
    }
};

module.exports = roleMiner;