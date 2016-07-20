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
                creep.say(err);
                try {
                    util.transferToStorage(creep);
                }
                catch(err) {
                    creep.say(err);
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
                    creep.say(err);
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
                            util.harvestEnergy(creep);
                        }
                    }
                }
                else if(err == "SPAWNERS_FULL") {
                    creep.say(err);
                    util.gatherEnergy(creep);
                }
            }
		}
    }
};

module.exports = roleHarvester;