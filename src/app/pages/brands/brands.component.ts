import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { BrandService } from 'src/app/services';
import { Brand } from '../../models';
import { BrandDialogComponent } from '../../dialogs/brand-dialog/brand-dialog.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'score', 'actions'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private brandService: BrandService,
              private snackbar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getAll().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.snackbar.open(`Could not load brands (${error.status}).`);
    });
  }

  onDelete(id: number) {
    this.brandService.delete(id).subscribe(
      response => {
        this.loadBrands();
      },
      error => {
        this.snackbar.open(error);
      });
  }

  openBrandDialog() {
    const dialogRef = this.dialog.open(BrandDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result['success'] == true) {
        this.loadBrands();
      } else {
        // Do nothing? This happens when the dialog is simply closed
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
