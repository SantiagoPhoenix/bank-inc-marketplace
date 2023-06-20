import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  /**
   * Method that gets a local storage item
   * @param item -> Name to search the item
   * @returns item || undefined -> Return the local storage item or undefined if it doesn't exist
   */

  getLocalSorage(item: any): string | undefined {
        if (localStorage.getItem(item)) {
            item = localStorage.getItem(item);
            return item;
        } else {
            return undefined;
        }
    }

    /**
     * Set the a any object inside the local Storage
     * @param key -> Item name
     * @param value -> Item value
     */

    setLocalSorage(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    /**
     * Delete a local storage item
     * @param item -> Item name to delete
     */

    deleteLocalStorege(item: string): void {
        localStorage.removeItem(item);
    }

    /**
   * Method that monitors the input for the filter in any table
   * @param form -> Form with the formControl filter
   * @param nameForm -> formControl name
   * @returns Observable<string> -> observable about the filter
   */

  filterTable(form: FormGroup, nameForm: string): Observable<string>{
    return form.controls[nameForm].valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value: string) => {
        if (value.length >= 3) {
          return of(value)
        }
        return of('');
      })
    )
  }
}
