class Terrain {
  public findSources = (roomName: string): Array<Source> => {
    const room = Game.rooms[roomName];
    return room.find(FIND_SOURCES);
  };
}

export default new Terrain();
