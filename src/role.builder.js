let util 		 = require('helpers'),
	roleUpgrader = require('role.upgrader');

let roleBuilder = {
    run: function(creep) {
        // Check for work state
        util.isWorking(creep);

		if(creep.memory.working == true) {
			try {
				util.buildShit(creep);
			}
			catch(err) {
				creep.say(err);
				roleUpgrader.run(creep);
			}
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

module.exports = roleBuilder;