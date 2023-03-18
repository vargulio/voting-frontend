class LoginController {

    constructor(userManager) {
        this.userManager = userManager;
    }

    render = () => {

        let form = getEl('loginForm');

        form.oninput = this.validateForm;
        form.onsubmit = this.makeLoginRequest;
    }

    makeLoginRequest = (event) => {
        event.preventDefault();
        let {username: {value: username}, password: {value: password}} = event.currentTarget.elements

        this.userManager.login(username, password)
            .then(data => {
                location.hash = 'home';
                loginError.style.visibility = 'hidden';

            })
            .catch(err => {
                let loginError = getEl('loginError');

               loginError.innerText = err.message;
               loginError.style.visibility = 'visible';
            })


    }

    validateForm = (event) => {

        let submitLogin = getEl('submitLogin');
        let loginError = getEl('loginError');

        let {username: {value: username}, password: {value: password}} = event.currentTarget.elements
        let passValid = STRONG_PASS_REGEX.test(password);

        if (!username && !password) {
            return;
        }

        if (!username || !password) {
            loginError.innerText = 'You must fill in all the fields!';
            loginError.style.visibility = 'visible';
        } else if (!passValid) {
            loginError.innerText = 'Your password must be at least 6 chars long with an uppercase, a lowercase and a special symbol included.';
            loginError.style.visibility = 'visible';
        } else {
            loginError.style.visibility = 'hidden';
        }


        if(!username || !password || !passValid) {
            submitLogin.disabled = true;
        } else  {
            submitLogin.disabled = false;
        }
    }
}