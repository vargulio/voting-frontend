class Router {

    handleHashChange = () => {
        let hash = location.hash.slice(1) || PAGE_IDS[0];

        PAGE_IDS.forEach(pageId => {
            let element = document.getElementById(pageId);
            element.style.display = pageId === hash ? 'block' : 'none';
        })
    }
}