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
                console.log(err);
                roleBuilder.run(creep);
            }
		}
		else {
			util.gatherEnergy(creep, "577b92ce0f9d51615fa472a9");
		}
    }
};

module.exports = roleHandyman;