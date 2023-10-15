import { User } from '../../../entities/user.entity';
import { UserFlureeMap } from '../user.fluree.map';

describe('User Fluree Map', () => {
  let userData;
  let user: User;
  let mapper: UserFlureeMap;
  beforeAll(() => {
    userData = {
      _id: 369435906932826,
      'user/identifier':
        '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      'user/createdAt': 1657773127808,
      'user/updatedAt': 1657773127808,
      'user/username': 'babingo_whoelse@gmail.com',
      'user/wallet': {
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
      },
      'user/subscriptionEndDate': 'abcdefg',
      'user/myTracksId': ['abcdefg'],
      'user/likedTracksId': ['abcdefg'],
      'user/historyTracksId': ['abcdefg'],
      'user/rewards': 1,
      'user/likes': 1,
    };
    mapper = new UserFlureeMap();
  });

  it('should create User entity from Fluree data', () => {
    user = mapper.toEntity(userData);
    expect(user.id).toBe(
      '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a'
    );
    expect(user.subjectId).toBe('369435906932826');
    expect(user.createdAt instanceof Date).toBeTruthy();
    expect(user.updatedAt instanceof Date).toBeTruthy();
    expect(user.username).toBe('babingo_whoelse@gmail.com');
    expect(user.subscriptionEndDate).toBe('abcdefg');
    expect(user.myTracksId).toStrictEqual(['abcdefg']);
    expect(user.likedTracksId).toStrictEqual(['abcdefg']);
    expect(user.historyTracksId).toStrictEqual(['abcdefg']);
    expect(user.rewards).toBe(1);
    expect(user.likes).toBe(1);
  });

  it('should serialize User to Fluree data', () => {
    const mappedData = mapper.fromEntity(user);
    expect(mappedData).toStrictEqual(userData);
  });
});
