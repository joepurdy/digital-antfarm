let util 		 = require('helpers'),
	roleUpgrader = require('role.upgrader');

var roleBuilder = {
    run: function(creep) {
        // Check for work state
        util.isWorking(creep);

		if(creep.memory.working == true) {
			try {
				util.buildShit(creep);
			}
			catch(err) {
				// console.log(err);
				roleUpgrader.run(creep);
			}
		}
		else {
			util.gatherEnergy(creep);
		}
    }
};

module.exports = roleBuilder;