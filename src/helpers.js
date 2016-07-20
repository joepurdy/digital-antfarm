module.exports = {
    "isWorking": function(creep) {
        if(creep.memory.working && creep.carry.energy == 0) {
			creep.memory.working = false;
		}
		else if(!creep.memory.working && (creep.carry.energy == creep.carryCapacity || creep.memory.burndown)) {
			creep.memory.working = true;
		}
    },

	"buildShit": function(creep) {
		let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
		if(constructionSite != undefined) {
			if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
				creep.moveTo(constructionSite);
			}
		}
		else {
			throw "ERR_NO_SITES";
		}
	},

	"repairShit": function(creep) {
		let damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
		});
		if(damagedStructure != undefined) {
			if(creep.repair(damagedStructure) == ERR_NOT_IN_RANGE) {
				creep.moveTo(damagedStructure);
			}
		}
		else {
			throw "ERR_NO_DAMAGED_STRUCTURES";
		}
	},

	"gatherEnergy": function(creep) {
		let source = creep.pos.findClosestByPath(FIND_SOURCES);
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
			creep.memory.burndown = false;
			creep.moveTo(source);
		}
		else if(creep.harvest(source) == ERR_NOT_ENOUGH_RESOURCES) {
			if(creep.carry.energy > 0) {
				creep.memory.burndown = true;
			}
		}
	},

	"gatherStoredEnergy": function(creep) {
		var filledContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (s) => (s.structureType == STRUCTURE_CONTAINER) &&
							s.store[RESOURCE_ENERGY] > 0
		});
		if(filledContainer != undefined) {
			if(creep.withdraw(filledContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(filledContainer);
			}
		}
		else {
			throw "NO_STORED_ENERGY";
		}
	},

	"upgradeController": function(creep) {
		if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller);
		}
	},

	"transferToStorage": function(creep) {
		let fillableContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
			throw "ERR_UNABLE_TO_TRANSFER_STORAGE";
		}
	},

	"transferToSpawner": function(creep) {
		let energyBank = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
		filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
						s.structureType == STRUCTURE_EXTENSION) && 
						s.energy < s.energyCapacity
		});
		if(energyBank != undefined) {
			if(creep.transfer(energyBank, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(energyBank);
			}
		}
		else {
			throw "ERR_UNABLE_TO_TRANSFER_SPAWNER";
		}
	},

	"canFillSpawners": function(creep) {
		let spawners = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
			filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
							s.structureType == STRUCTURE_EXTENSION) && 
							s.energy < s.energyCapacity
		});
		if(spawners != undefined) {
			throw "SPAWNERS_CAN_FILL";
		}
		else {
			throw "SPAWNERS_FULL";
		}
	}
}