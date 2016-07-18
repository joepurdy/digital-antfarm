var roleHarvester = require('role.harvester'),
    roleUpgrader = require('role.upgrader'),
    roleBuilder = require('role.builder');

var MAX_HARVESTERS = 3,
    MAX_UPGRADERS  = 2,
    MAX_BUILDERS   = 2;

module.exports.loop = function () {

    // Purge dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Spawn Harvesters
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < MAX_HARVESTERS) {
        var newName = Game.spawns.Shadowhollow.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    } else if(harvesters.length === MAX_HARVESTERS && harvesters.length < 10) {
        MAX_HARVESTERS += 1;
    }

    // Spawn Upgraders
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < MAX_UPGRADERS) {
        var newName = Game.spawns.Shadowhollow.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    } else if(upgraders.length === MAX_UPGRADERS && upgraders.length < 10) {
        MAX_UPGRADERS += 1;
    }

    // Spawn Builders
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < MAX_BUILDERS) {
        var newName = Game.spawns.Shadowhollow.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new harvester: ' + newName);
    } else if(builders.length === MAX_BUILDERS && builders.length < 10) {
        MAX_BUILDERS += 1;
    }

    // Run creep roles
    for(var name in Game.creeps) {
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
    }
}