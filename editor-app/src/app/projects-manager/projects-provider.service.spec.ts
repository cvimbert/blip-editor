import { TestBed, inject } from '@angular/core/testing';

import { ProjectsProviderService } from './projects-provider.service';

describe('ProjectsProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsProviderService]
    });
  });

  it('should be created', inject([ProjectsProviderService], (service: ProjectsProviderService) => {
    expect(service).toBeTruthy();
  }));
});
