import { Injectable } from '@angular/core';
import { ListItemViewModel } from 'ngx-material-autocomplete-force-select/lib/models/list-item-view.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestFormService {
  private result: ListItemViewModel[] = [
    { id: 1, code: 'test', display: 'Test' },
    { id: 2, code: 'test2', display: 'Second test' },
    { id: 3, code: 'lorem', display: 'Lorem' },
    { id: 4, code: 'loremi', display: 'Lorem Ipsum' },
    { id: 5, code: 'loremit', display: 'Lorem Ipsum Test' },
    { id: 6, code: 'test', display: 'Test' },
    { id: 7, code: 'BE', display: 'Belgium' },
    { id: 8, code: 'BY', display: 'Belarus' },
    { id: 9, code: 'BM', display: 'Bermuda' },
  ];
  constructor() {}
  /**
   * apiAutocompletelistPartOfText
   */
  public apiAutocompletelistPartOfText(
    partOfText: string
  ): Observable<ListItemViewModel[]> {
    return of(
      this.result.filter((x) =>
        x.display
          ?.trim()
          .toLowerCase()
          .includes((partOfText || '').trim().toLowerCase())
      )
    );
  }
}
