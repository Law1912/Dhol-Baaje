import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FlureeClient, flureeConfig } from '@logosphere/fluree';
import {
  cardanoWalletConfig,
  CardanoWalletService,
  mintConfig,
  MintService,
  SubmitService,
  TransactionService,
} from '@logosphere/cardano';
import {
  WalletAssetFlureeRepository,
  WalletFlureeRepository,
  UserFlureeRepository,
  TrackFlureeRepository,
} from './repositories/fluree';
import {
  WalletAssetResolver,
  WalletResolver,
  UserResolver,
  TrackResolver,
  LucidResolver,
} from './resolvers';
import {
  WalletAssetFlureeMap,
  WalletFlureeMap,
  UserFlureeMap,
  TrackFlureeMap,
} from './mappers/fluree';
import {
  WalletAssetDtoMap,
  WalletDtoMap,
  UserDtoMap,
  TrackDtoMap,
} from './mappers/dto';

@Module({
  imports: [
    ConfigModule.forFeature(flureeConfig),
    ConfigModule.forFeature(mintConfig),
    ConfigModule.forFeature(cardanoWalletConfig),
  ],
  providers: [
    FlureeClient,
    CardanoWalletService,
    MintService,
    SubmitService,
    TransactionService,
    WalletAssetDtoMap,
    WalletDtoMap,
    UserDtoMap,
    TrackDtoMap,
    WalletAssetFlureeMap,
    WalletFlureeMap,
    UserFlureeMap,
    TrackFlureeMap,
    WalletAssetFlureeRepository,
    WalletFlureeRepository,
    UserFlureeRepository,
    TrackFlureeRepository,
    WalletAssetResolver,
    WalletResolver,
    UserResolver,
    TrackResolver,
    LucidResolver,
  ],
  exports: [],
})
export class ShankhnaadModule {}
