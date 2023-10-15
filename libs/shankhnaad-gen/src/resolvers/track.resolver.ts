/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Info,
  Context,
} from '@nestjs/graphql';
import { MintService } from '@logosphere/cardano';
import { Track, Wallet, WalletAsset } from '../entities';
import {
  TrackFlureeRepository,
  UserFlureeRepository,
  WalletFlureeRepository,
} from '../repositories/fluree';
import { tx_prepare_json } from 'cbauth-logo-wasm';
import { LogosphereError } from '@logosphere/sdk';
import { parseInfo } from '@logosphere/fluree';
import { TrackDto } from '../dto';
import { TrackDtoMap } from '../mappers/dto';
import { Genre } from '../shankhnaad.model';

@Resolver(() => Track)
export class TrackResolver {
  constructor(
    private repo: TrackFlureeRepository,
    private mapper: TrackDtoMap,
    private mintService: MintService,
    private userRepo: UserFlureeRepository,
    private walletRepo: WalletFlureeRepository
  ) {}

  @Query(() => [TrackDto])
  async trackFindAll(@Info() info: any): Promise<TrackDto[]> {
    return (await this.repo.findAll(parseInfo(info).info.selectionSetList)).map(
      (track: Track) => this.mapper.fromEntity(track)
    );
  }

  @Query(() => [TrackDto])
  async trackFindManyById(
    @Args({ name: 'idList', type: () => ID }) idList: string[],
    @Info() info: any
  ): Promise<TrackDto[]> {
    return (
      await this.repo.findManyById(
        idList,
        parseInfo(info).info.selectionSetList
      )
    ).map((track: Track) => this.mapper.fromEntity(track));
  }

  @Query(() => Boolean)
  async trackExists(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.exists(id);
  }

  @Query(() => Track)
  async trackFindOneById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Info() info: any
  ): Promise<TrackDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneById(id, parseInfo(info).info.selectionSetList)
    );
  }

  @Query(() => Track)
  async trackFindOneBySubjectId(
    @Args({ name: 'subjectId', type: () => String }) subjectId: string,
    @Info() info: any
  ): Promise<TrackDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneBySubjectId(
        subjectId,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Query(() => [TrackDto])
  async trackFindAllByNftIpfsCid(
    @Args({ name: 'nftIpfsCid', type: () => String }) nftIpfsCid: string,
    @Info() info: any
  ): Promise<TrackDto[]> {
    return (
      await this.repo.findAllByNftIpfsCid(
        nftIpfsCid,
        parseInfo(info).info.selectionSetList
      )
    ).map((nftIpfsCid: Track) => this.mapper.fromEntity(nftIpfsCid));
  }
  @Query(() => [TrackDto])
  async trackFindAllByNftCardanoTxId(
    @Args({ name: 'nftCardanoTxId', type: () => String })
    nftCardanoTxId: string,
    @Info() info: any
  ): Promise<TrackDto[]> {
    return (
      await this.repo.findAllByNftCardanoTxId(
        nftCardanoTxId,
        parseInfo(info).info.selectionSetList
      )
    ).map((nftCardanoTxId: Track) => this.mapper.fromEntity(nftCardanoTxId));
  }
  @Query(() => [TrackDto])
  async trackFindAllByNftName(
    @Args({ name: 'nftName', type: () => String }) nftName: string,
    @Info() info: any
  ): Promise<TrackDto[]> {
    return (
      await this.repo.findAllByNftName(
        nftName,
        parseInfo(info).info.selectionSetList
      )
    ).map((nftName: Track) => this.mapper.fromEntity(nftName));
  }
  @Query(() => [TrackDto])
  async trackFindAllByNftDescription(
    @Args({ name: 'nftDescription', type: () => String })
    nftDescription: string,
    @Info() info: any
  ): Promise<TrackDto[]> {
    return (
      await this.repo.findAllByNftDescription(
        nftDescription,
        parseInfo(info).info.selectionSetList
      )
    ).map((nftDescription: Track) => this.mapper.fromEntity(nftDescription));
  }
  @Query(() => [TrackDto])
  async trackFindAllByNftAssetName(
    @Args({ name: 'nftAssetName', type: () => String }) nftAssetName: string,
    @Info() info: any
  ): Promise<TrackDto[]> {
    return (
      await this.repo.findAllByNftAssetName(
        nftAssetName,
        parseInfo(info).info.selectionSetList
      )
    ).map((nftAssetName: Track) => this.mapper.fromEntity(nftAssetName));
  }

  @Mutation(() => TrackDto)
  async trackSave(
    @Args({ name: 'track', type: () => TrackDto }) track: TrackDto,
    @Info() info: any
  ): Promise<TrackDto> {
    const trackEntity = this.mapper.toEntity(track);
    return this.mapper.fromEntity(
      await this.repo.save(trackEntity, parseInfo(info).info.selectionSetList)
    );
  }

  @Mutation(() => Boolean)
  async trackDelete(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.delete(id);
  }

  @Mutation(() => TrackDto)
  async trackMintNft(
    @Args({ name: 'track', type: () => TrackDto }) track: TrackDto,
    @Info() info: any,
    @Context() context: any
  ): Promise<TrackDto> {
    const headers = context.req.headers;
    if (!headers['username']) {
      throw new LogosphereError('No username header specified in the request');
    }

    const userHeader = headers['username'];

    const user = await this.userRepo.findOneByUsername(userHeader, [
      'id',
      'username',
      'wallet',
      'wallet/id',
      'wallet/subjectId',
      'wallet/walletId',
      'wallet/assets',
      'wallet/assets/id',
      'wallet/assets/subjectId',
    ]);

    const trackEntity = this.mapper.toEntity(track);
    const savedTrack = await this.repo.save(trackEntity, [
      'id',
      'subjectId',
      'createdAt',
      'updatedAt',
    ]);

    const nft = {
      name: track.nftName,
      description: track.nftDescription,
      assetName: track.nftAssetName,
      standard: '721',
      mediaType: 'image/*',
      version: '1.0',
      thumbnailIpfsCid: `ipfs://${track.nftIpfsCid}`,
      files: [
        {
          name: track.nftName,
          mediaType: 'image/*',
          src: `ipfs://${track.nftIpfsCid}`,
        },
      ],
      logosphere: {
        ledgerId: process.env.FLUREE_LEDGER,
        subjectId: savedTrack.subjectId,
      },
    };

    const submittedNft = await this.mintService.mint(
      process.env.CARDANO_WALLET_ID,
      process.env.CARDANO_WALLET_MNEMONIC,
      nft
    );

    const updatedTrack = Track.create({
      ...savedTrack.props,
      nftCardanoTxId: submittedNft.txId,
    }).getValue();

    await this.repo.save(updatedTrack, [
      'id',
      'subjectId',
      'nftCardanoTxId',
      'createdAt',
      'updatedAt',
    ]);

    const asset = WalletAsset.create({
      name: nft.assetName,
      policyId: submittedNft.policyId,
      quantity: 1,
      metadata: JSON.stringify({ ...nft, entity: track }),
      assetSubjectId: savedTrack.subjectId,
      logosphereId: savedTrack.id,
    }).getValue();

    const updatedAssets = user.wallet.assets ? user.wallet.assets : [];

    updatedAssets.push(asset);

    const updatedWallet = Wallet.create({
      ...user.wallet.props,
      assets: updatedAssets,
    }).getValue();

    await this.walletRepo.save(updatedWallet);

    return this.mapper.fromEntity(
      await this.repo.findOneById(
        updatedTrack.id,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => String)
  async trackMintNftTx(
    @Args({ name: 'track', type: () => TrackDto }) track: TrackDto,
    @Info() info: any,
    @Context() context: any
  ): Promise<string> {
    const trackEntity = this.mapper.toEntity(track);
    const savedTrack = await this.repo.save(trackEntity, [
      'id',
      'subjectId',
      'createdAt',
      'updatedAt',
    ]);

    const headers = context.req.headers;
    if (!headers['username']) {
      throw new LogosphereError('No username header specified in the request');
    }

    const userHeader = headers['username'];

    const user = await this.userRepo.findOneByUsername(userHeader, [
      'id',
      'username',
      'wallet',
      'wallet/id',
      'wallet/subjectId',
      'wallet/walletId',
      'wallet/assets',
      'wallet/assets/id',
      'wallet/assets/subjectId',
    ]);

    if (!(user.wallet && user.wallet.walletId)) {
      throw new LogosphereError(`Wallet ID not found for user ${userHeader}`);
    }

    const nft = {
      name: track.nftName,
      description: track.nftDescription,
      assetName: track.nftAssetName,
      standard: '721',
      mediaType: 'image/*',
      version: '1.0',
      thumbnailIpfsCid: `ipfs://${track.nftIpfsCid}`,
      files: [
        {
          name: track.nftName,
          mediaType: 'image/*',
          src: `ipfs://${track.nftIpfsCid}`,
        },
      ],
      logosphere: {
        ledgerId: process.env.FLUREE_LEDGER,
        subjectId: savedTrack.subjectId,
      },
    };

    const tx = await this.mintService.buildTx(user.wallet.walletId, nft);

    const asset = WalletAsset.create({
      name: nft.assetName,
      policyId: tx.tokens[0].asset.policy_id,
      quantity: 1,
      metadata: JSON.stringify({ ...nft, entity: 'track' }),
      assetSubjectId: savedTrack.subjectId,
      logosphereId: savedTrack.id,
    }).getValue();

    const updatedAssets = user.wallet.assets ? user.wallet.assets : [];

    updatedAssets.push(asset);

    const updatedWallet = Wallet.create({
      ...user.wallet.props,
      assets: updatedAssets,
    }).getValue();

    await this.walletRepo.save(updatedWallet);

    console.log(`Tx: ${JSON.stringify(tx, null, 2)}`);

    const txReduced = tx_prepare_json(JSON.stringify(tx));

    return txReduced;
  }
}
