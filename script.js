function main(productos) {
    crearProductos(productos)
    let input = document.getElementById("busqueda")
    input.addEventListener("keyup", (e) => buscarProductos(e, productos, input.value))
    let botonBuscar = document.getElementById("buscar")
    botonBuscar.addEventListener("click", (e) => buscarProductos(e, productos, input.value))
    crearBotonesDeCategorias(productos)
    let carrito = obtenerCarrito()
    crearCarrito(carrito)
    let botonVerCarrito = document.getElementById("botonCarrito")
    botonVerCarrito.addEventListener("click",  (e) => verOcultar(e))
    let botonComprar = document.getElementById("comprar")
    botonComprar.addEventListener("click", finalizarCompra)

}

function buscarProductos(e, productos, valorBusqueda) {
    if (e.key=== "Enter" || e.key == undefined) {
        let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(valorBusqueda.toLowerCase()))
        crearProductos(productosFiltrados)
    }
}

function crearBotonesDeCategorias(productos) {
    let categorias = []
    let contenedorFiltros = document.getElementById("filtrado")
    contenedorFiltros.innerHTML = ''
    let botonTodos = document.createElement("button")
    botonTodos.innerText = "Todo"
    botonTodos.addEventListener("click", () => crearProductos(productos))
    contenedorFiltros.appendChild(botonTodos)
    productos.forEach( producto => {
        if (!categorias.includes(producto.categoria.toLowerCase())) {
            categorias.push(producto.categoria.toLowerCase())

            let botonFiltro = document.createElement("button")
            botonFiltro.innerText = producto.categoria
            botonFiltro.value = producto.categoria
            botonFiltro.addEventListener("click", () => filtrarPorCategoria(producto.categoria,productos))
            contenedorFiltros.appendChild(botonFiltro)
        }
    })

}

function filtrarPorCategoria(categoria,productos) {
    const productosFiltrados = productos.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase())
    crearProductos(productosFiltrados)
}

function crearProductos(productos) {
    let contenedorProductos = document.getElementById('productos')
    contenedorProductos.innerHTML = ''
    productos.forEach(producto => {
        let tarjetaProducto = document.createElement('div')
        tarjetaProducto.className = 'producto'
        tarjetaProducto.innerHTML = `
            <div class ="contenido-producto">
                <img src="images/${producto.rutaImagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p class ="caracteristicas">${producto.descripcion}</p>
                <p>Características:</p>
                <ul>
                    ${producto.caracteristicas.map(caracteristica => `<li><p>${caracteristica}</p></li>`).join('')}
                </ul>
            </div>
            <div class ="infoCompra">
                <p class ="precio">${Dinero({ amount: producto.precio * 100, currency: 'COP' }).toFormat('$0,0.00')}</p>
                <button id=${producto.id} class= "botonAgregrCarrito">Añadir al carrito</button>
            </div>
        `
        contenedorProductos.appendChild(tarjetaProducto)   
        let botonAgregarAlCarrito = document.getElementById(producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarAlCarrito(e, productos))
    })
}

function obtenerCarrito() {
    return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
}

function setearCarrito(carrito) {
    let carritoJSON = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJSON)
}

function agregarAlCarrito(e, productos) {
    let carrito = obtenerCarrito()
    let idProducto = Number(e.target.id)
    let productoBuscado = productos.find(producto => producto.id === idProducto)
    let indiceProdCarrito = carrito.findIndex(producto => producto.id === idProducto)
    if (indiceProdCarrito != -1) {
        carrito[indiceProdCarrito].unidades++
        carrito[indiceProdCarrito].subtotal = carrito[indiceProdCarrito].precioUnitario * carrito[indiceProdCarrito].unidades
    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    }
    setearCarrito(carrito)
    crearCarrito(carrito)
    alertaToasti(
        "\n Se ha agregado exitosamente el producto '" + productoBuscado.nombre +"' al carrito.",
        3000, 
        "bottom", 
        "right"
    )
}

function crearCarrito(carrito) {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    let tablaHTML = `
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
    `
    carrito.forEach(item => {
        tablaHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${Dinero({ amount: item.precioUnitario * 100, currency: 'COP' }).toFormat('$0,0.00')}</td>
                <td class=sum-res-prodcutos>
                    <button id=a${item.id}>+</button>
                    ${item.unidades}
                    <button id=d${item.id}>-</button>

                </td>
                <td>
                    <p>${Dinero({ amount: item.subtotal * 100, currency: 'COP' }).toFormat('$0,0.00')}</p>
                    <button id=e${item.id}>Eliminar</button>
                </td>  
            </tr>
        `
    })
    tablaHTML += `
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3">Total</th>
                    <th>${Dinero({ amount: carrito.reduce((acc, item) => acc + item.subtotal * 100, 0), currency: 'COP' }).toFormat('$0,0.00')}</th>
                </tr>
            </tfoot>
        </table>
    `
    contenedorCarrito.innerHTML = tablaHTML
    carrito.forEach(item => {
        let botonEliminar = document.getElementById("e" + item.id)
        let botonSumar = document.getElementById("a" + item.id)
        let botonRestar = document.getElementById("d" + item.id)
        
        botonEliminar.addEventListener("click", (e) => eliminarProductoDelCarrito(e, carrito))
        botonSumar.addEventListener("click", (e) => sumarUnidadProducto(e, carrito))
        botonRestar.addEventListener("click", (e) => restarUnidadProducto(e, carrito))
    })

}

function eliminarProductoDelCarrito(e, carrito) {
    let id = Number(e.target.id.substring(1))
    carrito = carrito.filter(producto => producto.id !== id)
    setearCarrito(carrito)
    crearCarrito(carrito)
}

function sumarUnidadProducto(e, carrito) {
    let id = Number(e.target.id.substring(1))
    let producto = carrito.find(producto => producto.id === id)

    if (producto) {
        producto.unidades++
        producto.subtotal = producto.precioUnitario * producto.unidades
        setearCarrito(carrito)
        crearCarrito(carrito)
    }
}

function restarUnidadProducto(e, carrito) {
    let id = Number(e.target.id.substring(1))
    let producto = carrito.find(producto => producto.id === id)

    if (producto && producto.unidades > 1) { 
        producto.unidades--
        producto.subtotal = producto.precioUnitario * producto.unidades
        setearCarrito(carrito)
        crearCarrito(carrito)
    } else if (producto && producto.unidades === 1) {
        eliminarProductoDelCarrito(e, carrito)
    }
}

function finalizarCompra() {
    let carrito = obtenerCarrito()

    if (carrito.length > 0) {
        localStorage.removeItem("carrito")
        crearCarrito([])
        alertaSweet(
            "¡Compra Exitosa!",
            "GRACIAS POR SU COMPRA",
            "success",
            "Cerrar",
            undefined,
            true,
            function() {
                mostrarCatalogoCarrito()
            }
        )
    } else {
        alertaSweet(
            "Carrito Vacío",
            "No hay artículos en el carrito para comprar.",
            "warning",
            "Cerrar",
            undefined,
            true,
            function() {
                mostrarCatalogoCarrito()
            }
        )
    }
}

function verOcultar(e) {
    e.target.innerText = e.target.innerText === "CARRITO" ? "CATALOGO" : "CARRITO"

    let contenedorProductos = document.getElementById("paginaProductos")
    let contenedorCarrito = document.getElementById("paginaCarrito")

    contenedorCarrito.classList.toggle("oculto")
    contenedorProductos.classList.toggle("oculto")
}

function alertaSweet(title, text, icon, confirmButtonText, timer, showConfirmButton, callback) {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        timer,
        showConfirmButton,
    }).then(() => {
        if (callback) callback()
    })
}

function alertaToasti(text,duration,gravity,position) {
    Toastify({
        text,
        duration,
        gravity,
        position,
        stopOnFocus: true, 
        className: "custom-toast",
        avatar: "https://img.icons8.com/emoji/48/000000/shopping-cart-emoji.png", 
        onClick:  function() {
            mostrarCatalogoCarrito()
        }
    }).showToast()
}

function mostrarCatalogoCarrito() {
    let botonVerCarrito = document.getElementById("botonCarrito")
    verOcultar({ target: botonVerCarrito })
}

async function consultarBD() {
    try {
        const response = await fetch("info.json")
        const productos = await response.json()
        main(productos)
    } catch (error) {
        alertaSweet(
            "Error al Cargar Datos", 
            "No se pudo cargar la información de productos. Por favor, inténtelo de nuevo más tarde.", 
            "error", 
            "Cerrar",
            undefined, 
            true 
        ); 
    }
}

consultarBD()
