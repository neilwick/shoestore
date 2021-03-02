import "../css/styles.css";

import layoutTemplate from "../hbs/layout.hbs";

import MenuController from "./pageController.js";

const app = document.getElementById("app");

let menu;

app.innerHTML = layoutTemplate({ "title": "Walking with the Fishes" });
let nav = app.querySelector("nav");
let main = app.querySelector("main");
let component = app.querySelector("#component");

let pagesPromise = fetch("api/pages.json").then(function (resp) {
    return resp.json();
});

let shoesPromise = fetch("api/shoes.json").then(function (resp) {
    return resp.json();
});

Promise.all([pagesPromise, shoesPromise]).then(result => {
    // console.log(result);
    menu = new MenuController(result[0], main, nav, component,
        {
            "shoes":
                { "data": result[1] }
        });
    render(result[1]);
    // console.log(menu.getMenu());
});

let render = function (shoes) {

    menu.initMenu();
    if (shoes !== null && shoes !== undefined && shoes.length !== undefined) {

        let mainEl = app.querySelector("main");
        nav.innerHTML = menu.getMenu();
        menu.initMenu(mainEl);
        mainEl.innerHTML = menu.getPage("home");

        let shoesEl = mainEl.querySelectorAll(".shoe");
        console.log("Shoes: ", shoesEl.length);

        for (let shoeEl of shoesEl) {
            shoeEl.addEventListener("click", function () {
                let sid = this.dataset.sid.split("-")[1];
                console.log(sid, shoes);

                let activeShoe = shoes.filter(shoe => shoe.id == sid);

                console.log(activeShoe[0]);
                document.getElementById("current-product").innerHTML = shoeTemplate(activeShoe[0]);
            });
        }
    }
}