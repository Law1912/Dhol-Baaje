import { WalletAsset } from '../wallet-asset.entity';

describe('WalletAsset Entity', () => {
  let walletAsset: WalletAsset;
  beforeAll(() => {
    const result = WalletAsset.create({});
    walletAsset = result.getValue();
  });

  it('should be defined', () => {
    expect(walletAsset).toBeDefined();
  });

  it('should have valid id', () => {
    expect(walletAsset.id).toBeDefined();
    expect(walletAsset.id).toHaveLength(64);
    expect(walletAsset.id).toMatch(/[A-Fa-f0-9]{64}/);
  });

  it('should have valid createdAt', () => {
    expect(walletAsset.createdAt).toBeDefined();
    expect(walletAsset.createdAt instanceof Date).toBeTruthy();
  });

  it('should have valid updatedAt', () => {
    expect(walletAsset.updatedAt).toBeDefined();
    expect(walletAsset.updatedAt instanceof Date).toBeTruthy();
  });
});
