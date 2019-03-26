class Repair {
  public damagedStructures = (creep: Creep): boolean => {
    creep.say("🔨 repair");
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.hits < structure.hitsMax
    });

    targets.sort((a, b) => a.hits - b.hits);

    if (targets.length > 0) {
      if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
      return true;
    }
    return false;
  };
}

export default new Repair();
