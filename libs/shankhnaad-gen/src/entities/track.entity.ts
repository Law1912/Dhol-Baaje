import { Guard, Entity, EntityProps, Result } from '@logosphere/sdk';
import { Genre } from '../shankhnaad.model';

interface TrackProps extends EntityProps {
  title?: string;
  subtitle?: string;
  username?: string;
  music?: string;
  image?: string;
  likes?: number;
  n_listens?: number;
  lyrics?: string;
  album?: Genre[];
  value?: number;
  nftIpfsCid?: string;
  nftCardanoTxId?: string;
  nftName?: string;
  nftDescription?: string;
  nftAssetName?: string;
}

export class Track extends Entity<TrackProps> {
  get title(): string {
    return this.props.title;
  }
  get subtitle(): string {
    return this.props.subtitle;
  }
  get username(): string {
    return this.props.username;
  }
  get music(): string {
    return this.props.music;
  }
  get image(): string {
    return this.props.image;
  }
  get likes(): number {
    return this.props.likes;
  }
  get n_listens(): number {
    return this.props.n_listens;
  }
  get lyrics(): string {
    return this.props.lyrics;
  }
  get album(): Genre[] {
    return this.props.album;
  }
  get value(): number {
    return this.props.value;
  }
  get nftIpfsCid(): string {
    return this.props.nftIpfsCid;
  }
  get nftCardanoTxId(): string {
    return this.props.nftCardanoTxId;
  }
  get nftName(): string {
    return this.props.nftName;
  }
  get nftDescription(): string {
    return this.props.nftDescription;
  }
  get nftAssetName(): string {
    return this.props.nftAssetName;
  }

  private constructor(props: TrackProps) {
    super(props);
  }

  public static create(props: TrackProps): Result<Track> {
    const propsResult = Guard.againstNullOrUndefinedBulk([]);

    if (!propsResult.succeeded) {
      return Result.fail<Track>(propsResult.message);
    }

    const track = new Track(props);

    return Result.ok<Track>(track);
  }
}
