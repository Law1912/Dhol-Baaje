import { Wallet } from '../../../entities/wallet.entity';
import { WalletDto } from '../../../dto';
import { WalletDtoMap } from '../wallet.dto.map';

describe('Wallet Dto Map', () => {
  let walletData: WalletDto;
  let wallet: Wallet;
  let mapper: WalletDtoMap;
  beforeAll(() => {
    walletData = {
      subjectId: '369435906932826',
      id: '34b9142664b55f552ea66c8189ab481382d14385c126fee99a997b69e6b3824a',
      createdAt: '2022-05-22T20:53:18.000Z',
      updatedAt: '2022-05-22T20:53:18.000Z',
      name: 'Babingos wallet',
      walletId: 'cd72843c95467883ccd6dafe227b91c96f071713',
      address:
        'addr_test1qzsn8km55mp6cra7l20cymauks2fay8sqc3jr874mgmxpsa5mj4dvw5zrxmhauknj60c8tsf7x72ng0r8zmxa3necjlsgx9q6d',
      publicKey:
        'a1f009e6f5770c7b10729f27237c7ccc677739e31119a69766664dee611220948234926b2c445c2e9e2ff40f22beafa193d7fedf72e5e877bffd606d33b6638c',
      balance: 1,
      assets: [
        {
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
        },
      ],
    };
    mapper = new WalletDtoMap();
  });

  it('should create Wallet entity from DTO data', () => {
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

  it('should serialize Wallet to DTO data', () => {
    const mappedData = mapper.fromEntity(wallet);
    expect(mappedData).toStrictEqual(walletData);
  });
});
