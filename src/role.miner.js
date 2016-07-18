var roleHarvester = {
    run: function(creep) {
        if(creep.memory.working && creep.carry.energy == 0) {
			creep.memory.working = false;
		}
		else if(!creep.memory.working && (creep.carry.energy == creep.carryCapacity || creep.memory.burndown)) {
			creep.memory.working = true;
		}

		if(creep.memory.working == true) {
            var fillableContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER ||
                                s.structureType == STRUCTURE_STORAGE) && 
                                _.sum(s.store) < s.storeCapacity
            });
            if(fillableContainer != undefined) {
                if(creep.transfer(fillableContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(fillableContainer);
                }
            }
            else {
                var energyBank = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
                                s.structureType == STRUCTURE_EXTENSION) && 
                                s.energy < s.energyCapacity
                });
                if(energyBank != undefined) {
                    if(creep.transfer(energyBank, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(energyBank);
                    }
                }
            }
		}
		else {
            var source = Game.getObjectById("577b92ce0f9d51615fa472ab");
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.memory.burndown = false;
                creep.moveTo(source);
            }
            else if(creep.harvest(source) == ERR_NOT_ENOUGH_RESOURCES) {
				if(creep.carry.energy > 0) {
					creep.memory.burndown = true;
				}
			}
		}
    }
};

module.exports = roleHarvester;