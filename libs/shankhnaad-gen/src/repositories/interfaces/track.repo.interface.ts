/* eslint-disable @typescript-eslint/no-empty-interface */
import { Repository } from '@logosphere/sdk';
import { Track } from '../../entities';

export interface ITrackRepository extends Repository<Track> {
  findAllByNftIpfsCid(nftIpfsCid: string): Promise<Track[]>;
  findAllByNftCardanoTxId(nftCardanoTxId: string): Promise<Track[]>;
  findAllByNftName(nftName: string): Promise<Track[]>;
  findAllByNftDescription(nftDescription: string): Promise<Track[]>;
  findAllByNftAssetName(nftAssetName: string): Promise<Track[]>;
}
