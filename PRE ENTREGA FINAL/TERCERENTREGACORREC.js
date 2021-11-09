// MODAL
const modalAbrir = document.getElementById("modal-abrir");
const modalCerrar = document.getElementById("modal-cerrar");
const modalContainer = document.getElementsByClassName("modal-container")[0];
const modal = document.getElementsByClassName("modal")[0]
// EVENTOS DEL MODAL
modalAbrir.addEventListener("click", () => {
    modalContainer.classList.add("modal-active")
})
modalContainer.addEventListener('click', () => {
    modalContainer.classList.toggle('modal-active')
})
modal.addEventListener('click', (e) => {
    e.stopPropagation()
})
// JQUERY FOOTER
$("#footer").append(`<p> Gracias por su visita </p>
`)
// // ARRay OBJEToS
const listadoProductos = [
    { id: 1, nombre: "Fideos", precio: 150, img: "../fotis/fido.jpg" },
    { id: 2, nombre: "Noquis", precio: 250, img: "../fotis/noq.jpg" },
    { id: 3, nombre: "Ravioles", precio: 350, img: "../fotis/raviot.jpg" },
    { id: 4, nombre: "Sorrentinos", precio: 400, img: "../fotis/sorre.jpg" },
    { id: 5, nombre: "Lasaggna", precio: 500, img: "../fotis/lassa.jpg" },
    { id: 6, nombre: "Pizza", precio: 350, img: "../fotis/pizza.jpg" },
    { id: 7, nombre: "Tarta", precio: 400, img: "../fotis/tarta.jpg" },
    { id: 8, nombre: "Noqui relleno", precio: 600, img: "../fotis/noquirelleno.jpg" }
];
// JSON STRING
const productosToString = JSON.stringify(listadoProductos)
localStorage.setItem("listadoProductos", productosToString)


const contenedorProductos = document.getElementById(`productos`);
const contenedorCarrito = document.getElementById("contenedorCarrito")
const contadorCarrito = document.getElementById("contadorCarrito")
const precioTotal = document.getElementById("precioTotal")

// GENERADOR DE CART PRODUCTOS
const mostrarProductos = (listadoProductos) => {
    listadoProductos.forEach((producto) => {
        const div = document.createElement("div");
        div.className = "card-img-top";
        div.style = "width: 18rem;";

        div.innerHTML = `

    <img src=" ${producto.img}" class="card-img-top" id="fotosProductos"  width=250px height=250px alt="...">
    <div class="card-body">
        <h5 class="card-title"> ${producto.nombre}</h5>
        <p class="card-text"> ${producto.precio}$ </p>
        <a onclick="agregarAlCarrito(${producto.id})" href="#" id=btn1 class="btn btn-primary">Agregar al carrito</a>
    </div>
`
        contenedorProductos.appendChild(div)
    })
}
mostrarProductos(listadoProductos);
// AGREGAR AL CARRITO
const carrito = [];
var monto_total = 0;

const agregarAlCarrito = (itemId) => {
    const producto = listadoProductos.find((prod) => prod.id === itemId);
    if (producto) {
        producto.cantidad++
        monto_total = monto_total + producto.precio
    }
    else {
        const producto = listadoProductos.find((prod) => prod.id === itemId);
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,

            cantidad: 1
        })
    }
    console.log(carrito)
    carrito.push(producto)
    actualizarCarrito()
}

// ACTUALIZAR CARRITO
var monto_total = 0;

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((prod) => {
        const div = document.createElement("div");
        div.classList.add("productoEnCarrito");
        div.innerHTML = `
        <p class="nombreEnCarrito"> ${prod.nombre}</p>
        <p class="precioEnCarrito">  ${prod.precio}$</p>
        <button onclick= "eliminarProducto(${prod.id})" type="button" class="btn btn-outline-success" id="btnRemove">eliminar</button>
        `
        contenedorCarrito.appendChild(div)
    })
    precioTotal.innerText = monto_total
    contadorCarrito.innerText = carrito.length

}
actualizarCarrito();

// ELIMINAR PRODUCTO
const eliminarProducto = (producto) => {
    const index = carrito.indexOf(producto)
    carrito.splice(index, 1)
    actualizarCarrito()
}
// BUSCADOR
const search = document.getElementById(`buscador`)
const buscar = (search) => {

return listadoProductos.filter((prod) => prod.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
}
buscador.addEventListener(`input`, () => {
    const search = buscador.value.trim().toLocaleLowerCase()
    mostrarProductos(buscar(search))
})
// BOTON FINALIZAR COMPRA
const botonFinalizar = document.getElementById("btn-finalizar");
botonFinalizar.addEventListener("click", () => {
    swal.fire({
        title: "Gracias por su compra",
        html: `<b class="alertCarrito">Disfrute su pedido</b>`,
        icon: `success`,
    })
});

