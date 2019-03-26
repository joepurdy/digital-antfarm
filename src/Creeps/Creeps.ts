import Harvester from "roles/Harvester";
import Upgrader from "roles/Upgrader";
import Builder from "roles/Builder";
import Handyman from "roles/Handyman";
import CreepFactory from "CreepFactory/CreepFactory";

class Creeps {
  public forEachDoWork = (): void => {
    for (const name in Memory.creeps) {
      this.work(Game.creeps[name]);
    }
  };

  public rollcall = (): void => {
    delete Memory.rollcall;
    let rollcall: Array<number> = [0, 0, 0, 0];
    for (const name in Memory.creeps) {
      rollcall[Game.creeps[name].memory.role] += 1;
    }
    Memory.rollcall = rollcall;
  };

  public replenish = (): void => {
    let harvesterCount: number = 0;
    let upgraderCount: number = 0;
    let builderCount: number = 0;
    let handymanCount: number = 0;

    for (let creep in Game.creeps) {
      switch (Game.creeps[creep].memory.role) {
        case Role.Harvester: {
          harvesterCount++;
          break;
        }
        case Role.Upgrader: {
          upgraderCount++;
          break;
        }
        case Role.Builder: {
          builderCount++;
          break;
        }
        case Role.Handyman: {
          handymanCount++;
          break;
        }
      }
    }

    if (harvesterCount < Harvester.MinNum) {
      CreepFactory.spawn(Role.Harvester);
      return;
    }

    if (upgraderCount < Upgrader.MinNum) {
      CreepFactory.spawn(Role.Upgrader);
      return;
    }

    if (builderCount < Builder.MinNum) {
      CreepFactory.spawn(Role.Builder);
      return;
    }

    if (handymanCount < Handyman.MinNum) {
      CreepFactory.spawn(Role.Handyman);
      return;
    }
  };

  private work = (creep: Creep): void => {
    if (Harvester.tasked(creep)) {
      Harvester.work(creep);
    }
    if (Upgrader.tasked(creep)) {
      Upgrader.work(creep);
    }
    if (Builder.tasked(creep)) {
      Builder.work(creep);
    }
    if (Handyman.tasked(creep)) {
      Handyman.work(creep);
    }
  };
}

export default new Creeps();
