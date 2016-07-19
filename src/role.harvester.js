let util = require('helpers');

var roleHarvester = {
    run: function(creep) {
        // Check for work state
        util.isWorking(creep);

		if(creep.memory.working == true) {
            try {
                util.transferToSpawner(creep);
            }
            catch(err) {
                console.log(err);
                util.transferToStorage(creep);
            }
		}
		else {
            try {
                util.canFillSpawners(creep);
            }
            catch(err) {
                if(err === "SPAWNERS_CAN_FILL") {
                    try {
                        util.gatherStoredEnergy(creep);
                    }
                    catch(err) {
                        util.gatherEnergy(creep, "577b92ce0f9d51615fa472a9");
                    }
                }
                else if(err === "SPAWNERS_FULL") {
                    util.gatherEnergy(creep, "577b92ce0f9d51615fa472a9");
                }
            }
		}
    }
};

module.exports = roleHarvester;