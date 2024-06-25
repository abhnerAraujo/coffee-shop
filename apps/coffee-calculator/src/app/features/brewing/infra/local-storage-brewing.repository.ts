import { Brewing, BrewingProps } from '@domain/brewing';
import { BrewingRepository } from '../domain';

export class LocalStorageBrewingRepository implements BrewingRepository {
  private readonly brewingKey: string;
  constructor() {
    this.brewingKey = 'brewing';
  }

  async save(brewing: Brewing): Promise<void> {
    const brewings = await this.listBrewings();

    brewings.push(brewing);
    localStorage.setItem(this.brewingKey, JSON.stringify(brewings));
  }

  async listBrewings(): Promise<Brewing[]> {
    const brewings = localStorage.getItem(this.brewingKey);

    if (!brewings) return Promise.resolve([]);
    return Promise.resolve(
      JSON.parse(brewings).map((brewing: { props: BrewingProps }) =>
        Brewing.restore(brewing.props)
      )
    );
  }

  async update(brewing: Brewing): Promise<void> {
    const brewings = await this.listBrewings();
    const index = brewings.findIndex(b => b.getId() === brewing.getId());

    brewings[index] = brewing;
    localStorage.setItem(this.brewingKey, JSON.stringify(brewings));
  }

  async getBrewing(id: string): Promise<Brewing | undefined> {
    const brewings = await this.listBrewings();

    return Promise.resolve(brewings.find(b => b.getId() === id));
  }
}
