export interface Track {
  id: string;
  subjectId: number;
  title: string;
  subtitle: string;
  username: string;
  music: string;
  image: string;
  likes: number;
  n_listens: number;
  lyrics: string;
  album: Genre[];
  value: number;
  nftIpfsCid: string;
  nftCardanoTxId: string;
  nftName: string;
  nftDescription: string;
  nftAssetName: string;
  createdAt: string;
  updatedAt: string;
}

export enum Genre {
  Indie = "Indie",
  Love = "Love",
  Ambient = "Ambient",
  Party = "Party",
  Devotional = "Devotional",
  Decades = "Decades",
  Dance = "Dance",
  Student = "Student",
  Chill = "Chill",
  Workout = "Workout",
  Rock = "Rock",
  Sleep = "Sleep",
  Instrumental = "Instrumental",
  Jazz = "Jazz",
  Classical = "Classical",
  Focus = "Focus",
  Soul = "Soul",
  Travel = "Travel",
  Disco = "Disco",
  Sad = "Sad"
};

export interface Wallet {
  address: string;
}

export interface User {
  id: string;
  username: string;
  wallet: Wallet;
  myTracksId: Array<String>;
  likedTracksId: Array<String>;
  historyTracksId: Array<String>;
  subscriptionEndDate: string;
  rewards: number;
  updatedAt: string;
  createdAt: string;
}

export interface ReorderProps {
  list: any
  startIndex: number
  endIndex: number
}