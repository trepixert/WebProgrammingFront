import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from '../auth/auth.service';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService]
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));
});
