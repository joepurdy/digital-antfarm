class Upgrade {
  public room = (creep: Creep) => {
    creep.say("⚡ upgrade");
    const RC = <StructureController>creep.room.controller;
    if (creep.upgradeController(RC) == ERR_NOT_IN_RANGE) {
      creep.moveTo(RC, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  };
}

export default new Upgrade();
