let util         = require('helpers'),
    roleUpgrader = require('role.upgrader');

var roleHarvester = {
    run: function(creep) {
        // Check for work state
        util.isWorking(creep);

		if(creep.memory.working == true) {
            try {
                util.transferToStorage(creep);
            }
            catch(err) {
                try {
                    util.transferToSpawner(creep);
                }
                catch(err) {
                    roleUpgrader.run(creep);
                }
            }
		}
		else {
            util.gatherEnergy(creep, "577b92ce0f9d51615fa472ab");
		}
    }
};

module.exports = roleHarvester;