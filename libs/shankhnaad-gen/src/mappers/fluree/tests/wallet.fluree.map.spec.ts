import { Wallet } from '../../../entities/wallet.entity';
import { WalletFlureeMap } from '../wallet.fluree.map';

describe('Wallet Fluree Map', () => {
  let walletData;
  let wallet: Wallet;
  let mapper: WalletFlureeMap;
  beforeAll(() => {
    walletData = {
      _id: 369435906932826,
      'wallet/identifier':
        '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      'wallet/createdAt': 1657773127808,
      'wallet/updatedAt': 1657773127808,
      'wallet/name': 'Babingos wallet',
      'wallet/walletId': 'cd72843c95467883ccd6dafe227b91c96f071713',
      'wallet/address':
        'addr_test1qzsn8km55mp6cra7l20cymauks2fay8sqc3jr874mgmxpsa5mj4dvw5zrxmhauknj60c8tsf7x72ng0r8zmxa3necjlsgx9q6d',
      'wallet/publicKey':
        'a1f009e6f5770c7b10729f27237c7ccc677739e31119a69766664dee611220948234926b2c445c2e9e2ff40f22beafa193d7fedf72e5e877bffd606d33b6638c',
      'wallet/balance': 1,
      'wallet/assets': [
        {
          _id: 369435906932826,
          'walletAsset/identifier':
            '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
          'walletAsset/createdAt': 1657773127808,
          'walletAsset/updatedAt': 1657773127808,
          'walletAsset/name': '4269736f6e',
          'walletAsset/fingerprint':
            'asset12q7zh30hj2yme96wy8ms4fcdrwtep0auz8xqly',
          'walletAsset/policyId':
            '0b7018936bc41808ddabd96b4908b583195a0c252b5752ad38012bdb',
          'walletAsset/quantity': 1,
          'walletAsset/metadata': 'abcdefg',
          'walletAsset/assetSubjectId': '87960930223082',
          'walletAsset/logosphereId':
            '62c0ac76d6eebbf70828da57ea06c41a55001a2eb3cc929206d8f39abdbfaefc',
        },
      ],
    };
    mapper = new WalletFlureeMap();
  });

  it('should create Wallet entity from Fluree data', () => {
    wallet = mapper.toEntity(walletData);
    expect(wallet.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(wallet.subjectId).toBe('369435906932826');
    expect(wallet.createdAt instanceof Date).toBeTruthy();
    expect(wallet.updatedAt instanceof Date).toBeTruthy();
    expect(wallet.name).toBe('Babingos wallet');
    expect(wallet.walletId).toBe('cd72843c95467883ccd6dafe227b91c96f071713');
    expect(wallet.address).toBe(
      'addr_test1qzsn8km55mp6cra7l20cymauks2fay8sqc3jr874mgmxpsa5mj4dvw5zrxmhauknj60c8tsf7x72ng0r8zmxa3necjlsgx9q6d'
    );
    expect(wallet.publicKey).toBe(
      'a1f009e6f5770c7b10729f27237c7ccc677739e31119a69766664dee611220948234926b2c445c2e9e2ff40f22beafa193d7fedf72e5e877bffd606d33b6638c'
    );
    expect(wallet.balance).toBe(1);
  });

  it('should serialize Wallet to Fluree data', () => {
    const mappedData = mapper.fromEntity(wallet);
    expect(mappedData).toStrictEqual(walletData);
  });
});
