import { Brewing } from '@domain/brewing';
import { BrewingRepository } from '../domain';

export class MemoryBrewingRepository implements BrewingRepository {
  private brewings: Array<Brewing> = [];

  save(brewing: Brewing): Promise<void> {
    this.brewings.push(brewing);
    return Promise.resolve();
  }
  listBrewings(): Promise<Brewing[]> {
    return Promise.resolve([...this.brewings]);
  }
  update(brewing: Brewing): Promise<void> {
    const index = this.brewings.findIndex(b => b.getId() === brewing.getId());

    if (index >= 0) this.brewings[index] = brewing;
    return Promise.resolve();
  }
  getBrewing(id: string): Promise<Brewing | undefined> {
    return Promise.resolve(this.brewings.find(b => b.getId() === id));
  }
  delete(id: string): Promise<void> {
    const index = this.brewings.findIndex(b => b.getId() === id);
    if (index >= 0) this.brewings[index].setDeleted();
    return Promise.resolve();
  }
}
