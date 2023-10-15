import { Track } from '../../../entities/track.entity';
import { TrackFlureeMap } from '../track.fluree.map';
import { Genre } from '../../../shankhnaad.model';

describe('Track Fluree Map', () => {
  let trackData;
  let track: Track;
  let mapper: TrackFlureeMap;
  beforeAll(() => {
    trackData = {
      _id: 369435906932826,
      'track/identifier':
        '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      'track/createdAt': 1657773127808,
      'track/updatedAt': 1657773127808,
      'track/title': 'Song name',
      'track/subtitle': 'Some name',
      'track/username': 'abcdefg',
      'track/music': '123456789',
      'track/image': '123456789',
      'track/likes': 1,
      'track/n_listens': 1,
      'track/lyrics': 'a great song!!!',
      'track/album': ['Indie'],
      'track/value': 1,
      'track/nftIpfsCid': 'QmPrhyaEVcavi3XuP7WHBcD2n8xcUK6mGcF1u6AchXYbgn',
      'track/nftCardanoTxId':
        '664274fa17646981774ac9a5ab5f79d4229788ee5d78bb6e3af351f9b25e2ac3',
      'track/nftName': 'NFT Name',
      'track/nftDescription': 'NFT Description',
      'track/nftAssetName': 'NFT Asset Name',
    };
    mapper = new TrackFlureeMap();
  });

  it('should create Track entity from Fluree data', () => {
    track = mapper.toEntity(trackData);
    expect(track.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(track.subjectId).toBe('369435906932826');
    expect(track.createdAt instanceof Date).toBeTruthy();
    expect(track.updatedAt instanceof Date).toBeTruthy();
    expect(track.title).toBe('Song name');
    expect(track.subtitle).toBe('Some name');
    expect(track.username).toBe('abcdefg');
    expect(track.music).toBe('123456789');
    expect(track.image).toBe('123456789');
    expect(track.likes).toBe(1);
    expect(track.n_listens).toBe(1);
    expect(track.lyrics).toBe('a great song!!!');
    expect(track.album).toStrictEqual([Genre.Indie]);
    expect(track.value).toBe(1);
    expect(track.nftIpfsCid).toBe(
      'QmPrhyaEVcavi3XuP7WHBcD2n8xcUK6mGcF1u6AchXYbgn'
    );
    expect(track.nftCardanoTxId).toBe(
      '664274fa17646981774ac9a5ab5f79d4229788ee5d78bb6e3af351f9b25e2ac3'
    );
    expect(track.nftName).toBe('NFT Name');
    expect(track.nftDescription).toBe('NFT Description');
    expect(track.nftAssetName).toBe('NFT Asset Name');
  });

  it('should serialize Track to Fluree data', () => {
    const mappedData = mapper.fromEntity(track);
    expect(mappedData).toStrictEqual(trackData);
  });
});
