import menuView from "../hbs/menuView.hbs";
import pageView from "../hbs/pageView.hbs";
import shoesTemplate from "../hbs/shoes.hbs";
import shoeTemplate from "../hbs/shoe.hbs";

export default class {

    constructor(pages, mainEl, navEl, componentEl, componentData) {
        this.mainContainer = mainEl;
        this.pages = pages;
        this.currentPage = "home";
        this.navContainer = navEl;
        this.componentData = componentData;
        this.componentContainer = componentEl;

        this.navContainer.innerHTML = this.getMenu();
    }

    setCurrentPage(newPage) {
        this.currentPage = newPage;

        let menuItems = this.navContainer.querySelectorAll("li");

        for (let li of menuItems) {
            if (li.dataset.page == newPage) {
                li.classList.add("active-page");
            } else {
                li.classList.remove("active-page");
            }
        }

        this.mainContainer.innerHTML = this.getPage();
        let component = this.pages[this.currentPage].component;
        if (component !== undefined) {

            if (component === "shoes") {
                if (this.componentData["shoes"] !== undefined &&
                    this.componentData["shoes"].data !== undefined) {
                    let shoeData = this.componentData["shoes"].data;
                    // console.log(shoeData);
                    this.componentContainer.innerHTML = shoesTemplate(shoeData);
                }
            }
        } else {
            this.componentContainer.innerHTML = "";
        }

        let links = this.mainContainer.querySelectorAll('.site-link');

        for (let el of links) {
            el.onclick = () => {
                this.setCurrentPage(el.dataset.link);
            }
        }
    }

    getMenu() {

        for (let page of Object.keys(this.pages)) {
            this.pages[page].isActive = page == this.currentPage ? true : false;
        }

        //console.log(this.pages);
        return menuView({ "page": this.currentPage, "pages": this.pages });
    }

    initMenu() {
        let links = this.navContainer.querySelectorAll("li");
        for (let link of links) {
            let me = this;
            link.onclick = function () {
                //console.log(this.dataset.page);
                me.setCurrentPage(this.dataset.page);
            };
        }
        this.setCurrentPage("home");
    }

    getPage() {
        return pageView(this.pages[this.currentPage]);
    }
}