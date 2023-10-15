import { Genre } from '../enum-types';

export class TrackDto {
  id?: string;
  subjectId?: string;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  subtitle?: string;
  username?: string;
  music?: string;
  image?: string;
  likes?: number;
  n_listens?: number;
  lyrics?: string;
  album?: Genre[];
  value?: number;
  nftIpfsCid?: string;
  nftCardanoTxId?: string;
  nftName?: string;
  nftDescription?: string;
  nftAssetName?: string;
}
