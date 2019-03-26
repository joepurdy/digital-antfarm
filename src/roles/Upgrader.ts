import Sources from "actions/Sources";
import Upgrade from "actions/Upgrade";

class Upgrader {
  public MinNum = 2;

  public tasked = (creep: Creep): boolean => {
    return creep.memory.role === Role.Upgrader;
  };

  public work = (creep: Creep) => {
    const RC = <StructureController>creep.room.controller;

    if (creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = false;
    }
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    if (!creep.memory.working) {
      Sources.harvest(creep);
    }

    if (creep.memory.working) {
      Upgrade.room(creep);
    }
  };
}

export default new Upgrader();
