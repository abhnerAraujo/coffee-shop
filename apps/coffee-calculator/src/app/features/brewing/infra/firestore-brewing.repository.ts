import { inject } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Brewing } from '@domain/brewing';
import { BrewingRepository } from '../domain';

export class FirestoreBrewingRepository implements BrewingRepository {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, 'brewings');

  save(brewing: Brewing): Promise<void> {
    try {
      const newDoc = doc(this.collection, brewing.getId());

      return setDoc(newDoc, this.brewingToFirestore(brewing));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async listBrewings(filters?: { userId?: string }): Promise<Brewing[]> {
    if (!filters)
      return getDocs(this.collection).then(snapshot =>
        snapshot.docs.map(this.firestoreToBrewing)
      );
    const q = query(this.collection, where('author.id', '==', filters.userId));

    return getDocs(q).then(snapshot =>
      snapshot.docs.map(this.firestoreToBrewing)
    );
  }

  async update(brewing: Brewing): Promise<void> {
    return this.save(brewing);
  }

  async getBrewing(id: string): Promise<Brewing | undefined> {
    return getDoc(doc(this.collection, id))
      .then(doc => this.firestoreToBrewing(doc))
      .catch(() => undefined);
  }

  private brewingToFirestore(brewing: Brewing) {
    const plain = brewing.toJson();

    return {
      ...plain,
      preparation: plain.steps[0],
      steps: plain.steps[1],
      tips: plain.steps[2],
      createdAt: plain.createdAt.toISOString(),
      updatedAt: plain.updatedAt.toISOString(),
      deletedAt: plain.deletedAt ? plain.deletedAt.toISOString() : undefined,
      timeline: plain.timeline.reduce((acc, item) => {
        acc[item[0]] = item[1];
        return acc;
      }, {} as Record<number, string>),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private firestoreToBrewing(doc: any): Brewing {
    const data = doc.data();

    return Brewing.restore({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      deletedAt: data.deletedAt ? new Date(data.deletedAt) : undefined,
      steps: [data.preparation, data.steps, data.tips],
      timeline: data.timeline
        ? Object.entries(data.timeline).map(([key, value]) => [
            Number(key),
            value,
          ])
        : [],
    });
  }

  async delete(id: string): Promise<void> {
    return deleteDoc(doc(this.collection, id));
  }
}
