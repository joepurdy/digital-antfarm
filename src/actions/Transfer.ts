class Transfer {
  public toSpawn = (creep: Creep): boolean => {
    creep.say("⚡ store");
    let targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) &&
          structure.energy < structure.energyCapacity
        );
      }
    });

    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
      return true;
    }
    return false;
  };
}

export default new Transfer();
