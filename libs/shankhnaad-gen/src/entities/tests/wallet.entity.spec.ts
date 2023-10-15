import { Wallet } from '../wallet.entity';

import { WalletAsset } from '../wallet-asset.entity';

describe('Wallet Entity', () => {
  let wallet: Wallet;
  beforeAll(() => {
    const result = Wallet.create({});
    wallet = result.getValue();
  });

  it('should be defined', () => {
    expect(wallet).toBeDefined();
  });

  it('should have valid id', () => {
    expect(wallet.id).toBeDefined();
    expect(wallet.id).toHaveLength(64);
    expect(wallet.id).toMatch(/[A-Fa-f0-9]{64}/);
  });

  it('should have valid createdAt', () => {
    expect(wallet.createdAt).toBeDefined();
    expect(wallet.createdAt instanceof Date).toBeTruthy();
  });

  it('should have valid updatedAt', () => {
    expect(wallet.updatedAt).toBeDefined();
    expect(wallet.updatedAt instanceof Date).toBeTruthy();
  });
});
