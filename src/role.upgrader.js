let util = require('helpers');

var roleUpgrader = {
    run: function(creep) {
        // Check for work state
        util.isWorking(creep);

		if(creep.memory.working == true) {
			util.upgradeController(creep);
		}
		else {
			try {
				util.withdrawStoredEnergy(creep);
			}
			catch(err) {
				creep.say(err);
				try {
					util.gatherEnergy(creep);
				}
				catch(err) {
					creep.say(err);
				}
			}			
		}
    }
};

module.exports = roleUpgrader;