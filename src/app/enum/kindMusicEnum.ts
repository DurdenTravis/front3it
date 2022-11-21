export enum KindMusicEnum {
    ROCK = "Rock",
    POP = "Pop",
    JAZZ ="Jazz",
    CLASICA = "Clásica",
    CUMBIA ="Cumbia",
    OTRO  = "Otro"
}

export const KindTypeLabelMapping: Record<KindMusicEnum, string> = {
    [KindMusicEnum.ROCK]: "Rock",
    [KindMusicEnum.POP]: "Pop",
    [KindMusicEnum.JAZZ]: "Jazz",
    [KindMusicEnum.CUMBIA]: "Cumbia",
    [KindMusicEnum.CLASICA]: "Clásica",
    [KindMusicEnum.OTRO]: "Otro"
};