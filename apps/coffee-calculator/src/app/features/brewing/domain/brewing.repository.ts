import { Brewing } from '@domain/brewing';

export interface BrewingRepository {
  save(brewing: Brewing): Promise<void>;
  listBrewings(query?: { userId?: string }): Promise<Brewing[]>;
  update(brewing: Brewing): Promise<void>;
  getBrewing(id: string): Promise<Brewing | undefined>;
}
