export function Neuralyzer() {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  // Automatically load memory of missing creeps
  for (const name in Game.creeps) {
    if (!(name in Memory.creeps)) {
      Memory.creeps[name] = Game.creeps[name].memory;
    }
  }
}
