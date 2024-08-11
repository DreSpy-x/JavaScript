let productos = [
    {id: 1, nombre: "Pantalón Comfort Chic", categoria: "pantalones", precio: 145000, rutaImagen: "pantalon-mujer.png", descripcion: "Eleva tu estilo diario con el Pantalón Comfort Chic, perfecto para quienes buscan comodidad sin sacrificar el estilo. Este pantalón de corte ancho y tejido suave ofrece una experiencia de uso excepcional, ideal para combinaciones versátiles en tu guardarropa cotidiano.", caracteristicas: ["Corte ancho", "Material: 100% algodón suave", "Ajuste: Cintura elástica con cordón ajustable"]},
    {id: 2, nombre: "Camisa Tupac OG", categoria: "camisas", precio: 90000, rutaImagen: "2Pac-OG.png", descripcion: "Embárcate en la esencia única de la camisa 2Pac OG, inspirada en el legendario rapero y actor Tupac Shakur. Diseño oversize con estampados de alta calidad y bordados únicos.", caracteristicas: ["Estilo oversize", "Material: 100% algodón peinado", "Estampado: Técnica de serigrafía"] },
    {id: 3, nombre: "Accesorio Gorra Denim Classic", categoria: "accesorios", precio: 50000, rutaImagen: "gorra.png", descripcion: "Define tu estilo con la Gorra Denim Classic, una pieza versátil para cualquier colección de accesorios. Con su estructura durable y diseño contemporáneo, esta gorra no solo ofrece protección contra el sol, sino que también añade un toque urbano a tu vestuario.", caracteristicas: ["Diseño estructurado", "Material: 100% algodón denim", "Detalles: Costuras reforzadas"]},
    {id: 4, nombre: "Conjunto NY Urban Set", categoria: "conjuntos", precio: 180000, rutaImagen: "conjunto1.png", descripcion: "Adopta un estilo urbano con el Conjunto NY Urban Set, diseñado para ofrecer comodidad y estilo en la vida cotidiana. Este conjunto monócromo destaca por su sencillez y versatilidad, perfecto para cualquier ocasión casual.", caracteristicas: ["Diseño monocromático", "Material: 100% algodón suave", "Incluye: Camiseta y pantalones a juego"]},
    {id: 5, nombre: "Camisa Almighty OG", categoria: "camisas", precio: 90000, rutaImagen: "Almighty-OG.png", descripcion: "Descubre la fusión de elegancia y poder con la camisa Almighty OG, inspirada en el mundo del boxeo por Mike Tyson. Diseño oversize con estampados de alta calidad y bordados meticulosos.", caracteristicas: ["Estilo oversize", "Material: 100% algodón peinado", "Estampado: Técnica de serigrafía"] },
    {id: 6, nombre: "Pantalón Cargo Tactical", categoria: "pantalones", precio: 145000, rutaImagen: "pantalon-hombre.png", descripcion: "Adáptate a cualquier entorno con el Pantalón Cargo Tactical, ideal para aquellos que valoran la funcionalidad y el estilo. Equipado con múltiples bolsillos y fabricado con materiales resistentes, es perfecto para actividades al aire libre o un look casual urbano.", caracteristicas: ["Múltiples bolsillos utilitarios", "Material: tela resistente y ligera", "Diseño funcional y confortable"]},
    {id: 7, nombre: "Camisa Garden OG", categoria: "camisas", precio: 90000, rutaImagen: "Garden-OG.png", descripcion: "Embárcate en un oasis de tranquilidad con la camisa Garden OG, una prenda que captura la esencia y la belleza de un exuberante jardín. Diseño oversize con estampados de alta calidad y bordados exclusivos.", caracteristicas: ["Estilo oversize", "Material: 100% algodón peinado", "Estampado: Técnica de serigrafía"] },
    {id: 8, nombre: "Accesorio Riñonera Urban Sleek", categoria: "accesorios", precio: 120000, rutaImagen: "riñonera.png", descripcion: "Combina funcionalidad y estilo con la Riñonera Urban Sleek, perfecta para llevar tus esenciales con facilidad y seguridad. Su diseño compacto y resistente la convierte en el complemento ideal para cualquier aventura urbana.", caracteristicas: ["Diseño compacto y ergonómico", "Material: cuero sintético de alta calidad", "Características: correa ajustable, múltiples compartimentos"]},
    {id: 9, nombre: "Camisa Lil Peep OG", categoria: "camisas", precio: 90000, rutaImagen: "Lil-OG.png", descripcion: "Expresa tu individualidad con nuestra camisa Lil Peep OG, inspirada en el inconfundible estilo del rapero y cantante Gustav Elijah. Diseño oversize audaz con estampados exclusivos y bordados de alta calidad", caracteristicas: ["Estilo oversize", "Material: 100% algodón peinado", "Estampado: Técnica de serigrafía"] },
    {id: 10, nombre: "Conjunto Casual Urban", categoria: "conjuntos", precio: 180000, rutaImagen: "conjunto2.png", descripcion: "Refleja un estilo relajado pero refinado con el Conjunto Casual Urban. Perfecto para un look diario, este conjunto combina comodidad y estilo con un diseño minimalista y una textura suave al tacto, ideal para un día en la ciudad o una tarde relajada en casa.", caracteristicas: ["Diseño minimalista", "Material: Algodón suave de alta calidad", "Características: Corte relajado, fácil de combinar"]},
    {id: 11, nombre: "Camisa Ice Cube OG", categoria: "camisas", precio: 90000, rutaImagen: "Ice-Cube-OG.png", descripcion: "Explora la autenticidad con la camisa Ice Cube OG, inspirada en el influyente rapero y actor O'Shea Jackson. Diseño oversize con estampados de alta calidad y bordados detallados.", caracteristicas: ["Estilo oversize", "Material: 100% algodón peinado", "Estampado: Técnica de serigrafía"] }

];

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
    console.log(e.key)
    if (e.key=== "Enter" || e.key == undefined) {
        let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(valorBusqueda.toLowerCase()));
        crearProductos(productosFiltrados);
    }
}

function crearBotonesDeCategorias(productos) {
    let categorias = [];
    let contenedorFiltros = document.getElementById("filtrado");
    contenedorFiltros.innerHTML = ''; 
    let botonTodos = document.createElement("button");
    botonTodos.innerText = "Todo";
    botonTodos.addEventListener("click", () => crearProductos(productos));
    contenedorFiltros.appendChild(botonTodos);
    productos.forEach( producto => {
        if (!categorias.includes(producto.categoria.toLowerCase())) {
            categorias.push(producto.categoria.toLowerCase());

            let botonFiltro = document.createElement("button");
            botonFiltro.innerText = producto.categoria;
            botonFiltro.value = producto.categoria;
            botonFiltro.addEventListener("click", () => filtrarPorCategoria(producto.categoria));
            contenedorFiltros.appendChild(botonFiltro);
        }
    });

}

function filtrarPorCategoria(categoria) {
    const productosFiltrados = productos.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());
    crearProductos(productosFiltrados);
}

function crearProductos(productos) {
    let contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';
    productos.forEach(producto => {
        let tarjetaProducto = document.createElement('div');
        tarjetaProducto.className = 'producto';
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
                <p class ="precio">$${producto.precio.toLocaleString()} COP</p>
                <button id=${producto.id} class= "botonAgregrCarrito">Añadir al carrito</button>
            </div>
        `;
        contenedorProductos.appendChild(tarjetaProducto);   
        let botonAgregarAlCarrito = document.getElementById(producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarAlCarrito(e, productos))
    });
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
    alert("Se ha agregado exitosamente el producto '" + productoBuscado.nombre +"' al carrito.")

}
function crearCarrito(carrito) {
    let contenedorCarrito = document.getElementById("contenedorCarrito");
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
    `;
    carrito.forEach(item => {
        tablaHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>$${item.precioUnitario.toLocaleString()} COP</td>
                <td>${item.unidades}</td>
                <td>$${item.subtotal.toLocaleString()} COP</td>
            </tr>
        `;
    });
    tablaHTML += `
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3">Total</th>
                    <th>$${carrito.reduce((acc, item) => acc + item.subtotal, 0).toLocaleString()}</th>
                </tr>
            </tfoot>
        </table>
    `;
    contenedorCarrito.innerHTML = tablaHTML;
}

function finalizarCompra() {
    localStorage.removeItem("carrito")
    crearCarrito([])
    alert("GRACIAS POR SU COMPRA")
}

function verOcultar(e) {
    e.target.innerText = e.target.innerText === "CARRITO" ? "CATALOGO" : "CARRITO"

    let contenedorProductos = document.getElementById("paginaProductos")
    let contenedorCarrito = document.getElementById("paginaCarrito")

    contenedorCarrito.classList.toggle("oculto")
    contenedorProductos.classList.toggle("oculto")
}


main(productos)

