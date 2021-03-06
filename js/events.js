function attachEvents(selector, callback) {
    document.querySelectorAll(selector).forEach(value => callback(value));

    const observer = new MutationObserver(function (mutations) {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLElement) {
                    node.querySelectorAll(selector).forEach(value => callback(value));
                }
            }
        }
    });

    observer.observe(document.body, { subtree: true, childList: true });
}

function attachLinkEvents() {
    attachEvents("[data-link]", function (el) {
        el.addEventListener("click", function () {
            navigateTo(el.dataset.link);
        });
    });
}

function attachMenuEvents() {
    attachEvents(".menu-container", function (container) {
        const trigger = container.querySelector("[data-menu]");
        const menu = document.getElementById(trigger.dataset.menu);
        const width = trigger.getBoundingClientRect().width;
        const content = menu.querySelector(".menu-content");

        if (content) {
            content.style.minWidth = width + "px";
        }

        container.addEventListener("mouseenter", function () {
            menu.classList.add("enter");
            menu.classList.remove("leave");
        });
        container.addEventListener("mouseleave", function () {
            menu.classList.remove("enter");
            menu.classList.add("leave");
        });

        menu.addEventListener("animationend", function () {
            menu.classList.remove("leave");
        });
    });
}

function attachBurgerMenuEvents() {
    function show(el) {
        el.classList.add("enter");
        el.classList.remove("leave");
    }

    function hide(el) {
        if (el.classList.contains("enter")) {
            el.classList.remove("enter");
            el.classList.add("leave");
        }
    }

    attachEvents("[data-burger-menu]", function (trigger) {
        const template = document.getElementById(trigger.dataset.burgerMenu);
        const container = document.getElementById("burger-menu-container");
        const content = container.querySelector(".burger-menu-portal");
        const close = container.querySelector(".burger-close");

        trigger.addEventListener("click", function () {
            show(container);
            content.innerHTML = "";
            const menu = template.content.cloneNode(true);
            content.appendChild(menu);
        });

        container.addEventListener("click", function (ev) {
            if (ev.target === container) {
                hide(container);
            }
        });

        container.addEventListener("animationend", function () {
            container.classList.remove("leave");
        });

        close.addEventListener("click", function () {
            hide(container);
        });

        window.addEventListener("navigate", function () {
            hide(container);
        });
    });
}

attachLinkEvents();
attachMenuEvents();
attachBurgerMenuEvents();
