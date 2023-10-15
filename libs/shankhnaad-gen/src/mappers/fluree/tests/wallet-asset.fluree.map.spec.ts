import { WalletAsset } from '../../../entities/wallet-asset.entity';
import { WalletAssetFlureeMap } from '../wallet-asset.fluree.map';

describe('WalletAsset Fluree Map', () => {
  let walletAssetData;
  let walletAsset: WalletAsset;
  let mapper: WalletAssetFlureeMap;
  beforeAll(() => {
    walletAssetData = {
      _id: 369435906932826,
      'walletAsset/identifier':
        '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      'walletAsset/createdAt': 1657773127808,
      'walletAsset/updatedAt': 1657773127808,
      'walletAsset/name': '4269736f6e',
      'walletAsset/fingerprint': 'asset12q7zh30hj2yme96wy8ms4fcdrwtep0auz8xqly',
      'walletAsset/policyId':
        '0b7018936bc41808ddabd96b4908b583195a0c252b5752ad38012bdb',
      'walletAsset/quantity': 1,
      'walletAsset/metadata': 'abcdefg',
      'walletAsset/assetSubjectId': '87960930223082',
      'walletAsset/logosphereId':
        '62c0ac76d6eebbf70828da57ea06c41a55001a2eb3cc929206d8f39abdbfaefc',
    };
    mapper = new WalletAssetFlureeMap();
  });

  it('should create WalletAsset entity from Fluree data', () => {
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

  it('should serialize WalletAsset to Fluree data', () => {
    const mappedData = mapper.fromEntity(walletAsset);
    expect(mappedData).toStrictEqual(walletAssetData);
  });
});
