import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../core/api-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css',
})
export class CharacterDetailsComponent {
  public idPlaylist: any;
  public dataSource: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiServiceService
  ) {}

  ngOnInit() {
    this.idPlaylist = this.activatedRoute.snapshot.params['id'];
    this.CharacterData();
  }

  public CharacterData() {
    this.service.GetCharacterById(this.idPlaylist).subscribe({
      next: (res: any) => {
        this.dataSource.push(res);
      },
      error: (error: any) => {
        alert('Se ha produced un error' + error);
      },
    });
  }
}
