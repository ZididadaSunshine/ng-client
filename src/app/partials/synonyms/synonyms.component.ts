import { Component, OnInit, Input } from '@angular/core';
import { BrandService } from '../../services';
import { Synonym } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.css']
})
export class SynonymsComponent implements OnInit {

  @Input()
  brandId: number

  @Input()
  maxWidth: string

  synonyms$: Observable<Synonym[]>

  constructor(
    private brandService: BrandService
  ) { }

  ngOnInit() {
    if (this.brandId == null) throw new Error("Attribute 'brandId' is required");
    this.synonyms$ = this.brandService.getSynonyms(this.brandId);
  }

  update() {
  }

  fetchSynonyms() {
    
  }

  onDelete(synonym: Synonym) {
    this.brandService.deleteSynonym(this.brandId, synonym.synonym).subscribe(
      () => (this.synonyms$ = this.brandService.getSynonyms(this.brandId)),
      error => console.log(error)
    ).unsubscribe();
  }

}
