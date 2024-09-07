let endpoint = `https://api.binance.com/api/v3/ticker/price`
let endpoint24 = `https://api.binance.com/api/v3/ticker/24hr`
let criptoSeleccionada;
let monedaSeleccionada;

function traerDatos() {
    
    fetch(endpoint)
        .then(response => response.json())
        .then(data => mostrarData(data, "general"))
        .catch(e => console.log(e))


    fetch(endpoint24)
        .then(response => response.json())
        .then(data => mostrarData(data, "24h"))
        .catch(e => console.log(e))

}


function seleccionarCripto() {
    let cripto = document.getElementById("cripto");
    criptoSeleccionada = cripto.value;
    /*console.log(criptoSeleccionada);*/
    traerDatos();

}

function seleccionarMoneda() {
    let moneda = document.getElementById("moneda");
    monedaSeleccionada = moneda.value;
    traerDatos();

}


const mostrarData = (data, opcion) => {
    let sufijo = "";
    let prefijo = "";
    let fotoCripto="";
    let fotoMoneda="";
    if (monedaSeleccionada == "euro") {
        sufijo = "EUR";
        fotoMoneda="<img src='euro.jpg' class='fotoMoneda img-fluid'>";
    } else if (monedaSeleccionada == "dollar") {
        sufijo = "USDT";
        fotoMoneda="<img src='usd.jpg' class='fotoMoneda img-fluid'>";
    } else if (monedaSeleccionada == "libra") {
        sufijo = "GBP";
        fotoMoneda="<img src='libra.jpg' class='fotoMoneda img-fluid'>";
    } else {
        sufijo = "seleccion"
    }

    if (criptoSeleccionada == "bitcoin") {
        prefijo = "BTC";
        fotoCripto="<img src='btc.jpg' class='fotoCripto img-fluid'>";
    } else if (criptoSeleccionada == "ethereum") {
        prefijo = "ETH";
        fotoCripto="<img src='ethereum.png' class='fotoCripto'>";
    } else if (criptoSeleccionada == "cardano") {
        prefijo = "ADA";
        fotoCripto="<img src='cardano.jpg' class='fotoCripto'>";
    } else if (criptoSeleccionada == "xrp") {
        prefijo = "XRP";
        fotoCripto="<img src='xrp.jpg' class='fotoCripto'>";
    } else {
        sufijo = "seleccion"
    }



    let buscar = prefijo + sufijo;
    console.log(buscar);
    if (buscar.includes("seleccion")) {

    } else {

        
        document.getElementById("fotoCripto").innerHTML=fotoCripto;
        document.getElementById("fotoMoneda").innerHTML=fotoMoneda;
        let body = ""

        for (let i = 0; i < data.length; i++) {
            if (data[i].symbol == buscar) {
                if (opcion == "general") {
                    var precioValor=data[i].price;
                    precioValor=Number(precioValor).toFixed(4);
                    body = `
            <div class="campoValor">

                <p>precio actual</p><p>${precioValor}</p>

            </div>
            `
                    document.getElementById("precio").innerHTML = body
                    break;

                } else {
                    var mayor=data[i].highPrice
                    mayor=Number(mayor).toFixed(4);
                    var menor=data[i].lowPrice
                    menor=Number(menor).toFixed(4);
                    var cambio=data[i].priceChangePercent
                    cambio=Number(cambio).toFixed(4);
                    body = `
            <div class="campoValor">

                <p>precio mas alto</p><p>${mayor}</p>

            </div>
            <div class="campoValor">

                <p>precio mas bajo</p><p>${menor}</p>

            </div>
            <div class="campoValor">

            <p>cambio de precio</p><p>${cambio}</p>

        </div>
            `

                    document.getElementById("preciosDia").innerHTML = body
                    break;

                }

            }



        }


    }


    /*
        let body = ""
        for (let i = 0; i < data.length; i++) {
            
        
    
            /*
                     body += `
                     <tr>
                         <td>${data[i].symbol}</td>
                     
                         <td>${data[i].price}</td>
                     </tr>
                 
                 `
          */

    /*
            body += `
            <tr>
                <td>${data[i].highPrice}</td>
    
             <td>${data[i].lowPrice}</td>
            </tr>
    
    `
    */
    /*
        }
    
        document.getElementById("precio").innerHTML = body*/
}