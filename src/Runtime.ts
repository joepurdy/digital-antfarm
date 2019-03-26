import Creeps from "Creeps/Creeps";

class Runtime {
  public loop = () => {
    Creeps.rollcall();
    Creeps.replenish();
    Creeps.forEachDoWork();
  };
}

export default new Runtime();
