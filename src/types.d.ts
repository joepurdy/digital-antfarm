declare const enum Role {
  Harvester,
  Upgrader,
  Builder,
  Handyman
}

// memory extension samples
interface CreepMemory {
  role: Role;
  room: Room;
  state: string;
  working: boolean;
}

interface Memory {
  Rooms: [string, Room];
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
