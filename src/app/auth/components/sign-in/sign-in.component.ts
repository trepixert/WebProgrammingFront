import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {
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

    signIn() {
        const val = this.form.value;

        if (val.password && val.username) {
            this.authService.signIn(val.username, val.password)
                .subscribe(
                    () => {
                        this.router.navigateByUrl('/home');
                    }
                );
        }
    }
}
