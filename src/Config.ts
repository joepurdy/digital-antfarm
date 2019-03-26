class Config {
  private mainSpawn = Game.spawns["Spawn-W21N35"];
  private simSpawn = Game.spawns["Spawn-sim"];
  public SpawnPrime = this.mainSpawn;
  // public SpawnPrime = this.simSpawn;
}

export default new Config();
