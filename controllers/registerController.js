class RegisterController {

    constructor(userManager) {
        this.userManager = userManager;
    }

    render = () => {

        let form = getEl('registerForm');

        form.oninput = this.validateForm;
        form.onsubmit = this.makeRegisterRequest;
    }

    makeRegisterRequest = (event) => {
        event.preventDefault();
        let {username: {value: username}, password: {value: password}, confirmPass: {value: confirmPass}} = event.currentTarget.elements

        this.userManager.register(username, password)
            .then(data => {
                console.log(data);
                registerError.style.visibility = 'hidden';

            })
            .catch(err => {
                let registerError = getEl('registerError');

                registerError.innerText = err.message;
                registerError.style.visibility = 'visible';
            })


    }

    validateForm = (event) => {

        let submitLogin = getEl('submitRegister');
        let registerError = getEl('registerError');

        let {username: {value: username}, password: {value: password}, confirmPass: {value: confirmPass}} = event.currentTarget.elements
        let passValid = STRONG_PASS_REGEX.test(password);
        let passMatch = password === confirmPass;

        if (!username && !password && !confirmPass) {
            return;
        }

        if (!username || !password || !confirmPass) {
            registerError.innerText = 'You must fill in all the fields!';
            registerError.style.visibility = 'visible';
        } else if (!passValid) {
            registerError.innerText = 'Your password must be at least 6 chars long with an uppercase, a lowercase and a special symbol included.';
            registerError.style.visibility = 'visible';
        } else if (!passMatch){
            registerError.innerText = "Passwords don't match";
            registerError.style.visibility = 'visible';
        }
        else {
            registerError.style.visibility = 'hidden';
        }


        if(!username || !password || !passValid || !passMatch) {
            submitLogin.disabled = true;
        } else  {
            submitLogin.disabled = false;
        }
    }
}