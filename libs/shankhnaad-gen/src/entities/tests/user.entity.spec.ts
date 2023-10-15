import { User } from '../user.entity';

import { Wallet } from '../wallet.entity';

describe('User Entity', () => {
  let user: User;
  beforeAll(() => {
    const result = User.create({});
    user = result.getValue();
  });

  it('should be defined', () => {
    expect(user).toBeDefined();
  });

  it('should have valid id', () => {
    expect(user.id).toBeDefined();
    expect(user.id).toHaveLength(64);
    expect(user.id).toMatch(/[A-Fa-f0-9]{64}/);
  });

  it('should have valid createdAt', () => {
    expect(user.createdAt).toBeDefined();
    expect(user.createdAt instanceof Date).toBeTruthy();
  });

  it('should have valid updatedAt', () => {
    expect(user.updatedAt).toBeDefined();
    expect(user.updatedAt instanceof Date).toBeTruthy();
  });
});
