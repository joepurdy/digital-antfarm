let util         = require('helpers'),
    roleUpgrader = require('role.upgrader');

var roleHarvester = {
    run: function(creep) {
        // Check for work state
        util.isWorking(creep);

		if(creep.memory.working == true) {
            try {
                util.transferToSpawner(creep);
            }
            catch(err) {
                try {
                    util.transferToStorage(creep);
                }
                catch(err) {
                    roleUpgrader.run(creep);
                }
            }
		}
		else {
            try {
                util.canFillSpawners(creep);
            }
            catch(err) {
                if(err == "SPAWNERS_CAN_FILL") {
                    console.log('Harvester: ' + err);
                    try {
                        util.gatherStoredEnergy(creep);
                    }
                    catch(err) {
                        console.log('Harvester: ' + err);
                        util.gatherEnergy(creep, "577b92ce0f9d51615fa472a9");
                    }
                }
                else if(err == "SPAWNERS_FULL") {
                    console.log('Harvester: ' + err);
                    util.gatherEnergy(creep, "577b92ce0f9d51615fa472a9");
                }
            }
		}
    }
};

module.exports = roleHarvester;