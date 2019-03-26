import Terrain from "utils/Terrain";

class Sources {
  public harvest = (creep: Creep): void => {
    creep.say("🔄 harvest");
    creep.memory.state = "harvest_source";

    const sources = Terrain.findSources(creep.room.name);
    // console.log(`Sources found: ${sources}`);
    // let max = sources.length % Memory.rollcall[creep.memory.role];
    // console.log(`Count worker: ${Memory.rollcall[creep.memory.role]} | Max: ${max}`);

    if (sources && sources.length > 0) {
      const harvestCode = creep.harvest(sources[0]);
      // console.log(`${harvestCode}`);
      if (harvestCode === ERR_NOT_IN_RANGE) {
        const moveCode = creep.moveTo(sources[0], {
          visualizePathStyle: { stroke: "#ffaa00" }
        });
        // console.log(`Move Code: ${moveCode}`);
      }
    }
  };
}

export default new Sources();
