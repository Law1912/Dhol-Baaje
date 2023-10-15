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
import { Wallet } from '../entities';
import { WalletFlureeRepository } from '../repositories/fluree';
import { LogosphereError } from '@logosphere/sdk';
import { parseInfo } from '@logosphere/fluree';
import { WalletDto } from '../dto';
import { WalletDtoMap } from '../mappers/dto';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(
    private repo: WalletFlureeRepository,
    private mapper: WalletDtoMap
  ) {}

  @Query(() => [WalletDto])
  async walletFindAll(@Info() info: any): Promise<WalletDto[]> {
    return (await this.repo.findAll(parseInfo(info).info.selectionSetList)).map(
      (wallet: Wallet) => this.mapper.fromEntity(wallet)
    );
  }

  @Query(() => [WalletDto])
  async walletFindManyById(
    @Args({ name: 'idList', type: () => ID }) idList: string[],
    @Info() info: any
  ): Promise<WalletDto[]> {
    return (
      await this.repo.findManyById(
        idList,
        parseInfo(info).info.selectionSetList
      )
    ).map((wallet: Wallet) => this.mapper.fromEntity(wallet));
  }

  @Query(() => Boolean)
  async walletExists(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.exists(id);
  }

  @Query(() => Wallet)
  async walletFindOneById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Info() info: any
  ): Promise<WalletDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneById(id, parseInfo(info).info.selectionSetList)
    );
  }

  @Query(() => Wallet)
  async walletFindOneBySubjectId(
    @Args({ name: 'subjectId', type: () => String }) subjectId: string,
    @Info() info: any
  ): Promise<WalletDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneBySubjectId(
        subjectId,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Query(() => WalletDto)
  async walletFindOneByWalletId(
    @Args({ name: 'walletId', type: () => String }) walletId: string,
    @Info() info: any
  ): Promise<WalletDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneByWalletId(
        walletId,
        parseInfo(info).info.selectionSetList
      )
    );
  }
  @Query(() => WalletDto)
  async walletFindOneByAddress(
    @Args({ name: 'address', type: () => String }) address: string,
    @Info() info: any
  ): Promise<WalletDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneByAddress(
        address,
        parseInfo(info).info.selectionSetList
      )
    );
  }
  @Query(() => WalletDto)
  async walletFindOneByPublicKey(
    @Args({ name: 'publicKey', type: () => String }) publicKey: string,
    @Info() info: any
  ): Promise<WalletDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneByPublicKey(
        publicKey,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => WalletDto)
  async walletSave(
    @Args({ name: 'wallet', type: () => WalletDto }) wallet: WalletDto,
    @Info() info: any
  ): Promise<WalletDto> {
    const walletEntity = this.mapper.toEntity(wallet);
    return this.mapper.fromEntity(
      await this.repo.save(walletEntity, parseInfo(info).info.selectionSetList)
    );
  }

  @Mutation(() => Boolean)
  async walletDelete(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.delete(id);
  }
}
