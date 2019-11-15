import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {
        this.form = this.fb.group({
            password: ['', Validators.required],
            username: ['', Validators.required],
        });
    }

    signUp() {
        const val = this.form.value;

        if (val.password && val.username) {
            this.authService.signUp(val.username, val.password)
                .subscribe(
                    (value) => {
                        if (value.statusText === 'Saved') {
                            this.router.navigateByUrl('/login');
                        } else {
                            alert('Ошибка!');
                        }
                    }
                );
        }
    }
}
