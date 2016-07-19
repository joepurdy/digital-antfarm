let util = require('helpers');

var roleUpgrader = {
    run: function(creep) {
        // Check for work state
        util.isWorking(creep);

		if(creep.memory.working == true) {
			util.upgradeController(creep);
		}
		else {
			util.gatherEnergy(creep, "577b92ce0f9d51615fa472a9");
		}
    }
};

module.exports = roleUpgrader;