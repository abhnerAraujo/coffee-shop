import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayTime',
  standalone: true,
})
export class DisplayTimePipe implements PipeTransform {
  transform(value: number): string {
    return this.displayTime(value);
  }

  protected displayTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
