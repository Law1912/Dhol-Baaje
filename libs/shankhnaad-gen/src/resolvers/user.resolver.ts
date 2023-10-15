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
import { User } from '../entities';
import { UserFlureeRepository } from '../repositories/fluree';
import { LogosphereError } from '@logosphere/sdk';
import { parseInfo } from '@logosphere/fluree';
import { UserDto } from '../dto';
import { UserDtoMap } from '../mappers/dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private repo: UserFlureeRepository, private mapper: UserDtoMap) {}

  @Query(() => [UserDto])
  async userFindAll(@Info() info: any): Promise<UserDto[]> {
    return (await this.repo.findAll(parseInfo(info).info.selectionSetList)).map(
      (user: User) => this.mapper.fromEntity(user)
    );
  }

  @Query(() => [UserDto])
  async userFindManyById(
    @Args({ name: 'idList', type: () => ID }) idList: string[],
    @Info() info: any
  ): Promise<UserDto[]> {
    return (
      await this.repo.findManyById(
        idList,
        parseInfo(info).info.selectionSetList
      )
    ).map((user: User) => this.mapper.fromEntity(user));
  }

  @Query(() => Boolean)
  async userExists(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.exists(id);
  }

  @Query(() => User)
  async userFindOneById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Info() info: any
  ): Promise<UserDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneById(id, parseInfo(info).info.selectionSetList)
    );
  }

  @Query(() => User)
  async userFindOneBySubjectId(
    @Args({ name: 'subjectId', type: () => String }) subjectId: string,
    @Info() info: any
  ): Promise<UserDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneBySubjectId(
        subjectId,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Query(() => UserDto)
  async userFindOneByUsername(
    @Args({ name: 'username', type: () => String }) username: string,
    @Info() info: any
  ): Promise<UserDto> {
    return this.mapper.fromEntity(
      await this.repo.findOneByUsername(
        username,
        parseInfo(info).info.selectionSetList
      )
    );
  }

  @Mutation(() => UserDto)
  async userSave(
    @Args({ name: 'user', type: () => UserDto }) user: UserDto,
    @Info() info: any
  ): Promise<UserDto> {
    const userEntity = this.mapper.toEntity(user);
    return this.mapper.fromEntity(
      await this.repo.save(userEntity, parseInfo(info).info.selectionSetList)
    );
  }

  @Mutation(() => Boolean)
  async userDelete(
    @Args({ name: 'id', type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.repo.delete(id);
  }
}
