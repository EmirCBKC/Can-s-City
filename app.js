//! PC GAMES => PC Page
fetch("/games.json")
.then(res=>res.json())
.then(data=>{
    let onlyPc=data.filter(element=>element.title=="PC");
    let pcData=onlyPc.map(element=>{
        return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="pc-game d-flex flex-column align-items-center">
            <div class="p-4 d-flex flex-column align-items-center">
                <img src="${element.standart.img}" width="100%" height="400px">
                <h1 class="text-center mt-2">${element.standart.name}</h1>
                <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                <a href="" class="btn btn-light">Go detail</a>
            </div>
        </div>
    </div>
    `;
    }).join("");
    document.querySelector("#pc").innerHTML=pcData;
});

//! PS5 GAMES => PS5 Page
fetch("/games.json")
.then(res=>res.json())
.then(data=>{
    let onlyPs5=data.filter(element=>element.title=="PS5");
    let ps5Data=onlyPs5.map(element=>{
        return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="pc-game d-flex flex-column align-items-center">
            <div class="p-4 d-flex flex-column align-items-center">
                <img src="${element.standart.img}" width="100%" height="400px">
                <h1 class="text-center mt-2">${element.standart.name}</h1>
                <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                <a href="" class="btn btn-light">Go detail</a>
            </div>
        </div>
    </div>
    `;
    }).join("");
    document.querySelector("#ps5").innerHTML=ps5Data;
});

//! XBOX GAMES => XBOX Page
fetch("/games.json")
.then(res=>res.json())
.then(data=>{
    let onlyXbox=data.filter(element=>element.title=="XBOX");
    let xboxData=onlyXbox.map(element=>{
        return `<div class="mt-5 mb-5 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="pc-game d-flex flex-column align-items-center">
            <div class="p-4 d-flex flex-column align-items-center">
                <img src="${element.standart.img}" width="100%" height="400px">
                <h1 class="text-center mt-2">${element.standart.name}</h1>
                <h2 class="text-center price mt-2">${element.standart.price}$</h2>
                <a href="" class="btn btn-light">Go detail</a>
            </div>
        </div>
    </div>
    `;
    }).join("");
    document.querySelector("#xbox").innerHTML=xboxData;
});