import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { search } from '../../store/search/search.actions'; 
import { AppState } from '../../app.state';
import { selectResults } from '../../store/search/search.selectors';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  keyword = input<string>('');  
  hasSearched = input<boolean>(); 
  isSearch =signal<boolean>(false); 
  keywordChange = output<string>();
  items = signal<NominatimPlace[]>([]);
  results = this.store.selectSignal(selectResults);
  searchControl = new FormControl('');
  
  constructor(private router: Router,private store:Store<AppState>) {
    effect(() => {
if(!this.isSearch())return;
      if(this.hasSearched()===false){
       
  const results = this.results();
 
    this.items.set(results);
const value = this.searchControl.value ?? '';
 this.keywordChange.emit(value);
      }else{
    
this.searchControl.setValue(this.keyword(), {
  emitEvent: false
});
      }  

    
  
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
          console.log('INPUT VALUE:', value);
        if (value?.trim()) {
          this.isSearch.set(true);
           console.log('DISPATCH search:', value);
          this.store.dispatch(search({ query: value }));
        } else {
           console.log('DISPATCH search: empty');
          this.store.dispatch(search({ query: '' }));
        }
       
      });
  }

  findByPick(item: NominatimPlace) {
  console.log('Picked item:', item);

  
  this.items.set([]);


  this.searchControl.setValue(item.name, {
    emitEvent: false 
  });



}


  onSubmit() {
    const value = this.searchControl.value ?? '';
     console.log("value home",value)
    this.router.navigate(['/find'], {
      queryParams: {
        keyword: value
      }
    });
  }

 
}

