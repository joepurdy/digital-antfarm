import Transfer from "actions/Transfer";
import Repair from "actions/Repair";
import Sources from "actions/Sources";
import Upgrade from "actions/Upgrade";

class Handyman {
  public MinNum = 2;

  public tasked = (creep: Creep): boolean => {
    return creep.memory.role === Role.Handyman;
  };

  public work = (creep: Creep) => {
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
      if (!Repair.damagedStructures(creep)) {
        if (!Transfer.toSpawn(creep)) {
          Upgrade.room(creep);
        }
      }
    }
  };
}

export default new Handyman();
