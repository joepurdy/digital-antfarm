import Sources from "actions/Sources";
import Transfer from "actions/Transfer";
import Upgrade from "actions/Upgrade";
import Build from "actions/Build";

class Harvester {
  public MinNum = 10;

  public tasked = (creep: Creep): boolean => {
    return creep.memory.role === Role.Harvester;
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
      if (!Transfer.toSpawn(creep)) {
        if (!Build.pendingSites(creep)) {
          Upgrade.room(creep);
        }
      }
    }
  };
}

export default new Harvester();
