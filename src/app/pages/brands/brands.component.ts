import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { BrandService } from 'src/app/services';
import { Brand } from '../../models';
import { BrandDialogComponent } from '../../dialogs/brand-dialog/brand-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  displayedColumns: string[];
  handsetColumns: string[] = ['name'];
  desktopColumns: string[] = ['name', 'score', 'actions'];

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private brandService: BrandService,
              private snackbar: MatSnackBar,
              private dialog: MatDialog,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.loadBrands();
    // Hide / display columns depending on observed breakpoint
    this.breakpointObserver.observe(Breakpoints.Handset)
      .subscribe((({ matches }) => this.displayedColumns = matches === true ? this.handsetColumns : this.desktopColumns));
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

  onEdit(brand: Brand) {
    this.openBrandDialog(brand);
  }

  openBrandDialog(brand?: Brand) {
    const dialogRef = this.dialog.open(BrandDialogComponent, {
      width: '250px',
      data: brand
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
