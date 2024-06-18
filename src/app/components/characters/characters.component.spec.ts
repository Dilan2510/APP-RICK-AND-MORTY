import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { ApiServiceService } from '../../core/api-service.service';
import { CharactersComponent } from './characters.component';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let service: ApiServiceService;
  let fixture: ComponentFixture<CharactersComponent>;
  let mockApi: any = {
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character?page=3',
      prev: 'https://rickandmortyapi.com/api/character?page=1',
    },
    results: [
      {
        id: 21,
        name: 'Aqua Morty',
        status: 'unknown',
        species: 'Humanoid',
        type: 'Fish-Person',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CharactersComponent,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule,
      ],
      providers: [
        ApiServiceService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 123 } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieveTutorials', () => {
    spyOn(service, 'getAll').and.returnValue(of(mockApi));
    component.retrieveTutorials();
    fixture.detectChanges();
    expect(component.dataAPi).toBeDefined();
  });

  it('handlePageChange', () => {
    const event = 1;
    component.handlePageChange(event);
    expect(component.page).toEqual(event);
  });

  it('onSearch', () => {
    const event = 1;
    component.onSearch();
    expect(component.page).toEqual(event);
  });
});
