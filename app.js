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
                <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
            </div>
        </div>
    </div>
    `;
        }).join("");
        document.querySelector("#pc").innerHTML = pcData;
    });

//! PS5 GAMES => PS5 Page
fetch("/games.json")
    .then(res => res.json())
    .then(data => {
        let onlyPs5 = data.filter(element => element.title == "PS5");
        let ps5Data = onlyPs5.map(element => {
            return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="pc-game d-flex flex-column align-items-center">
            <div class="p-4 d-flex flex-column align-items-center">
                <img src="${element.standart.img}" width="100%" height="400px">
                <h1 class="text-center mt-2">${element.standart.name}</h1>
                <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
            </div>
        </div>
    </div>
    `;
        }).join("");
        document.querySelector("#ps5").innerHTML = ps5Data;
    });

//! XBOX GAMES => XBOX Page
fetch("/games.json")
    .then(res => res.json())
    .then(data => {
        let onlyXbox = data.filter(element => element.title == "XBOX");
        let xboxData = onlyXbox.map(element => {
            return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="pc-game d-flex flex-column align-items-center">
            <div class="p-4 d-flex flex-column align-items-center">
                <img src="${element.standart.img}" width="100%" height="400px">
                <h1 class="text-center mt-2">${element.standart.name}</h1>
                <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                <a href="/detail.html?id=${element.id}" class="btn btn-light">Go detail</a>
            </div>
        </div>
    </div>
    `;
        }).join("");
        document.querySelector("#xbox").innerHTML = xboxData;
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

                <h1 class="text-center brand">${element.standart.name}</h1>
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
                                    <a href="" class="btn btn-light">Buy</a>
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
                                    <a href="" class="btn btn-light">Buy</a>
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
                                    <a href="" class="btn btn-light">Buy</a>
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
        document.querySelector("#detail").innerHTML=goDetail;
    });