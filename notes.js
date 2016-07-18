Game.creeps.Harvester1.memory.role = 'harvester';
Game.creeps.Upgrader1.memory.role = 'upgrader';

Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Builder1', { role: 'builder' } );
Game.spawns.Spawn1.createCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'HarvesterBig', { role: 'harvester' } );

var tower = Game.getObjectById();
if(tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax
    });
    if(closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
        tower.attack(closestHostile);
    }
}