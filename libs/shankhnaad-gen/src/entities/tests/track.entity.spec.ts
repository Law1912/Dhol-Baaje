import { Track } from '../track.entity';
import { Genre } from '../../shankhnaad.model';

describe('Track Entity', () => {
  let track: Track;
  beforeAll(() => {
    const result = Track.create({});
    track = result.getValue();
  });

  it('should be defined', () => {
    expect(track).toBeDefined();
  });

  it('should have valid id', () => {
    expect(track.id).toBeDefined();
    expect(track.id).toHaveLength(64);
    expect(track.id).toMatch(/[A-Fa-f0-9]{64}/);
  });

  it('should have valid createdAt', () => {
    expect(track.createdAt).toBeDefined();
    expect(track.createdAt instanceof Date).toBeTruthy();
  });

  it('should have valid updatedAt', () => {
    expect(track.updatedAt).toBeDefined();
    expect(track.updatedAt instanceof Date).toBeTruthy();
  });
});
