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
import { WalletAsset } from '../entities';
import { WalletAssetFlureeRepository } from '../repositories/fluree';
import { LogosphereError } from '@logosphere/sdk';
import { parseInfo } from '@logosphere/fluree';
import { WalletAssetDto } from '../dto';
import { WalletAssetDtoMap } from '../mappers/dto';

@Resolver(() => WalletAsset)
export class WalletAssetResolver {
  constructor(
    private repo: WalletAssetFlureeRepository,
    private mapper: WalletAssetDtoMap
  ) {}

  @Query(() => [WalletAssetDto])
  async walletAssetFindAll(@Info() info: any): Promise<WalletAssetDto[]> {
    return (await this.repo.findAll(parseInfo(info).info.selectionSetList)).map(
      (walletAsset: WalletAsset) => this.mapper.fromEntity(walletAsset)
    );
  }

  @Query(() => [WalletAssetDto])
  async walletAssetFindManyById(
    @Args({ name: 'idList', type: () => ID }) idList: string[],
    @Info() info: any
  ): Promise<WalletAssetDto[]> {
    return (
      await this.repo.findManyById(
        idList,
        parseInfo(info).info.selectionSetList
      )
    ).map((walletAsset: WalletAsset) => this.mapper.fromEntity(walletAsset));
  }

  @Query(() => Boolean)
  async walletAssetExists(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.exists(id);
  }

  @Query(() => WalletAsset)
  async walletAssetFindOneById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Info() info: any
  ): Promise<WalletAssetDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneById(id, parseInfo(info).info.selectionSetList)
    );
  }

  @Query(() => WalletAsset)
  async walletAssetFindOneBySubjectId(
    @Args({ name: 'subjectId', type: () => String }) subjectId: string,
    @Info() info: any
  ): Promise<WalletAssetDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneBySubjectId(
        subjectId,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => WalletAssetDto)
  async walletAssetSave(
    @Args({ name: 'walletAsset', type: () => WalletAssetDto })
    walletAsset: WalletAssetDto,
    @Info() info: any
  ): Promise<WalletAssetDto> {
    const walletAssetEntity = this.mapper.toEntity(walletAsset);
    return this.mapper.fromEntity(
      await this.repo.save(
        walletAssetEntity,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => Boolean)
  async walletAssetDelete(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.delete(id);
  }
}
