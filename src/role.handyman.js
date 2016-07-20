let util         = require('helpers'),
    roleBuilder  = require('role.builder');

var roleHandyman = {
    run: function(creep) {
        // Check for work state
        util.isWorking(creep);

		if(creep.memory.working == true) {
			try {
                util.repairShit(creep);
            }
            catch(err) {
                creep.say(err);
                roleBuilder.run(creep);
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

module.exports = roleHandyman;