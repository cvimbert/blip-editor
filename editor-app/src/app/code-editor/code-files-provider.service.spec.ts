import { TestBed, inject } from '@angular/core/testing';

import { CodeFilesProviderService } from './code-files-provider.service';

describe('CodeFilesProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeFilesProviderService]
    });
  });

  it('should be created', inject([CodeFilesProviderService], (service: CodeFilesProviderService) => {
    expect(service).toBeTruthy();
  }));
});
