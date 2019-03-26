import Config from "Config";
import Maths from "utils/Maths";

class CreepFactory {
  public spawn = (role: Role) => {
    const name = "creep-" + Maths.uuid();
    if (
      Config.SpawnPrime.spawnCreep([WORK, CARRY, MOVE], name, {
        memory: {
          role: role,
          working: false,
          room: Config.SpawnPrime.room,
          state: ""
        }
      }) === OK
    ) {
      console.log(`Spawned creep ${name}`);
    }
  };
}

export default new CreepFactory();
