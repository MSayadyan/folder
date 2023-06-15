window.addEventListener(`DOMContentLoaded`, () => {
    //tabs
    const tabs = document.querySelectorAll(`.tabheader__item`),
        tabsContent = document.querySelectorAll(`.tabcontent`),
        tabsParent = document.querySelector(`.tabheader__items`);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add(`hide`);
            item.classList.remove(`show`, `fade`);
        })
        tabs.forEach(tab => {
            tab.classList.remove(`tabheader__item_active`);
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add(`show`, `fade`);
        tabsContent[i].classList.remove(`hide`);
        tabs[i].classList.add(`tabheader__item_active`);

    }


    hideTabContent();
    showTabContent();

    tabsParent.addEventListener(`click`, (event) => {
        const target = event.target;

        if (target && target.classList.contains(`tabheader__item`)) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });


    //timer
    const deadline = new Date(`2023-06-11`);

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }


    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    };


    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        days = timer.querySelector(`#days`),
            hours = timer.querySelector(`#hours`),
            minutes = timer.querySelector(`#minutes`),
            seconds = timer.querySelector(`#seconds`),
            timeInterval = setInterval(updateClock, 1000)

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                days.innerHTML = `0`;
                hours.innerHTML = `0`;
                minutes.innerHTML = `0`;
                seconds.innerHTML = `0`;

                clearInterval(timeInterval);
            }
        }
    }

    setClock(`.timer`, deadline)

    const btnOpen = document.querySelectorAll(`.btn_open`),
        modal = document.querySelector(`.modal`);

    function closeModal() {
        modal.classList.add(`hide`);
        modal.classList.remove(`show`);

        document.body.style.overflow = ``;

    }

    function openModal() {
        modal.classList.add(`show`);
        modal.classList.remove(`hide`);
        document.body.style.overflow = `hidden`;
        clearInterval(modalTimerId)

    }
    btnOpen.forEach((item) => {
        item.addEventListener(`click`, () => {
            openModal();
        })
    })

    modal.addEventListener(`click`, (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    })

    document.addEventListener(`keydown`, (e) => {
        if (e.code === `Escape` && modal.classList.contains(`show`)) {
            closeModal();
        }

    })

    function showModalByScroll() {

        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight) {
            openModal();
            removeEventListener(`scroll`, showModalByScroll)
        }
    }

    const modalTimerId = setTimeout(openModal, 50000);

    window.addEventListener(`scroll`, showModalByScroll);










    const menuItem = document.querySelectorAll(`.menu__item`),
        container = document.querySelector(`#containerItem`);


    class SetMenuItem {
        constructor(parent, imgName, headerInnerText, divInnerText, total, ...classes) {
            this.imgName = imgName;
            this.headerInnerText = headerInnerText;
            this.divInnerText = divInnerText;
            this.parent = parent;
            this.total = total;
            this.classes = classes;
        }

        createNewElement() {

            const mainDiv = document.createElement(`div`),
                img = document.createElement(`img`),
                header = document.createElement(`h3`),
                divInnerText = document.createElement(`div`),
                divDivider = document.createElement(`div`),
                divPrice = document.createElement(`div`),
                divCost = document.createElement(`div`),
                divTotal = document.createElement(`div`),
                span = document.createElement(`span`);

            // mainDiv.classList.add(`menu__item`);
            if (this.classes.length === 0) {
                this.mainDiv = `menu__item`;
                mainDiv.classList.add(this.mainDiv)
            } else {
                this.classes.forEach(className => mainDiv.classList.add(className));
            }

            header.classList.add(`menu__item-subtitle`);
            divInnerText.classList.add(`menu__item-descr`);
            divDivider.classList.add(`menu__item-divider`);
            divPrice.classList.add(`menu__item-price`);
            divCost.classList.add(`menu__item-cost`);
            divTotal.classList.add(`menu__item-total`);



            img.src = this.imgName;
            img.alt = `photo`;
            header.innerHTML = this.headerInnerText;
            divInnerText.innerHTML = this.divInnerText;
            divTotal.innerText = ` грн/день`;
            divCost.innerText = `Цена:`;
            span.innerText = this.total;
            this.parent.append(mainDiv);
            mainDiv.prepend(img);
            mainDiv.append(header);
            mainDiv.append(divInnerText);
            mainDiv.append(divDivider);
            mainDiv.append(divPrice);
            divPrice.prepend(divCost);
            divPrice.append(divTotal);
            divTotal.prepend(span);


        }
    }

    let text = `Меню "Ленка" - это новый подход к приготовлению блюд: больше свежих
    овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
    ценой и высоким качеством`;

    const item = new SetMenuItem(
        container,
        `img/tabs/IMG_E4478.JPG`,
        `Меню "Ленчик"`,
        text,
        1000,
        `menu__item`,
        `big`);

    item.createNewElement();


    //отправка форм на сервер

    const forms = document.querySelectorAll(`form`);
    const message = {
        loading: `img/form/spinner.svg`,
        success: `Спасибо! Скоро мы с вами свяжемся`,
        fail: `Что-то пошло не так...`
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener(`submit`, (e) => {
            e.preventDefault();

            const statusMessage = document.createElement(`img`);
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display:block;
            margin: 0 auto`
            // form.append(statusMessage);
            form.insertAdjacentElement(`afterend`, statusMessage)

            const request = new XMLHttpRequest();
            request.open(`POST`, `php/server.php`);
            request.setRequestHeader(`Content-type`, `application/json`);

            const formData = new FormData(form);

            const obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            })

            const json = JSON.stringify(obj);

            request.send(json);

            request.addEventListener(`load`, () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();

                } else {
                    showThanksModal(message.fail);
                }
            })

        })
    }


    function showThanksModal(message) {
        const prevModal = document.querySelector(`.modal__dialog`);
        prevModal.classList.add(`hide`);
        openModal()

        const thanksModal = document.createElement(`div`);
        thanksModal.classList.add(`modal__dialog`);
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class = "modal__close" data-close>x</div>
            <div class="modal__title"> ${message} </div>
        </div>
        `;

        document.querySelector(`.modal`).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add(`show`);
            prevModal.classList.remove(`hide`);
            closeModal();
        }, 4000)

    }



})







