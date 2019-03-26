class Build {
  public pendingSites = (creep: Creep): boolean => {
    creep.say("🚧 build");
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length > 0) {
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
      return true;
    }
    return false;
  };
}

export default new Build();
