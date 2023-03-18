(function () {

    let router = new Router();
    let userManager = new UserManager();
    let partiesManager = new PartiesManager();

    let loginController = new LoginController(userManager);
    let registerController = new RegisterController(userManager);
    let homeController = new HomeController(userManager, partiesManager);
    let detailsController = new DetailsController();

    window.addEventListener('load', router.handleHashChange);
    window.addEventListener('load', render);
    window.addEventListener('hashchange', router.handleHashChange);
    window.addEventListener('hashchange', render);

    function render() {
        let hash = location.hash.slice(1) || PAGE_IDS[0];
        switch (hash) {
            case 'login':
                loginController.render();
                break;
            case 'register':
                registerController.render();
                break;
            case 'home':
                if (userManager.loggedUser) {
                    homeController.render();
                } else {
                    location.hash = 'login';
                }
                break;
            case 'details':
                if (userManager.loggedUser) {
                    detailsController.render();
                } else {
                    location.hash = 'login';
                }
                break;
        }
    }

})();

