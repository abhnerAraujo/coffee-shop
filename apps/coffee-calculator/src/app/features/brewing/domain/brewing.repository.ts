import { Brewing } from '@domain/brewing';

export interface BrewingRepository {
  save(brewing: Brewing): Promise<void>;
  listBrewings(): Promise<Brewing[]>;
  update(brewing: Brewing): Promise<void>;
  getBrewing(id: string): Promise<Brewing | undefined>;
}
