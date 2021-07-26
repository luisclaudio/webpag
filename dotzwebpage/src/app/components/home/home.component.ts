import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public displayedColumns: string[] = [
    'code',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
