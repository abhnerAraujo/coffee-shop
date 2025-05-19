import { Injectable } from "@angular/core";
import { Brewing } from "@domain/brewing";

@Injectable({
  providedIn: 'root',
})
export class TimelineService {

  addTimelineItem(brewing: Brewing, item: [number, string]) {
    brewing.addTimelineItem(item);
  }

  deleteTimelineItem(brewing: Brewing, index: number) {
    brewing.deleteTimelineItem(index);
  }
}
