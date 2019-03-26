import Build from "actions/Build";
import Sources from "actions/Sources";
import Upgrade from "actions/Upgrade";
import Transfer from "actions/Transfer";

class Builder {
  public MinNum = 2;

  public tasked = (creep: Creep): boolean => {
    return creep.memory.role === Role.Builder;
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
      if (!Build.pendingSites(creep)) {
        if (!Transfer.toSpawn(creep)) {
          Upgrade.room(creep);
        }
      }
    }
  };
}

export default new Builder();
