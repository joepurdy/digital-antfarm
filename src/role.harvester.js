var roleHarvester = {
    run: function(creep) {
        if(creep.memory.working && creep.carry.energy == 0) {
			creep.memory.working = false;
		}
		else if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;
		}

		if(creep.memory.working == true) {
            var energyBank = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
                                s.structureType == STRUCTURE_EXTENSTION ||
                                s.structureType == STRUCTURE_CONTAINER ||
                                s.structureType == STRUCTURE_STORAGE) && 
                                s.energy < s.energyCapacity
            });
            if(energyBank != undefined) {
                if(creep.transfer(energyBank, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyBank);
                }
            }
		}
		else {
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
		}
    }
};

module.exports = roleHarvester;