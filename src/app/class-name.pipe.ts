import { Pipe, PipeTransform } from '@angular/core';
/*
 * Format the className into the css class name
 * Usage:
 *   value | className
 * Example:
 *   {{ death knight | className }}
 *   formats to: death-knight
*/
@Pipe({name: 'className'})
export class ClassNamePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/ /g,"-");
  }
}