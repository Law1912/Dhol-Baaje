/* eslint-disable @typescript-eslint/no-empty-interface */
import { Injectable } from '@nestjs/common';
import {
  compile,
  ref,
  select,
  selectOne,
  create,
  update,
  remove,
  FlureeSingleObject,
  FlureeClient,
  gqlSelectionSetToFql,
  processUpdateTransactSpec,
  reconcileArrays,
} from '@logosphere/fluree';
import { copySubjectId, RepositoryError } from '@logosphere/sdk';

import { Track } from '../../entities';
import { TrackFlureeMap } from '../../mappers/fluree';
import { ITrackRepository } from '../interfaces';

@Injectable()
export class TrackFlureeRepository implements ITrackRepository {
  constructor(private fluree: FlureeClient, private mapper: TrackFlureeMap) {}

  public async exists(id: string): Promise<boolean> {
    const query = selectOne('track/identifier')
      .where(`track/identifier = '${id}'`)
      .build();
    const fql = compile(query);
    const result = await this.fluree.query(fql);
    return !!result && result['track/identifier'] === id;
  }

  public async delete(id: string): Promise<boolean> {
    const existing = await this.findOneById(id);
    if (existing) {
      const transact = remove().id(+existing.subjectId).build();
      const response = await this.fluree.transact(transact);
      return response.status === 200;
    } else {
      return false;
    }
  }

  public async findAll(selectionSetList?: string[]): Promise<Track[]> {
    const select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const fql = {
      select,
      from: 'track',
    };
    const result = await this.fluree.query(fql);
    return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
  }

  public async findManyById(
    idList: string[],
    selectionSetList?: string[]
  ): Promise<Track[]> {
    if (!idList || idList.length === 0) {
      throw new RepositoryError('Empty array of ids for findManyById method');
    }

    let spec;
    if (idList.length > 0) {
      spec = select('*').where(`track/identifier = '${idList[0]}'`);
      if (idList.length > 1) {
        idList.shift();
        idList.map((id: string) => {
          spec = spec.or(`track/identifier = '${id}'`);
        });
      }
    }
    const fql = compile(spec.build());
    fql.select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
  }

  public async findOneById(
    id: string,
    selectionSetList?: string[]
  ): Promise<Track> {
    const spec = selectOne('*').where(`track/identifier = '${id}'`).build();
    const fql = compile(spec);
    fql.selectOne = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    if (result) {
      return this.mapper.toEntity(result);
    } else {
      return null;
    }
  }

  public async findOneBySubjectId(
    subjectId: string,
    selectionSetList?: string[]
  ): Promise<Track> {
    const spec = selectOne('*').from(+subjectId).build();
    const fql = compile(spec);
    fql.selectOne = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    if (result) {
      return this.mapper.toEntity(result);
    } else {
      return null;
    }
  }

  public async save(track: Track, selectionSetList?: string[]): Promise<Track> {
    let spec;
    const data = this.mapper.fromEntity(track);
    const existing = await this.findOneById(track.id, selectionSetList);
    if (existing) {
      const existingData = this.mapper.fromEntity(existing);
      const resolvedData = copySubjectId(
        existingData,
        data,
        'identifier',
        '_id'
      );

      const updateTransact = [];
      const createTransact = [];

      processUpdateTransactSpec(
        update('track').data(resolvedData).build(),
        updateTransact,
        createTransact
      );

      if (createTransact.length > 0) {
        const response = await this.fluree.transact(createTransact);

        if (response.status === 200) {
          console.log(
            'Dependent create transaction has completed successfully'
          );
        } else {
          console.log('Dependent create transaction failed');
          console.log(JSON.stringify(createTransact, null, 2));
        }
      }

      const existingSpec = [];
      processUpdateTransactSpec(
        update('track').data(existingData).build(),
        existingSpec
      );
      spec = reconcileArrays(updateTransact, existingSpec);
    } else {
      data._id = `track$${track.id}`;
      spec = create('track').data(data).build();
    }

    const response = await this.fluree.transact(
      JSON.parse(JSON.stringify(spec))
    );
    if (response.status === 200) {
      return await this.findOneById(track.id, selectionSetList);
    } else {
      console.log('Transaction failed');
      console.log(JSON.stringify(spec, null, 2));
      return null;
    }
  }

  public async findAllByNftIpfsCid(
    nftIpfsCid: string,
    selectionSetList?: string[]
  ): Promise<Track[]> {
    const query = select('*')
      .where(`track/nftIpfsCid = '${nftIpfsCid}'`)
      .build();
    const fql = compile(query);
    fql.select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    if (result && result.length > 0) {
      return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
    } else {
      return null;
    }
  }
  public async findAllByNftCardanoTxId(
    nftCardanoTxId: string,
    selectionSetList?: string[]
  ): Promise<Track[]> {
    const query = select('*')
      .where(`track/nftCardanoTxId = '${nftCardanoTxId}'`)
      .build();
    const fql = compile(query);
    fql.select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    if (result && result.length > 0) {
      return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
    } else {
      return null;
    }
  }
  public async findAllByNftName(
    nftName: string,
    selectionSetList?: string[]
  ): Promise<Track[]> {
    const query = select('*').where(`track/nftName = '${nftName}'`).build();
    const fql = compile(query);
    fql.select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    if (result && result.length > 0) {
      return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
    } else {
      return null;
    }
  }
  public async findAllByNftDescription(
    nftDescription: string,
    selectionSetList?: string[]
  ): Promise<Track[]> {
    const query = select('*')
      .where(`track/nftDescription = '${nftDescription}'`)
      .build();
    const fql = compile(query);
    fql.select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    if (result && result.length > 0) {
      return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
    } else {
      return null;
    }
  }
  public async findAllByNftAssetName(
    nftAssetName: string,
    selectionSetList?: string[]
  ): Promise<Track[]> {
    const query = select('*')
      .where(`track/nftAssetName = '${nftAssetName}'`)
      .build();
    const fql = compile(query);
    fql.select = selectionSetList
      ? gqlSelectionSetToFql(selectionSetList)
      : ['*'];
    const result = await this.fluree.query(fql);
    if (result && result.length > 0) {
      return result.map((f: FlureeSingleObject) => this.mapper.toEntity(f));
    } else {
      return null;
    }
  }
}
