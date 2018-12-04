import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BrandService } from '../../services';
import { Synonym } from '../../models';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { HttpErrorPipe } from '../../pipes/http-error/http-error.pipe';
import { CapitalizePipe, TranslatePipe } from '../../pipes';

@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.css']
})
export class SynonymsComponent implements OnInit {

  @Input()
  brandId: number;

  @Input()
  maxWidth: string;

  dataSource: MatTableDataSource<Synonym>;
  displayedColumns: string[] = ['synonym', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  synonymfield: string;

  constructor(
    private brandService: BrandService,
    private snackbar: MatSnackBar,
    private httperror: HttpErrorPipe,
    private capitalize: CapitalizePipe,
    private translate: TranslatePipe
  ) { }

  ngOnInit() {
    if (this.brandId == null) throw new Error("Attribute 'brandId' is required");
    this.loadSynonyms();
  }

  loadSynonyms() {
    this.brandService.getSynonyms(this.brandId).subscribe(
      synonyms => {
        this.dataSource = new MatTableDataSource(synonyms);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.snackbar.open(
          this.httperror.transform(error)
        )
      }
    )
  }

  onDelete(synonym: Synonym) {
    this.brandService.deleteSynonym(this.brandId, synonym.synonym).subscribe(
      () => {
        this.paginator.firstPage();
        this.loadSynonyms();
        this.snackbar.open(
          this.capitalize.transform(
            this.translate.transform('Synonym %s deleted', [synonym.synonym])
          )
        );
      },
      error => this.snackbar.open(
        this.httperror.transform(error)
      )
    );
  }

  onAdd() {
    const synonym = new Synonym();
    synonym.synonym = this.synonymfield;

    this.brandService.createSynonym(this.brandId, synonym).subscribe(
      () => {
        this.paginator.lastPage();
        this.loadSynonyms();
        this.snackbar.open(
          this.capitalize.transform(
            this.translate.transform('Synonym %s added', [synonym.synonym])
          )
        )
        this.synonymfield = '';
      },
      error => this.snackbar.open(
        this.httperror.transform(error)
      )
    );
  }

}
