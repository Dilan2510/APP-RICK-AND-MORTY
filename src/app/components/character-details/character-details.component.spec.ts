import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { ApiServiceService } from '../../core/api-service.service';
import { CharacterDetailsComponent } from './character-details.component';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let service: ApiServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetailsComponent, RouterModule, HttpClientModule],
      providers: [
        ApiServiceService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1 } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('CharacterData', () => {
    const mockApi = {
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
    };
    spyOn(service, 'GetCharacterById').and.returnValue(of(mockApi));
    component.CharacterData();
    expect(component.dataSource).toContain(mockApi)
  });
});
