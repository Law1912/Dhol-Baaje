import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';

import { Wallet } from './wallet.entity';

interface UserProps extends EntityProps {
  username?: string;
  wallet?: Wallet;
  subscriptionEndDate?: string;
  myTracksId?: string[];
  likedTracksId?: string[];
  historyTracksId?: string[];
  rewards?: number;
  likes?: number;
}

export class User extends Entity<UserProps> {
  get username(): string {
    return this.props.username;
  }
  get wallet(): Wallet {
    return this.props.wallet;
  }
  get subscriptionEndDate(): string {
    return this.props.subscriptionEndDate;
  }
  get myTracksId(): string[] {
    return this.props.myTracksId;
  }
  get likedTracksId(): string[] {
    return this.props.likedTracksId;
  }
  get historyTracksId(): string[] {
    return this.props.historyTracksId;
  }
  get rewards(): number {
    return this.props.rewards;
  }
  get likes(): number {
    return this.props.likes;
  }

  private constructor(props: UserProps) {
    super(props);
  }

  public static create(props: UserProps): Result<User> {
    const propsResult = Guard.againstNullOrUndefinedBulk([]);

    if (!propsResult.succeeded) {
      return Result.fail<User>(propsResult.message);
    }

    const user = new User(props);

    return Result.ok<User>(user);
  }
}
