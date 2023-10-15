import { WalletAsset } from '../../../entities/wallet-asset.entity';
import { WalletAssetDto } from '../../../dto';
import { WalletAssetDtoMap } from '../wallet-asset.dto.map';

describe('WalletAsset Dto Map', () => {
  let walletAssetData: WalletAssetDto;
  let walletAsset: WalletAsset;
  let mapper: WalletAssetDtoMap;
  beforeAll(() => {
    walletAssetData = {
      subjectId: '369435906932826',
      id: '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      createdAt: '2022-05-22T20:53:18.000Z',
      updatedAt: '2022-05-22T20:53:18.000Z',
      name: '4269736f6e',
      fingerprint: 'asset12q7zh30hj2yme96wy8ms4fcdrwtep0auz8xqly',
      policyId: '0b7018936bc41808ddabd96b4908b583195a0c252b5752ad38012bdb',
      quantity: 1,
      metadata: 'abcdefg',
      assetSubjectId: '87960930223082',
      logosphereId:
        '62c0ac76d6eebbf70828da57ea06c41a55001a2eb3cc929206d8f39abdbfaefc',
    };
    mapper = new WalletAssetDtoMap();
  });

  it('should create WalletAsset entity from DTO data', () => {
    walletAsset = mapper.toEntity(walletAssetData);
    expect(walletAsset.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(walletAsset.subjectId).toBe('369435906932826');
    expect(walletAsset.createdAt instanceof Date).toBeTruthy();
    expect(walletAsset.updatedAt instanceof Date).toBeTruthy();
    expect(walletAsset.name).toBe('4269736f6e');
    expect(walletAsset.fingerprint).toBe(
      'asset12q7zh30hj2yme96wy8ms4fcdrwtep0auz8xqly'
    );
    expect(walletAsset.policyId).toBe(
      '0b7018936bc41808ddabd96b4908b583195a0c252b5752ad38012bdb'
    );
    expect(walletAsset.quantity).toBe(1);
    expect(walletAsset.metadata).toBe('abcdefg');
    expect(walletAsset.assetSubjectId).toBe('87960930223082');
    expect(walletAsset.logosphereId).toBe(
      '62c0ac76d6eebbf70828da57ea06c41a55001a2eb3cc929206d8f39abdbfaefc'
    );
  });

  it('should serialize WalletAsset to DTO data', () => {
    const mappedData = mapper.fromEntity(walletAsset);
    expect(mappedData).toStrictEqual(walletAssetData);
  });
});
