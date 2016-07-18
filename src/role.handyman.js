var roleBuilder  = require('role.builder');

var roleBuilder = {
    run: function(creep) {
        if(creep.memory.working && creep.carry.energy == 0) {
			creep.memory.working = false;
		}
		else if(!creep.memory.working && (creep.carry.energy == creep.carryCapacity || creep.memory.burndown)) {
			creep.memory.working = true;
		}

		if(creep.memory.working == true) {
            var damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });
            if(damagedStructure != undefined) {
                if(creep.repair(damagedStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedStructure);
                }
            }
            else {
                roleBuilder.run(creep);
            }
			
		}
		else {
			var source = Game.getObjectById("577b92ce0f9d51615fa472a9");
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

module.exports = roleBuilder;