import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
        private route: ActivatedRoute
    ) {
        this.form = this.fb.group({
            password: ['', Validators.required],
            username: ['', Validators.required],
        });
        this.route.fragment.subscribe((fragment: string) => {
            let accessToken = new URLSearchParams(fragment).get('access_token');
            console.log(accessToken);
            if (accessToken != null) {
                this.logInByYandex(accessToken);
            }
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

    loginByYandex() {
        let url = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=a1c9e82a15234011888448a61f831d80&force_confirm=yes';
        window.location.href = url;
    }

    logInByYandex(accessToken) {
        this.authService.LogInByYandex(accessToken).subscribe(() => {
            this.router.navigate(['/home']);
        });
    }
}
