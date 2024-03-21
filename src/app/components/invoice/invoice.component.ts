import { Component } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id: Observable<string> = this.activatedRoute.params.pipe(map((p) => p['id']));
    let v;
    id.subscribe( perametro  => v = perametro )

    console.log(v);
    

    
    
    
  }
}
