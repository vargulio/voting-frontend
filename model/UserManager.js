class UserManager {

    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    login(username, password) {
        return makeAPICall(SERVER_URL + '/login', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(data => {
            this.loggedUser = data;
            localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser))
            return data;
        })
    }


    logout() {
        return makeAPICall(SERVER_URL + '/logout', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
               id: this.loggedUser.sessionId
            })
        }).then(data => {
            localStorage.removeItem('loggedUser');
            this.loggedUser = null;
            return data;
        })
    }

    register(username, password) {
        return makeAPICall(SERVER_URL + '/users', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
    }
}