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
				console.log(err);
				roleUpgrader.run(creep);
			}
		}
		else {
			util.gatherEnergy(creep, "577b92ce0f9d51615fa472a9");
		}
    }
};

module.exports = roleBuilder;