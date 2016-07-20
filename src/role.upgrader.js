let util = require('helpers');

var roleUpgrader = {
    run: function(creep) {
        // Check for work state
        util.isWorking(creep);

		if(creep.memory.working == true) {
			util.upgradeController(creep);
		}
		else {
			util.gatherEnergy(creep);
		}
    }
};

module.exports = roleUpgrader;