import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brand_data = [
    {title: 'Apple', score: Math.random()},
    {title: 'Nike', score: Math.random()},
    {title: 'Facebook', score: Math.random()},
    {title: 'Twitter', score: Math.random()},
    {title: 'Reddit', score: Math.random()}
  ];

  displayedColumns: string[] = ['title', 'score'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.brand_data)

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
