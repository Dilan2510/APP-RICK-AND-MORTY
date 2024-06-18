import { TestBed } from '@angular/core/testing';
import { ApiServiceService } from './api-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let mockApi = {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiServiceService],
    });
    service = TestBed.inject(ApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll', () => {
    const params = {
      page: 1,
      size: 10,
    };
    service.getAll(params).subscribe((res) => {
      expect(res.results.length).toBe(20);
      expect(res).toEqual(mockApi);
    });
    expect(service.getAll(params)).toBeDefined();
  });

  it('GetCharacterById', () => {
    const id: any = '1';
    service.GetCharacterById(id).subscribe((res) => {
      expect(res).toEqual(1);
    });
    expect(service.GetCharacterById(id)).toBeDefined();
  });
});
