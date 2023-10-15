import { Track } from '../../../entities/track.entity';
import { TrackDto } from '../../../dto';
import { TrackDtoMap } from '../track.dto.map';
import { Genre } from '../../../shankhnaad.model';

describe('Track Dto Map', () => {
  let trackData: TrackDto;
  let track: Track;
  let mapper: TrackDtoMap;
  beforeAll(() => {
    trackData = {
      subjectId: '369435906932826',
      id: '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      createdAt: '2022-05-22T20:53:18.000Z',
      updatedAt: '2022-05-22T20:53:18.000Z',
      title: 'Song name',
      subtitle: 'Some name',
      username: 'abcdefg',
      music: '123456789',
      image: '123456789',
      likes: 1,
      n_listens: 1,
      lyrics: 'a great song!!!',
      album: ['Indie'],
      value: 1,
      nftIpfsCid: 'QmPrhyaEVcavi3XuP7WHBcD2n8xcUK6mGcF1u6AchXYbgn',
      nftCardanoTxId:
        '664274fa17646981774ac9a5ab5f79d4229788ee5d78bb6e3af351f9b25e2ac3',
      nftName: 'NFT Name',
      nftDescription: 'NFT Description',
      nftAssetName: 'NFT Asset Name',
    };
    mapper = new TrackDtoMap();
  });

  it('should create Track entity from DTO data', () => {
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

  it('should serialize Track to DTO data', () => {
    const mappedData = mapper.fromEntity(track);
    expect(mappedData).toStrictEqual(trackData);
  });
});
