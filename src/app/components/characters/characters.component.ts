import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiServiceService } from '../../core/api-service.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    InfiniteScrollModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent {
  dataAPi: any[] = [];
  params = {} as any;
  page = 1;
  count = 0;
  pageSize = 10;

  constructor(private service: ApiServiceService) {}

  ngOnInit() {
    this.retrieveTutorials();
  }

  public getRequestParams(page: number, pageSize: number): any {
    if (page) {
      this.params[`page`] = page - 0;
    }
    if (pageSize) {
      this.params[`size`] = pageSize;
    }
    return this.params;
  }

  public retrieveTutorials(): void {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.service.getAll(params).subscribe((response) => {
      const { info, results } = response;
      this.dataAPi = results;
      this.count = info.count;
    });
  }

  public handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  public onSearch(): void {
    this.page = 1;
    this.retrieveTutorials();
  }
}
