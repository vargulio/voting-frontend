class Party {
    constructor(picture, name, slogan, id) {

        this.picture = picture;
        this.name = name;
        this.slogan = slogan;
        this.id = id;

    }

}

class PartyDetails extends Party {
    constructor(picture, name, slogan, id, leader, agitation) {

        super(picture, name, slogan, id);
        this.leader = leader;
        this.agitaion = agitation;

    }

}

class PartiesManager {

    parties = [];
    partyDetails = null;

    getAll = () => {
        let {sessionId} = JSON.parse(localStorage.getItem('loggedUser'));
        return makeAPICall(SERVER_URL + '/parties', {headers: {identity: sessionId}})
            .then(data => {
                return data.map(result => new Party(result.picture, result.name, result.slogan, result.id));
            })
            .catch(error => {
                console.log(error);
            })
    }

    search = (keyword) => {
        let {sessionId} = JSON.parse(localStorage.getItem('loggedUser'));
        return makeAPICall(
            SERVER_URL + '/parties-search',
            {
                headers: {
                    identity: sessionId,
                    partyName: keyword
                }
            }
        )
            .then(data => {
                return data.map(result => new Party(result.picture, result.name, result.slogan, result.id));
            })
            .catch(error => {
                console.log(error);
            })
    }

    vote = (id) => {
        let {sessionId} = JSON.parse(localStorage.getItem('loggedUser'));

        return makeAPICall(SERVER_URL + '/vote/' + id, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "identity": sessionId
            }
        })
    }

    getDetails = (id) => {
        let {sessionId} = JSON.parse(localStorage.getItem('loggedUser'));

        return makeAPICall(SERVER_URL + '/party/' + id, {
            headers: {
                "identity": sessionId
            }
        }).then(data => {
            this.partyDetails = new PartyDetails(data.picture, data.name, data.slogan, data.id, data.leader, data.agitaion);
            return this.partyDetails;
        })
    }


}