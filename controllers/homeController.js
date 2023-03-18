class HomeController {
    constructor(userManager, partiesManager) {
        this.userManager = userManager;
        this.partiesManager = partiesManager;
    }

    render = () => {
        let searchInput = getEl('searchParties');
        searchInput.addEventListener('input', debounce(this.searchForParties, 500));

        this.partiesManager.getAll()
            .then(parties => {
                this.renderParties(parties);
            })
            .catch(error => {
                alert(error.message);
            })

    }

    searchForParties = (event) => {

        const keyword = event.target.value;

        this.partiesManager.search(keyword)
            .then(data => {
                this.renderParties(data);
            })
            .catch(error => {
                alert("Could not search for parties!");
            })

    }

    renderParties = (list) => {
        const container = getEl('searchResults');
        container.innerHTML = '';

        const cardList = list.map(party => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '200px';

            card.innerHTML = `<img src="${party.picture}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${party.name}</h5>
                    <p class="card-text">${party.slogan}</p>
                    <button class="btn btn-primary details-btn">Details</button>
                    <button class="btn btn-primary vote-btn">Vote</button>

                </div>`


            const voteBtn = card.querySelector('.vote-btn');
            voteBtn.disabled = this.userManager.loggedUser.hasVoted;
            voteBtn.addEventListener('click', () => {
                this.partiesManager.vote(party.id)
                    .then(data => {
                        alert('Successful vote!');
                        const btns = document.getElementsByClassName('vote-btn')
                            Array.from(btns).forEach(voteBtn => {
                            this.userManager.loggedUser.hasVoted = true;
                            localStorage.setItem('loggedUser', JSON.stringify(this.userManager.loggedUser));
                            voteBtn.disabled = this.userManager.loggedUser.hasVoted;
                        })
                    })
                    .catch(err => {
                        alert(err.message);
                    })
            });

            const detailsBtn = card.querySelector('.details-btn');
            detailsBtn.addEventListener('click', () => {
                this.partiesManager.getDetails(party.id)
                    .then( data => {
                        location.hash = 'details';
                    })
                    .catch(err=> {
                        alert(err);
                    })
            })


            return card;
        });

        container.append(...cardList);


    }


}