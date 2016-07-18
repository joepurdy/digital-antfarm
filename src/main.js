require('prototype.spawn')();
var roleHarvester = require('role.harvester'),
	roleMiner	  = require('role.miner'),
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
		if(creep.memory.role == 'miner') {
			roleMiner.run(creep);
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

	var MIN_HARVESTERS = 4,
		NUM_HARVESTERS = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');

	var MIN_MINERS = 1,
		NUM_MINERS = _.sum(Game.creeps, (c) => c.memory.role == 'miner');

	var MIN_UPGRADERS = 1,
		NUM_UPGRADERS = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

	var MIN_BUILDERS = 1,
		MAX_BUILDERS = 8,
		NUM_BUILDERS = _.sum(Game.creeps, (c) => c.memory.role == 'builder');

	var MIN_HANDYMANS = 4,
		NUM_HANDYMANS = _.sum(Game.creeps, (c) => c.memory.role == 'handyman');

	// Echo info
	console.log('Harvesters: ' + NUM_HARVESTERS + '|' +
				'Upgraders: ' + NUM_UPGRADERS + '|' +
				'Builders: ' + NUM_BUILDERS + '|' +
				'Miners: ' + NUM_MINERS + '|' +
				'Handymans: ' + NUM_HANDYMANS);

	var energy = Game.spawns.Shadowhall.room.energyCapacityAvailable;
	var name = undefined;

	if(NUM_HARVESTERS < MIN_HARVESTERS) {
		name = Game.spawns.Shadowhall.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, { role: 'harvester', working: false, burndown: false });
		if(name == ERR_NOT_ENOUGH_ENERGY && NUM_HARVESTERS == 0) {
			name = Game.spawns.Shadowhall.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, { role: 'harvester', working: false, burndown: false });
		} 
	}
	else if(NUM_MINERS < MIN_MINERS) {
		name = Game.spawns.Shadowhall.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, { role: 'miner', working: false, burndown: false });
	}
	else if(NUM_UPGRADERS < MIN_UPGRADERS) {
		name = Game.spawns.Shadowhall.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, { role: 'upgrader', working: false, burndown: false });
	}
	else if(NUM_HANDYMANS < MIN_HANDYMANS) {
		name = Game.spawns.Shadowhall.createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, { role: 'handyman', working: false, burndown: false });
	}
	else if(NUM_BUILDERS < MAX_BUILDERS) {
		name = Game.spawns.Shadowhall.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, { role: 'builder', working: false, burndown: false });
	}
	else if(NUM_BUILDERS >= MAX_BUILDERS) {
		console.log("Reached builder limit for room");
	}
};