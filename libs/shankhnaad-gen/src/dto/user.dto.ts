import { WalletDto } from './wallet.dto';

export class UserDto {
  id?: string;
  subjectId?: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
  wallet?: WalletDto;
  subscriptionEndDate?: string;
  myTracksId?: string[];
  likedTracksId?: string[];
  historyTracksId?: string[];
  rewards?: number;
  likes?: number;
}
