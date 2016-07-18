require('prototype.spawn')();
var roleHarvester = require('role.harvester'),
	roleUpgrader  = require('role.upgrader'),
	roleBuilder	  = require('role.builder'),
	roleHandyman  = require('role.handyman');

module.exports.loop = function() {
	// flush memory
	for(let name in Memory.creeps) {
		if(Game.creeps[name] == undefined) {
			delete Memory.creeps[name];
		}
	}

	for(let name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		}
		if(creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		}
		if(creep.memory.role == 'builder') {
			roleBuilder.run(creep);
		}
		if(creep.memory.role == 'handyman') {
			roleHandyman.run(creep);
		}
	}

	var MIN_HARVESTERS = 10,
		NUM_HARVESTERS = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');

	var MIN_UPGRADERS = 1,
		NUM_UPGRADERS = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

	var MIN_BUILDERS = 1,
		NUM_BUILDERS = _.sum(Game.creeps, (c) => c.memory.role == 'builder');

	var MIN_HANDYMANS = 2,
		NUM_HANDYMANS = _.sum(Game.creeps, (c) => c.memory.role == 'handyman');

	var energy = Game.spawns.Shadowhall.room.energyCapacityAvailable;
	var name = undefined;

	if(NUM_HARVESTERS < MIN_HARVESTERS) {
		name = Game.spawns.Shadowhall.createCustomCreep(energy, 'harvester');
		if(name == ERR_NOT_ENOUGH_ENERGY && NUM_HARVESTERS == 0) {
			name = Game.spawns.Shadowhall.createCustomCreep(Game.spawns.Shadowhall.room.energyAvailable, 'harvester');
		} 
	}
	else if(NUM_UPGRADERS < MIN_UPGRADERS) {
		name = Game.spawns.Shadowhall.createCustomCreep(energy, 'upgrader');
	}
	else if(NUM_HANDYMANS < MIN_HANDYMANS) {
		name = Game.spawns.Shadowhall.createCustomCreep(energy, 'handyman');
	}
	else if(NUM_BUILDERS < MIN_BUILDERS) {
		name = Game.spawns.Shadowhall.createCustomCreep(energy, 'builder');
	}
	else {
		name = Game.spawns.Shadowhall.createCustomCreep(energy, 'builder');
	}
};