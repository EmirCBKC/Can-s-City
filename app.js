//! PC GAMES => PC Page
fetch("/games.json")
    .then(res => res.json())
    .then(data => {
        let onlyPc = data.filter(element => element.title == "PC");
        let pcData = onlyPc.map(element => {
            return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="pc-game d-flex flex-column align-items-center">
            <div class="p-4 d-flex flex-column align-items-center">
                <img src="${element.standart.img}" width="100%" height="400px">
                <h1 class="text-center mt-2">${element.standart.name}</h1>
                <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                <a href="/detail.html?id=${element.id}" class="btn btn-light mt-2">Go detail</a>
                <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
            </div>
        </div>
    </div>
    `;
        }).join("");
        document.querySelector("#pc").innerHTML = pcData;

        //! PC GAME LOW-HIGH PRICE
        let lowPc = document.querySelector("#lowPc");
        let highPc = document.querySelector("#highPc");
        lowPc.addEventListener("click", () => {
            let low = onlyPc.sort((a, b) => a.standart.price - b.standart.price);
            let LowPcGame = low.map(element => {
                return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pc-game d-flex flex-column align-items-center">
                    <div class="p-4 d-flex flex-column align-items-center">
                        <img src="${element.standart.img}" width="100%" height="400px">
                        <h1 class="text-center mt-2">${element.standart.name}</h1>
                        <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                        <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                        <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
                    </div>
                </div>
            </div>
                `;
            }).join("");
            document.querySelector("#pc").innerHTML = LowPcGame;
        });
        highPc.addEventListener("click", () => {
            onlyPc.sort((a, b) => a.standart.price - b.standart.price);
            let high = onlyPc.reverse();
            let HighPcGame = high.map(element => {
                return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pc-game d-flex flex-column align-items-center">
                    <div class="p-4 d-flex flex-column align-items-center">
                        <img src="${element.standart.img}" width="100%" height="400px">
                        <h1 class="text-center mt-2">${element.standart.name}</h1>
                        <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                        <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                        <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
                    </div>
                </div>
            </div>
                `;
            }).join("");
            document.querySelector("#pc").innerHTML = HighPcGame;
        });

        //! PC GAME SEARCH FILTERED
        let pcSearch = document.querySelector("#pc_search");
        pcSearch.addEventListener("input", (e) => {
            let searched = e.target.value.toLowerCase();
            let filterPcGame = onlyPc.filter(element => {
                return element.standart.name.toLowerCase().includes(searched);
            });
            let filteredPcGame = filterPcGame.map(element => {
                return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pc-game d-flex flex-column align-items-center">
                    <div class="p-4 d-flex flex-column align-items-center">
                        <img src="${element.standart.img}" width="100%" height="400px">
                        <h1 class="text-center mt-2">${element.standart.name}</h1>
                        <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                        <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                        <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
                    </div>
                </div>
            </div>
                `;
            }).join("");
            document.querySelector("#pc").innerHTML = filteredPcGame;
        });

        //! PC BASKET
        let basketItems = []; // Sepetteki ürünleri tutan liste

        // Sayfa yüklendiğinde local storage'dan sepet içeriğini al ve güncelle
        let savedBasket = localStorage.getItem("Saved Basket");
        basketItems = JSON.parse(savedBasket);
        updateBasket();

        function saveBasket() {
            let savedBasket = JSON.stringify(basketItems);
            localStorage.setItem("Saved Basket", savedBasket);
        }
        // Sepet içeriğini güncelleyen fonksiyon
        function updateBasket() {
            let basketGame = basketItems.map(element => {
                return `
      <div class="basket-game m-auto mt-3 p-2 row">
        <div class="basket-left col-xxl-4 col-xl-4" style="background-image: url(${element.standart.img});
        background-position: top;
        background-size: cover;
        border-radius: 15px;
        border: 2px solid black;">
        </div>
        <div class="basket-right d-flex flex-column justify-content-center align-items-center col-8">
          <h3>${element.standart.name}</h3>
          <h4>${element.standart.edition}</h4>
          <h4>${element.standart.price}</h4>
          <button class="btn btn-danger remove-button">Remove Basket</button>
        </div>
      </div>`;
            }).join("");
            document.querySelector(".basket-content").innerHTML = basketGame;

            // Remove butonlarına dinleyici ekleme
            let removeGame = document.querySelectorAll(".remove-button");
            removeGame.forEach((button, index) => {
                button.addEventListener("click", () => {
                    basketItems.splice(index, 1); // Ürünü sepet listesinden kaldırma
                    updateBasket(); // Sepet içeriğini güncelleme
                    saveBasket();
                });
            });
        }
        let basketPc = data.filter(element => element.title == "PC");

        basketPc.forEach(element => {
            let add = document.getElementById(element.id);
            add.addEventListener("click", (e) => {
                let addGame = basketPc.find(item => item.id == e.target.id); // Tekil ürünü bulma
                basketItems.push(addGame); // Ürünü sepet listesine ekleme
                // Sepet içeriğini güncelleyen fonksiyonu çağırma
                updateBasket();

                // Sepet içeriğini local storage'a kaydet
                saveBasket();
            });
        });

    });

//! PS5 GAMES => PS5 Page
fetch("/games.json")
    .then(res => res.json())
    .then(data => {
        let onlyPs5 = data.filter(element => element.title == "PS5");
        let ps5Data = onlyPs5.map(element => {
            return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="ps5-game d-flex flex-column align-items-center">
            <div class="p-4 d-flex flex-column align-items-center">
                <img src="${element.standart.img}" width="100%" height="400px">
                <h1 class="text-center mt-2">${element.standart.name}</h1>
                <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
            </div>
        </div>
    </div>
    `;
        }).join("");
        document.querySelector("#ps5").innerHTML = ps5Data;

        //! PS5 GAME LOW-HIGH PRICE
        let lowPs5 = document.querySelector("#lowPs5");
        let highPs5 = document.querySelector("#highPs5");
        lowPs5.addEventListener("click", () => {
            let low = onlyPs5.sort((a, b) => a.standart.price - b.standart.price);
            let LowPs5Game = low.map(element => {
                return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pc-game d-flex flex-column align-items-center">
                    <div class="p-4 d-flex flex-column align-items-center">
                        <img src="${element.standart.img}" width="100%" height="400px">
                        <h1 class="text-center mt-2">${element.standart.name}</h1>
                        <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                        <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                        <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
                    </div>
                </div>
            </div>
                `;
            }).join("");
            document.querySelector("#ps5").innerHTML = LowPs5Game;
        });
        highPs5.addEventListener("click", () => {
            onlyPs5.sort((a, b) => a.standart.price - b.standart.price);
            let high = onlyPs5.reverse();
            let HighPs5Game = high.map(element => {
                return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pc-game d-flex flex-column align-items-center">
                    <div class="p-4 d-flex flex-column align-items-center">
                        <img src="${element.standart.img}" width="100%" height="400px">
                        <h1 class="text-center mt-2">${element.standart.name}</h1>
                        <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                        <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                        <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
                    </div>
                </div>
            </div>
                `;
            }).join("");
            document.querySelector("#ps5").innerHTML = HighPs5Game;
        });

        //! PS5 GAME SEARCH FILTERED
        let ps5Search = document.querySelector("#ps5_search");
        ps5Search.addEventListener("input", (e) => {
            let searched = e.target.value.toLowerCase();
            let filterPs5Game = onlyPs5.filter(element => {
                return element.standart.name.toLowerCase().includes(searched);
            });
            let filteredPs5Game = filterPs5Game.map(element => {
                return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="ps5-game d-flex flex-column align-items-center">
                    <div class="p-4 d-flex flex-column align-items-center">
                        <img src="${element.standart.img}" width="100%" height="400px">
                        <h1 class="text-center mt-2">${element.standart.name}</h1>
                        <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                        <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                        <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
                    </div>
                </div>
            </div>
                `;
            }).join("");
            document.querySelector("#ps5").innerHTML = filteredPs5Game;
        });

        //! PS5 BASKET
        let basketItems = []; // Sepetteki ürünleri tutan liste

        // Sayfa yüklendiğinde local storage'dan sepet içeriğini al ve güncelle
        let savedBasket = localStorage.getItem("Saved Basket");
        basketItems = JSON.parse(savedBasket);
        updateBasket();

        function saveBasket() {
            let savedBasket = JSON.stringify(basketItems);
            localStorage.setItem("Saved Basket", savedBasket);
        }
        // Sepet içeriğini güncelleyen fonksiyon
        function updateBasket() {
            let basketGame = basketItems.map(element => {
                return `
              <div class="basket-game m-auto mt-3 p-2 row">
                <div class="basket-left col-xxl-4 col-xl-4" style="background-image: url(${element.standart.img});
                background-position: top;
                background-size: cover;
                border-radius: 15px;
                border: 2px solid black;">
                </div>
                <div class="basket-right d-flex flex-column justify-content-center align-items-center col-8">
                  <h3>${element.standart.name}</h3>
                  <h4>${element.standart.edition}</h4>
                  <h4>${element.standart.price}</h4>
                  <button class="btn btn-danger remove-button">Remove Basket</button>
                </div>
              </div>`;
            }).join("");
            document.querySelector(".basket-content").innerHTML = basketGame;

            // Remove butonlarına dinleyici ekleme
            let removeGame = document.querySelectorAll(".remove-button");
            removeGame.forEach((button, index) => {
                button.addEventListener("click", () => {
                    basketItems.splice(index, 1); // Ürünü sepet listesinden kaldırma
                    updateBasket(); // Sepet içeriğini güncelleme
                    saveBasket();
                });
            });
        }
        let basketPs5 = data.filter(element => element.title == "PS5");

        basketPs5.forEach(element => {
            let add = document.getElementById(element.id);
            add.addEventListener("click", (e) => {
                let addGame = basketPs5.find(item => item.id == e.target.id); // Tekil ürünü bulma
                basketItems.push(addGame); // Ürünü sepet listesine ekleme
                // Sepet içeriğini güncelleyen fonksiyonu çağırma
                updateBasket();

                // Sepet içeriğini local storage'a kaydet
                saveBasket();
            });
        });

    });

//! XBOX GAMES => XBOX Page
fetch("/games.json")
    .then(res => res.json())
    .then(data => {
        let onlyXbox = data.filter(element => element.title == "XBOX");
        let xboxData = onlyXbox.map(element => {
            return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="xbox-game d-flex flex-column align-items-center">
            <div class="p-4 d-flex flex-column align-items-center">
                <img src="${element.standart.img}" width="100%" height="400px">
                <h1 class="text-center mt-2">${element.standart.name}</h1>
                <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
            </div>
        </div>
    </div>
    `;
        }).join("");
        document.querySelector("#xbox").innerHTML = xboxData;

        //! XBOX GAME LOW-HIGH PRICE
        let lowXbox = document.querySelector("#lowXbox");
        let highXbox = document.querySelector("#highXbox");
        lowXbox.addEventListener("click", () => {
            let low = onlyXbox.sort((a, b) => a.standart.price - b.standart.price);
            let LowXboxGame = low.map(element => {
                return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pc-game d-flex flex-column align-items-center">
                    <div class="p-4 d-flex flex-column align-items-center">
                        <img src="${element.standart.img}" width="100%" height="400px">
                        <h1 class="text-center mt-2">${element.standart.name}</h1>
                        <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                        <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                        <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
                    </div>
                </div>
            </div>
                `;
            }).join("");
            document.querySelector("#xbox").innerHTML = LowXboxGame;
        });
        highXbox.addEventListener("click", () => {
            onlyXbox.sort((a, b) => a.standart.price - b.standart.price);
            let high = onlyXbox.reverse();
            let HighXboxGame = high.map(element => {
                return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pc-game d-flex flex-column align-items-center">
                    <div class="p-4 d-flex flex-column align-items-center">
                        <img src="${element.standart.img}" width="100%" height="400px">
                        <h1 class="text-center mt-2">${element.standart.name}</h1>
                        <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                        <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                        <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
                    </div>
                </div>
            </div>
                `;
            }).join("");
            document.querySelector("#xbox").innerHTML = HighXboxGame;
        });

        //! XBOX GAME SEARCH FILTERED
        let xboxSearch = document.querySelector("#xbox_search");
        xboxSearch.addEventListener("input", (e) => {
            let searched = e.target.value.toLowerCase();
            let filterXboxGame = onlyXbox.filter(element => {
                return element.standart.name.toLowerCase().includes(searched);
            });
            let filteredXboxGame = filterXboxGame.map(element => {
                return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="pc-game d-flex flex-column align-items-center">
                    <div class="p-4 d-flex flex-column align-items-center">
                        <img src="${element.standart.img}" width="100%" height="400px">
                        <h1 class="text-center mt-2">${element.standart.name}</h1>
                        <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                        <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
                        <button id="${element.id}" class="btn btn-danger mt-2">Add Basket</button>
                    </div>
                </div>
            </div>
                `;
            }).join("");
            document.querySelector("#xbox").innerHTML = filteredXboxGame;
        });

        //! XBOX BASKET
        let basketItems = []; // Sepetteki ürünleri tutan liste

        // Sayfa yüklendiğinde local storage'dan sepet içeriğini al ve güncelle
        let savedBasket = localStorage.getItem("Saved Basket");
        basketItems = JSON.parse(savedBasket);
        updateBasket();

        function saveBasket() {
            let savedBasket = JSON.stringify(basketItems);
            localStorage.setItem("Saved Basket", savedBasket);
        }
        // Sepet içeriğini güncelleyen fonksiyon
        function updateBasket() {
            let basketGame = basketItems.map(element => {
                return `
              <div class="basket-game m-auto mt-3 p-2 row">
                <div class="basket-left col-xxl-4 col-xl-4" style="background-image: url(${element.standart.img});
                background-position: top;
                background-size: cover;
                border-radius: 15px;
                border: 2px solid black;">
                </div>
                <div class="basket-right d-flex flex-column justify-content-center align-items-center col-8">
                  <h3>${element.standart.name}</h3>
                  <h4>${element.standart.edition}</h4>
                  <h4>${element.standart.price}</h4>
                  <button class="btn btn-danger remove-button">Remove Basket</button>
                </div>
              </div>`;
            }).join("");
            document.querySelector(".basket-content").innerHTML = basketGame;

            // Remove butonlarına dinleyici ekleme
            let removeGame = document.querySelectorAll(".remove-button");
            removeGame.forEach((button, index) => {
                button.addEventListener("click", () => {
                    basketItems.splice(index, 1); // Ürünü sepet listesinden kaldırma
                    updateBasket(); // Sepet içeriğini güncelleme
                    saveBasket();
                });
            });
        }
        let basketXbox = data.filter(element => element.title == "XBOX");

        basketXbox.forEach(element => {
            let add = document.getElementById(element.id);
            add.addEventListener("click", (e) => {
                let addGame = basketXbox.find(item => item.id == e.target.id); // Tekil ürünü bulma
                basketItems.push(addGame); // Ürünü sepet listesine ekleme
                // Sepet içeriğini güncelleyen fonksiyonu çağırma
                updateBasket();

                // Sepet içeriğini local storage'a kaydet
                saveBasket();
            });
        });

    });

//! GO DETAIL => Detail Page
fetch("/games.json")
    .then(res => res.json())
    .then(data => {
        let detail = new URLSearchParams(window.location.search);
        let comingId = detail.get("id");
        let detailGame = data.filter(element => element.id == comingId);
        let goDetail = detailGame.map(element => {
            return `
            <div class="detail-background d-flex justify-content-center flex-column align-items-center" 
        style="background:linear-gradient(to top,rgba(0, 0, 0, 0.62) 25%,rgba(0, 0, 0, 0.277) 90%),url(${element.background_image});
            background-position:100%;
            background-size:cover;
            width: 100%;
            height: auto;
            background-repeat: no-repeat;">

            <div class="detail-content mt-5 p-3">

                <h1 class="text-center brand mt-5">${element.standart.name}</h1>
                <div class="detail-top-row mt-5 mb-5 row justify-content-center">
                    <div class="mt-3 mb-3 col-xxl-2 col-xl-2 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="left-detail d-flex justify-content-center" style="width: 100%;
                        height: 45rem;
                        background-color: rgba(0, 0, 0, 0.39);
                        background-image: url(${element.left_png});
                        background-position: center;
                        background-size: cover;
                        border-radius: 40px;">
                        </div>
                    </div>
                    <div class="mt-3 mb-3 col-xxl-8 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="video-detail d-flex justify-content-center" style="width: 100%;
                        height: 45rem;
                        background-color: rgba(0, 0, 0, 0.326);
                        border-radius: 40px;">
                            <iframe width="100%" height="100%" src="${element.iframe}" title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="mt-3 mb-3 col-xxl-2 col-xl-2 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="right-detail d-flex justify-content-center" style="width: 100%;
                        height: 45rem;
                        background-color: rgba(0, 0, 0, 0.353);
                        background-image: url(${element.right_png});
                        background-position: center;
                        background-size: cover;
                        border-radius: 40px;">
                        </div>
                    </div>
                </div>

                <div class="detail-middle-row mt-5 mb-5 row justify-content-center">
                    <div class="mt-3 mb-3 col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div class="standart-detail">
                            <div class="standart-game d-flex flex-column align-items-center justify-content-end" style="width: 100%;
                            height: 100%;
                            border: 4px solid #00ffff;
                            background-image:url(${element.standart.img});
                            background-position: center;
                            background-size: cover;
                            border-radius: 30px;
                            box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;">
                                <div class="s-game p-4 d-flex flex-column align-items-center">
                                    <h1 class="edition">${element.standart.edition}</h1>
                                    <ul class="mt-4">
                                        <li>Id consequuntur accusantium aliquid voluptatibus nisi odit dolorum sed
                                            cumque
                                            minima porro tempore.</li>
                                        <li>Id consequuntur accusantium aliquid voluptatibus nisi odit dolorum sed
                                            cumque
                                            minima porro tempore.</li>
                                    </ul>
                                    <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                                    <button id="STANDART" class="btn btn-danger mt-2" value="${element.standart.name}">Add Basket</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 mb-3 col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div class="deluxe-detail">
                            <div class="deluxe-game d-flex flex-column align-items-center justify-content-end" style="width: 100%;
                            height: 100%;
                            border: 4px solid #00ffff;
                            background-image:url(${element.deluxe.img});
                            background-position: center;
                            background-size: cover;
                            border-radius: 30px;
                            box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;">
                                <div class="d-game p-4 d-flex flex-column align-items-center">
                                    <h1 class="edition">${element.deluxe.edition}</h1>
                                    <ul class="mt-4">
                                        <li>Id consequuntur accusantium aliquid voluptatibus nisi odit dolorum sed
                                            cumque
                                            minima porro tempore.</li>
                                        <li>Id consequuntur accusantium aliquid voluptatibus nisi odit dolorum sed
                                            cumque
                                            minima porro tempore.</li>
                                    </ul>
                                    <h2 class="text-center price mt-2">${element.deluxe.price}$</h2>
                                    <button id="DELUXE" class="btn btn-danger mt-2" value="${element.deluxe.name}">Add Basket</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 mb-3 col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div class="ultimate-detail">
                            <div class="ultimate-game d-flex flex-column align-items-center justify-content-end" style="width: 100%;
                            height: 100%;
                            border: 4px solid #00ffff;
                            background-image:url(${element.ultimate.img});
                            background-position: center;
                            background-size: cover;
                            border-radius: 30px;
                            box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;">
                                <div class="u-game p-4 d-flex flex-column align-items-center">
                                    <h1 class="edition">${element.ultimate.edition}</h1>
                                    <ul class="mt-4">
                                        <li>Id consequuntur accusantium aliquid voluptatibus nisi odit dolorum sed
                                            cumque
                                            minima porro tempore.</li>
                                        <li>Id consequuntur accusantium aliquid voluptatibus nisi odit dolorum sed
                                            cumque
                                            minima porro tempore.</li>
                                    </ul>
                                    <h2 class="text-center price mt-2">${element.ultimate.price}$</h2>
                                    <button id="COLLECTOR" class="btn btn-danger mt-2" value="${element.ultimate.name}">Add Basket</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="detail-bottom-row mt-5 mb-5 row justify-content-center">
                    <div class="mt-3 mb-3 col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="image-detail" style="width: 100%;
                        height: 40rem;
                        background-color: rgba(46, 0, 86, 0.332);
                        border-radius: 40px;
                        background-image: url(${element.image});
                        background-position: center;
                        background-size: cover;
                        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;">
                        </div>
                    </div>
                    <div class="mt-3 mb-3 col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="about-detail">
                            <p class="text-center p-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
                                consequuntur ipsam in soluta deserunt quis doloribus voluptates ullam non fugiat!
                                Voluptatibus, similique! Soluta ducimus, iste saepe atque dolores dolorem praesentium?
                                Distinctio ipsa magnam voluptatum, eveniet quos, tempora unde, repellendus maxime
                                aliquid
                                quo fugit quidem perspiciatis. Nobis similique voluptate tempore ad aperiam assumenda
                                molestiae voluptates, vitae quaerat reiciendis earum optio! Adipisci.</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        `;
        }).join("");
        document.querySelector("#detail").innerHTML = goDetail;

        //! DETAIL BASKET
        let basketItems = []; // Sepetteki ürünleri tutan liste

        // Sayfa yüklendiğinde local storage'dan sepet içeriğini al ve güncelle
        let savedBasket = localStorage.getItem("Saved Basket");
        basketItems = JSON.parse(savedBasket);
        updateBasket();

        function saveBasket() {
            let savedBasket = JSON.stringify(basketItems);
            localStorage.setItem("Saved Basket", savedBasket);
        }
        let addStandart = document.getElementById("STANDART");
        let addDeluxe = document.getElementById("DELUXE");
        let addUltimate = document.getElementById("COLLECTOR");
        // Sepet içeriğini güncelleyen fonksiyon
        function updateBasket(e) {
            let basketGame = basketItems.map(element => {
                return `
                  <div class="basket-game m-auto mt-3 p-2 row">
                    <div class="basket-left col-xxl-4 col-xl-4" style="background-image: url(${element.standart.img});
                    background-position: top;
                    background-size: cover;
                    border-radius: 15px;
                    border: 2px solid black;">
                    </div>
                    <div class="basket-right d-flex flex-column justify-content-center align-items-center col-8">
                      <h3>${element.standart.name}</h3>
                      <h4>${element.standart.edition}</h4>
                      <h4>${element.standart.price}</h4>
                      <button class="btn btn-danger remove-button">Remove Basket</button>
                    </div>
                  </div>`;
            }).join("");
            document.querySelector(".basket-content").innerHTML = basketGame;

            // Remove butonlarına dinleyici ekleme
            let removeGame = document.querySelectorAll(".remove-button");
            removeGame.forEach((button, index) => {
                button.addEventListener("click", () => {
                    basketItems.splice(index, 1); // Ürünü sepet listesinden kaldırma
                    updateBasket(e); // Sepet içeriğini güncelleme
                    saveBasket();
                });
            });
        }

        addStandart.addEventListener("click", (e) => {
            console.log(e.target.value);
            let addStandart = data.find(item => item.standart.edition == e.target.id && item.standart.name == e.target.value); // Tekil ürünü bulma
            console.log(addStandart);
            basketItems.push(addStandart); // Ürünü sepet listesine ekleme
            // Sepet içeriğini güncelleyen fonksiyonu çağırma
            updateBasket(e);
            // Sepet içeriğini local storage'a kaydet
            saveBasket();
        });
        addDeluxe.addEventListener("click", (e) => {
            console.log(e.target.value);
            let addDeluxe = data.find(item => item.deluxe.edition == e.target.id && item.deluxe.name == e.target.value); // Tekil ürünü bulma
            console.log(addDeluxe);
            basketItems.push(addDeluxe); // Ürünü sepet listesine ekleme
            // Sepet içeriğini güncelleyen fonksiyonu çağırma
            updateBasket(e);
            // Sepet içeriğini local storage'a kaydet
            saveBasket();
        });
        addUltimate.addEventListener("click", (e) => {
            console.log(e.target.value);
            let addUltimate = data.find(item => item.ultimate.edition == e.target.id && item.ultimate.name == e.target.value); // Tekil ürünü bulma
            console.log(addUltimate);
            basketItems.push(addUltimate); // Ürünü sepet listesine ekleme
            // Sepet içeriğini güncelleyen fonksiyonu çağırma
            updateBasket(e);
            // Sepet içeriğini local storage'a kaydet
            saveBasket();
        });
    });

//! BASKET => Navbar
let basket = document.querySelector("#basket");
let basketContent = document.querySelector(".basket-content");
basketContent.style.display = "none";
basket.addEventListener("click", () => {
    if (basketContent.style.display == "none") {
        basketContent.style.display = "block"
    }
    else if (basketContent.style.display = "block") {
        basketContent.style.display = "none";
    }
});