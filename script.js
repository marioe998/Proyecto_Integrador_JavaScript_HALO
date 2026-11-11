// ============================================================
// UNSC - Sistema de reclutamiento
// Proyecto de JS: no hay servidor ni base de datos, todo se guarda
// en el localStorage del navegador en formato JSON.
// Tiene las mismas 5 entidades que el proyecto de Java:
// ramas, divisiones, divisiones especiales, reclutas y aptos.
// ============================================================


// ============================================================
// 1. DATOS DE EJEMPLO
// Son arreglos de objetos. Cada objeto es como una fila de una tabla.
// Las relaciones se hacen con ids: por ejemplo un recluta tiene
// idRama: 1, que es el id de la rama Marines.
// Estos datos se cargan solo la primera vez para que no salga vacío.
// ============================================================
const ramasEjemplo = [
    { id: 1, nombre: "Marines", descripcion: "Infantería de marina del UNSC" },
    { id: 2, nombre: "Armada", descripcion: "Flota espacial y operaciones navales" },
    { id: 3, nombre: "Fuerza Aérea", descripcion: "Pilotos y apoyo aéreo táctico" },
    { id: 4, nombre: "Ejército", descripcion: "Fuerzas terrestres y logística" }
];

const divisionesEjemplo = [
    { id: 1, nombre: "Infantería Táctica", descripcion: "Combate terrestre de primera línea", idRama: 1 },
    { id: 2, nombre: "Asalto Orbital", descripcion: "Despliegues desde órbita", idRama: 1 },
    { id: 3, nombre: "Flota de Combate", descripcion: "Tripulación de naves de guerra", idRama: 2 },
    { id: 4, nombre: "Inteligencia Naval", descripcion: "Análisis y operaciones encubiertas", idRama: 2 },
    { id: 5, nombre: "Escuadrones de Vuelo", descripcion: "Pilotaje de aeronaves", idRama: 3 },
    { id: 6, nombre: "Ingeniería de Campo", descripcion: "Construcción y demolición", idRama: 4 }
];

const divisionesEspecialesEjemplo = [
    { id: 1, nombre: "ODST", descripcion: "Tropas de choque de descenso orbital", idDivision: 2 },
    { id: 2, nombre: "Programa SPARTAN", descripcion: "Soldados de élite de alto rendimiento", idDivision: 1 },
    { id: 3, nombre: "Reconocimiento", descripcion: "Exploración y avanzada", idDivision: 1 },
    { id: 4, nombre: "Operaciones Encubiertas", descripcion: "Misiones de inteligencia", idDivision: 4 },
    { id: 5, nombre: "Pilotos Pelican", descripcion: "Transporte y apoyo aéreo", idDivision: 5 },
    { id: 6, nombre: "Zapadores", descripcion: "Explosivos y fortificación", idDivision: 6 }
];

const reclutasEjemplo = [
    { id: 1, nombre: "Marta", apellido: "Ríos", altura: 168, peso: 62.5, idRama: 1 },
    { id: 2, nombre: "Julián", apellido: "Ortega", altura: 182, peso: 80.2, idRama: 1 },
    { id: 3, nombre: "Camila", apellido: "Duarte", altura: 175, peso: 68.0, idRama: 2 },
    { id: 4, nombre: "Andrés", apellido: "Molina", altura: 178, peso: 74.8, idRama: 4 },
    { id: 5, nombre: "Valentina", apellido: "Cruz", altura: 171, peso: 63.3, idRama: 3 },
    { id: 6, nombre: "Sebastián", apellido: "Mora", altura: 190, peso: 92.4, idRama: 1 },
    { id: 7, nombre: "Laura", apellido: "Pineda", altura: 165, peso: 58.9, idRama: 2 },
    { id: 8, nombre: "Diego", apellido: "Herrera", altura: 180, peso: 79.0, idRama: 3 },
    { id: 9, nombre: "Natalia", apellido: "Vélez", altura: 173, peso: 66.1, idRama: 4 },
    { id: 10, nombre: "Felipe", apellido: "Arango", altura: 185, peso: 85.6, idRama: 1 }
];

// la fecha se guarda como texto "año-mes-día", que es como la da el input type="date"
const aptosEjemplo = [
    { id: 1, idRecluta: 6, idDivisionEspecial: 2, aptoServicio: true, fechaEvaluacion: "2026-10-02", puntaje: 94 },
    { id: 2, idRecluta: 2, idDivisionEspecial: 1, aptoServicio: true, fechaEvaluacion: "2026-10-05", puntaje: 88 },
    { id: 3, idRecluta: 1, idDivisionEspecial: 3, aptoServicio: true, fechaEvaluacion: "2026-10-09", puntaje: 91 },
    { id: 4, idRecluta: 3, idDivisionEspecial: 4, aptoServicio: false, fechaEvaluacion: "2026-10-12", puntaje: 58 },
    { id: 5, idRecluta: 5, idDivisionEspecial: 5, aptoServicio: true, fechaEvaluacion: "2026-10-18", puntaje: 83 },
    { id: 6, idRecluta: 4, idDivisionEspecial: 6, aptoServicio: true, fechaEvaluacion: "2026-10-21", puntaje: 77 },
    { id: 7, idRecluta: 10, idDivisionEspecial: 1, aptoServicio: false, fechaEvaluacion: "2026-10-25", puntaje: 62 }
];


// ============================================================
// 2. LOCALSTORAGE
// localStorage solo puede guardar TEXTO, no arreglos. Por eso:
//   - para guardar uso JSON.stringify (arreglo -> texto)
//   - para leer uso JSON.parse (texto -> arreglo otra vez)
// Con estas dos funciones hago todo el guardado del proyecto.
// ============================================================

// lee una lista del localStorage. El "|| []" es por si todavía no existe:
// getItem devuelve null y JSON.parse(null) da null, entonces uso un arreglo vacío
const obtenerDatos = (clave) => JSON.parse(localStorage.getItem(clave)) || [];

// guarda una lista en el localStorage
const guardarDatos = (clave, lista) => localStorage.setItem(clave, JSON.stringify(lista));

function guardarEjemplos() {
    guardarDatos("ramas", ramasEjemplo);
    guardarDatos("divisiones", divisionesEjemplo);
    guardarDatos("divisionesEspeciales", divisionesEspecialesEjemplo);
    guardarDatos("reclutas", reclutasEjemplo);
    guardarDatos("aptos", aptosEjemplo);
}

function cargarDatosEjemplo() {
    // si "ramas" no existe (null) es porque es la primera vez que se abre la página
    if (localStorage.getItem("ramas") === null) {
        guardarEjemplos();
    }
}

// botón de arriba: borra todo lo que hice y vuelve a poner los datos de ejemplo
function restablecerDatos() {
    const seguro = confirm("Se borrarán los cambios y se cargarán los datos de ejemplo. ¿Continuar?");
    if (seguro) {
        guardarEjemplos();
        // también limpio los formularios por si había algo a medio editar
        limpiarRama();
        limpiarDivision();
        limpiarDivisionEspecial();
        limpiarRecluta();
        limpiarApto();
        limpiarConsulta();
        limpiarDetalle();
        mostrarTodo();
        mostrarMensaje("Datos restablecidos");
    }
}


// ============================================================
// 3. MENSAJE EMERGENTE
// Es el cuadrito que sale abajo a la derecha.
// Si le paso "error" como segundo valor sale con borde rojo.
// ============================================================
function mostrarMensaje(texto, tipo) {
    // creo el div desde JS (todavía no se ve, solo existe en memoria)
    const aviso = document.createElement("div");
    aviso.className = "aviso";
    if (tipo === "error") {
        aviso.classList.add("aviso--error");
    } else {
        aviso.classList.add("aviso--exito");
    }
    aviso.textContent = texto;

    // appendChild lo mete dentro del div #avisos y ahí recién aparece en pantalla
    document.getElementById("avisos").appendChild(aviso);

    // a los 3 segundos (3000 ms) lo borro
    setTimeout(() => aviso.remove(), 3000);
}


// ============================================================
// 4. MENÚ
// En realidad es una sola página. Todas las secciones existen en el HTML
// pero solo se ve la que tiene la clase "activa".
// ============================================================
function mostrarVista(nombre) {
    // primero le quito la clase "activa" a todas las secciones y a todos los botones
    document.querySelectorAll(".vista").forEach((vista) => vista.classList.remove("activa"));
    document.querySelectorAll(".menu__item").forEach((boton) => boton.classList.remove("activo"));

    // y se la pongo solo a la sección que eligió el usuario y a su botón.
    // Las comillas invertidas (``) permiten meter variables con ${}
    document.getElementById(`vista-${nombre}`).classList.add("activa");
    document.querySelector(`[data-vista="${nombre}"]`).classList.add("activo");

    // cada vez que cambio de pestaña redibujo todo, así las tablas y las listas
    // desplegables siempre salen con los datos más nuevos
    mostrarTodo();
}

// a cada botón del menú le pongo un "oyente" del evento click.
// boton.dataset.vista lee el atributo data-vista="..." que puse en el HTML
document.querySelectorAll(".menu__item").forEach((boton) => {
    boton.addEventListener("click", () => {
        mostrarVista(boton.dataset.vista);
    });
});


// ============================================================
// 5. FUNCIONES DE AYUDA
// Las uso en varios lados para no repetir código.
// ============================================================

// el id nuevo es el id más grande que haya + 1
// (así nunca se repite, ni siquiera si borro uno del medio)
function siguienteId(lista) {
    let mayor = 0;
    lista.forEach((item) => {
        if (item.id > mayor) {
            mayor = item.id;
        }
    });
    return mayor + 1;
}

// busca en una lista el elemento con ese id y devuelve su nombre.
// find devuelve el primer elemento que cumpla la condición (o undefined si no hay)
function nombreDe(lista, id) {
    const item = lista.find((x) => x.id === id);
    if (item) {
        return item.nombre;
    }
    return "—";
}

// junta nombre y apellido de un recluta
function nombreCompleto(recluta) {
    if (recluta) {
        return `${recluta.nombre} ${recluta.apellido}`;
    }
    return "—";
}

// si el valor está vacío muestro un guion en vez de dejar la celda en blanco
function valorOGuion(valor) {
    if (valor === null || valor === "") {
        return "—";
    }
    return valor;
}

// la fecha viene como 2026-10-02 y la quiero ver como 02/10/2026.
// split("-") la corta en pedacitos: ["2026", "10", "02"]
function formatearFecha(fechaIso) {
    const partes = fechaIso.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// devuelve el HTML de la etiqueta verde (Apto) o roja (No apto)
function etiquetaApto(esApto) {
    if (esApto) {
        return `<span class="etiqueta etiqueta--apto">Apto</span>`;
    }
    return `<span class="etiqueta etiqueta--no-apto">No apto</span>`;
}

// llena un <select> con opciones. "opciones" es un arreglo de objetos { id, texto }
function llenarSelect(idSelect, opciones, textoInicial) {
    const select = document.getElementById(idSelect);

    // guardo lo que estaba elegido porque al borrar las opciones se pierde
    const anterior = select.value;

    select.innerHTML = `<option value="">${textoInicial}</option>`;
    opciones.forEach((o) => {
        select.innerHTML += `<option value="${o.id}">${o.texto}</option>`;
    });

    // vuelvo a dejar elegido lo de antes
    select.value = anterior;
}

// llena todas las listas desplegables de la página.
// Hace lo mismo que recargarCombos() del MainView de Java
function actualizarSelects() {
    const ramas = obtenerDatos("ramas");
    const divisiones = obtenerDatos("divisiones");
    const especiales = obtenerDatos("divisionesEspeciales");
    const reclutas = obtenerDatos("reclutas");

    // map transforma cada elemento de la lista en otra cosa.
    // Aquí convierto cada rama en { id, texto } que es lo que pide llenarSelect
    const opcionesRamas = ramas.map((r) => ({ id: r.id, texto: r.nombre }));

    // para las divisiones muestro también la rama, ej: "Asalto Orbital (Marines)"
    const opcionesDivisiones = divisiones.map((d) => ({
        id: d.id,
        texto: `${d.nombre} (${nombreDe(ramas, d.idRama)})`
    }));

    const opcionesEspeciales = especiales.map((de) => ({
        id: de.id,
        texto: `${de.nombre} (${nombreDe(divisiones, de.idDivision)})`
    }));

    const opcionesReclutas = reclutas.map((r) => ({ id: r.id, texto: nombreCompleto(r) }));

    llenarSelect("divRama", opcionesRamas, "Seleccione una rama");
    llenarSelect("recRama", opcionesRamas, "Seleccione una rama");
    llenarSelect("deDivision", opcionesDivisiones, "Seleccione una división");
    llenarSelect("aptoRecluta", opcionesReclutas, "Seleccione un recluta");
    llenarSelect("aptoDivEsp", opcionesEspeciales, "Seleccione una división especial");
    llenarSelect("conDivision", opcionesDivisiones, "Seleccione una división");
    llenarSelect("conDivEsp", opcionesEspeciales, "Seleccione una división especial");
    llenarSelect("conDivisionDetalle", opcionesDivisiones, "Seleccione una división");
}

// vuelve a dibujar todo. La llamo cada vez que algo cambia
function mostrarTodo() {
    mostrarPanel();
    mostrarRamas();
    mostrarDivisiones();
    mostrarDivisionesEspeciales();
    mostrarReclutas();
    mostrarAptos();
    actualizarSelects();
}


// ============================================================
// 6. PANEL PRINCIPAL
// ============================================================

// ----- tarjetas de arriba -----
function mostrarTarjetas() {
    const reclutas = obtenerDatos("reclutas");
    const aptos = obtenerDatos("aptos");
    const divisiones = obtenerDatos("divisiones");
    const divisionesEspeciales = obtenerDatos("divisionesEspeciales");

    // filter me deja solo los elementos que cumplen la condición
    const aprobados = aptos.filter((a) => a.aptoServicio === true);

    // sumo todos los puntajes con un forEach para sacar el promedio
    let suma = 0;
    aptos.forEach((a) => {
        suma += a.puntaje;
    });

    // ojo: si no hay evaluaciones, dividir entre 0 daría error, por eso el if
    let promedio = 0;
    if (aptos.length > 0) {
        promedio = (suma / aptos.length).toFixed(1); // toFixed(1) deja un solo decimal
    }

    const tarjetas = [
        { etiqueta: "Reclutas", valor: reclutas.length, icono: "ti-users", color: "" },
        { etiqueta: "Aptos para servicio", valor: aprobados.length, icono: "ti-circle-check", color: "tarjeta--dorado" },
        { etiqueta: "Divisiones", valor: divisiones.length, icono: "ti-sitemap", color: "" },
        { etiqueta: "Div. especiales", valor: divisionesEspeciales.length, icono: "ti-star", color: "tarjeta--cian" },
        { etiqueta: "Puntaje medio", valor: promedio, icono: "ti-target", color: "tarjeta--dorado" }
    ];

    // primero vacío el contenedor y luego voy agregando una tarjeta por cada elemento.
    // innerHTML += agrega HTML nuevo al final de lo que ya había
    const contenedor = document.getElementById("tarjetas");
    contenedor.innerHTML = "";

    tarjetas.forEach((t) => {
        contenedor.innerHTML += `
            <article class="tarjeta ${t.color}">
                <i class="ti ${t.icono} tarjeta__icono"></i>
                <div>
                    <div class="tarjeta__etiqueta">${t.etiqueta}</div>
                    <div class="tarjeta__valor">${t.valor}</div>
                </div>
            </article>
        `;
    });
}

// ----- barras: reclutas por rama -----
function mostrarGrafico() {
    const ramas = obtenerDatos("ramas");
    const reclutas = obtenerDatos("reclutas");

    // por cada rama cuento cuántos reclutas tiene (filter + .length).
    // Queda un arreglo con los números, en el mismo orden que las ramas, ej: [4, 2, 2, 2]
    const cantidades = ramas.map((rama) => {
        return reclutas.filter((r) => r.idRama === rama.id).length;
    });

    // busco la cantidad más grande. La barra más larga ocupa el 100%
    // y las demás se calculan respecto a esa
    let maximo = 1; // empieza en 1 para no dividir entre 0
    cantidades.forEach((c) => {
        if (c > maximo) {
            maximo = c;
        }
    });

    const contenedor = document.getElementById("grafico");
    contenedor.innerHTML = "";

    // el forEach me da el elemento (rama) y su posición (i).
    // Uso i para sacar la cantidad que le corresponde a esa rama
    ramas.forEach((rama, i) => {
        const ancho = (cantidades[i] / maximo) * 100;
        contenedor.innerHTML += `
            <div class="barra">
                <div class="barra__texto">
                    <span>${rama.nombre}</span>
                    <span>${cantidades[i]}</span>
                </div>
                <div class="barra__fondo">
                    <div class="barra__relleno" style="width: ${ancho}%"></div>
                </div>
            </div>
        `;
    });
}

// ----- tabla: las 5 evaluaciones más recientes -----
function mostrarEvaluaciones() {
    const aptos = obtenerDatos("aptos");
    const reclutas = obtenerDatos("reclutas");
    const especiales = obtenerDatos("divisionesEspeciales");

    const cuerpo = document.getElementById("tablaEvaluaciones");
    cuerpo.innerHTML = "";

    if (aptos.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="5" class="vacio">Aún no hay evaluaciones registradas.</td></tr>`;
        return;
    }

    // sort ordena la lista. Comparo las fechas como texto con localeCompare.
    // Como van en formato año-mes-día se ordenan bien. b contra a = de más nueva a más vieja
    aptos.sort((a, b) => b.fechaEvaluacion.localeCompare(a.fechaEvaluacion));

    // slice(0, 5) me da solo los primeros 5
    const ultimos = aptos.slice(0, 5);

    ultimos.forEach((apto) => {
        const recluta = reclutas.find((r) => r.id === apto.idRecluta);

        cuerpo.innerHTML += `
            <tr>
                <td>${nombreCompleto(recluta)}</td>
                <td>${nombreDe(especiales, apto.idDivisionEspecial)}</td>
                <td class="mono">${formatearFecha(apto.fechaEvaluacion)}</td>
                <td class="mono">${apto.puntaje}</td>
                <td>${etiquetaApto(apto.aptoServicio)}</td>
            </tr>
        `;
    });
}

function mostrarPanel() {
    mostrarTarjetas();
    mostrarGrafico();
    mostrarEvaluaciones();
}


// ============================================================
// 7. RAMAS
// Los 4 CRUD (ramas, divisiones, divisiones especiales y reclutas) usan
// el mismo patrón de 5 funciones:
//   mostrarX()  -> dibuja la tabla
//   guardarX()  -> crea (si no hay ID) o actualiza (si ya hay ID)
//   editarX()   -> pasa los datos de una fila al formulario
//   eliminarX() -> borra, pero solo si no hay datos que dependan de eso
//   limpiarX()  -> deja el formulario vacío
// ============================================================
function mostrarRamas() {
    const ramas = obtenerDatos("ramas");
    const cuerpo = document.getElementById("tablaRamas");
    cuerpo.innerHTML = "";

    if (ramas.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="4" class="vacio">No hay ramas registradas.</td></tr>`;
        return;
    }

    // en cada fila los botones llevan el id en el onclick, ej: editarRama(3).
    // Así cada botón sabe a qué rama pertenece
    ramas.forEach((r) => {
        cuerpo.innerHTML += `
            <tr>
                <td class="mono">${r.id}</td>
                <td>${r.nombre}</td>
                <td>${valorOGuion(r.descripcion)}</td>
                <td class="acciones">
                    <button class="boton boton--pequeno boton--secundario" onclick="editarRama(${r.id})"><i class="ti ti-edit"></i> Editar</button>
                    <button class="boton boton--pequeno boton--peligro" onclick="eliminarRama(${r.id})"><i class="ti ti-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function guardarRama() {
    // .value saca lo que el usuario escribió. trim() le quita los espacios de los lados
    const id = document.getElementById("ramaId").value;
    const nombre = document.getElementById("ramaNombre").value.trim();
    const descripcion = document.getElementById("ramaDescripcion").value.trim();

    // validación: el nombre es obligatorio. El return corta la función aquí
    if (nombre === "") {
        mostrarMensaje("Ingrese el nombre de la rama", "error");
        return;
    }

    const ramas = obtenerDatos("ramas");

    if (id === "") {
        // no hay ID en el formulario = es una rama nueva.
        // push agrega el objeto al final del arreglo
        ramas.push({ id: siguienteId(ramas), nombre: nombre, descripcion: descripcion });
        mostrarMensaje("Rama guardada");
    } else {
        // sí hay ID = estoy editando una que ya existe.
        // La busco (el ID del formulario es texto, por eso Number()) y le cambio los datos
        const rama = ramas.find((r) => r.id === Number(id));
        rama.nombre = nombre;
        rama.descripcion = descripcion;
        mostrarMensaje("Rama actualizada");
    }

    guardarDatos("ramas", ramas);
    limpiarRama();
    mostrarTodo();
}

// pasa los datos de la fila al formulario para poder modificarlos
function editarRama(id) {
    const rama = obtenerDatos("ramas").find((r) => r.id === id);
    document.getElementById("ramaId").value = rama.id;
    document.getElementById("ramaNombre").value = rama.nombre;
    document.getElementById("ramaDescripcion").value = rama.descripcion;
    document.getElementById("ramaNombre").focus(); // deja el cursor listo en el campo
}

function eliminarRama(id) {
    // en Java la base de datos no deja borrar una rama si tiene divisiones o reclutas.
    // Aquí lo tengo que revisar yo a mano: busco si alguien usa esta rama
    const divisiones = obtenerDatos("divisiones").filter((d) => d.idRama === id);
    const reclutas = obtenerDatos("reclutas").filter((r) => r.idRama === id);

    if (divisiones.length > 0 || reclutas.length > 0) {
        mostrarMensaje("No se puede eliminar: la rama tiene divisiones o reclutas", "error");
        return;
    }

    if (confirm("¿Eliminar esta rama?")) {
        // para borrar uso filter: me quedo con todas las ramas MENOS la que borro
        const ramas = obtenerDatos("ramas").filter((r) => r.id !== id);
        guardarDatos("ramas", ramas);
        limpiarRama();
        mostrarTodo();
        mostrarMensaje("Rama eliminada");
    }
}

function limpiarRama() {
    document.getElementById("ramaId").value = "";
    document.getElementById("ramaNombre").value = "";
    document.getElementById("ramaDescripcion").value = "";
}


// ============================================================
// 8. DIVISIONES
// (mismo patrón que Ramas, solo que además tiene el select de la rama)
// ============================================================
function mostrarDivisiones() {
    const divisiones = obtenerDatos("divisiones");
    const ramas = obtenerDatos("ramas");
    const cuerpo = document.getElementById("tablaDivisiones");
    cuerpo.innerHTML = "";

    if (divisiones.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="5" class="vacio">No hay divisiones registradas.</td></tr>`;
        return;
    }

    divisiones.forEach((d) => {
        cuerpo.innerHTML += `
            <tr>
                <td class="mono">${d.id}</td>
                <td>${d.nombre}</td>
                <td>${valorOGuion(d.descripcion)}</td>
                <td>${nombreDe(ramas, d.idRama)}</td>
                <td class="acciones">
                    <button class="boton boton--pequeno boton--secundario" onclick="editarDivision(${d.id})"><i class="ti ti-edit"></i> Editar</button>
                    <button class="boton boton--pequeno boton--peligro" onclick="eliminarDivision(${d.id})"><i class="ti ti-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function guardarDivision() {
    const id = document.getElementById("divId").value;
    const nombre = document.getElementById("divNombre").value.trim();
    const descripcion = document.getElementById("divDescripcion").value.trim();
    const idRama = document.getElementById("divRama").value;

    if (nombre === "") {
        mostrarMensaje("Ingrese el nombre de la división", "error");
        return;
    }
    if (idRama === "") {
        mostrarMensaje("Seleccione una rama", "error");
        return;
    }

    const divisiones = obtenerDatos("divisiones");

    if (id === "") {
        // el value del select es texto, lo paso a número con Number() para guardarlo bien
        divisiones.push({
            id: siguienteId(divisiones),
            nombre: nombre,
            descripcion: descripcion,
            idRama: Number(idRama)
        });
        mostrarMensaje("División guardada");
    } else {
        const division = divisiones.find((d) => d.id === Number(id));
        division.nombre = nombre;
        division.descripcion = descripcion;
        division.idRama = Number(idRama);
        mostrarMensaje("División actualizada");
    }

    guardarDatos("divisiones", divisiones);
    limpiarDivision();
    mostrarTodo();
}

function editarDivision(id) {
    const division = obtenerDatos("divisiones").find((d) => d.id === id);
    document.getElementById("divId").value = division.id;
    document.getElementById("divNombre").value = division.nombre;
    document.getElementById("divDescripcion").value = division.descripcion;
    document.getElementById("divRama").value = division.idRama; // así queda elegida su rama en el select
    document.getElementById("divNombre").focus();
}

function eliminarDivision(id) {
    // una división con divisiones especiales no se puede borrar
    const especiales = obtenerDatos("divisionesEspeciales").filter((de) => de.idDivision === id);

    if (especiales.length > 0) {
        mostrarMensaje("No se puede eliminar: la división tiene divisiones especiales", "error");
        return;
    }

    if (confirm("¿Eliminar esta división?")) {
        const divisiones = obtenerDatos("divisiones").filter((d) => d.id !== id);
        guardarDatos("divisiones", divisiones);
        limpiarDivision();
        mostrarTodo();
        mostrarMensaje("División eliminada");
    }
}

function limpiarDivision() {
    document.getElementById("divId").value = "";
    document.getElementById("divNombre").value = "";
    document.getElementById("divDescripcion").value = "";
    document.getElementById("divRama").value = "";
}


// ============================================================
// 9. DIVISIONES ESPECIALES
// ============================================================
function mostrarDivisionesEspeciales() {
    const especiales = obtenerDatos("divisionesEspeciales");
    const divisiones = obtenerDatos("divisiones");
    const cuerpo = document.getElementById("tablaDivisionesEspeciales");
    cuerpo.innerHTML = "";

    if (especiales.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="5" class="vacio">No hay divisiones especiales registradas.</td></tr>`;
        return;
    }

    especiales.forEach((de) => {
        cuerpo.innerHTML += `
            <tr>
                <td class="mono">${de.id}</td>
                <td>${de.nombre}</td>
                <td>${valorOGuion(de.descripcion)}</td>
                <td>${nombreDe(divisiones, de.idDivision)}</td>
                <td class="acciones">
                    <button class="boton boton--pequeno boton--secundario" onclick="editarDivisionEspecial(${de.id})"><i class="ti ti-edit"></i> Editar</button>
                    <button class="boton boton--pequeno boton--peligro" onclick="eliminarDivisionEspecial(${de.id})"><i class="ti ti-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function guardarDivisionEspecial() {
    const id = document.getElementById("deId").value;
    const nombre = document.getElementById("deNombre").value.trim();
    const descripcion = document.getElementById("deDescripcion").value.trim();
    const idDivision = document.getElementById("deDivision").value;

    if (nombre === "") {
        mostrarMensaje("Ingrese el nombre de la división especial", "error");
        return;
    }
    if (idDivision === "") {
        mostrarMensaje("Seleccione una división", "error");
        return;
    }

    const especiales = obtenerDatos("divisionesEspeciales");

    if (id === "") {
        especiales.push({
            id: siguienteId(especiales),
            nombre: nombre,
            descripcion: descripcion,
            idDivision: Number(idDivision)
        });
        mostrarMensaje("División especial guardada");
    } else {
        const especial = especiales.find((de) => de.id === Number(id));
        especial.nombre = nombre;
        especial.descripcion = descripcion;
        especial.idDivision = Number(idDivision);
        mostrarMensaje("División especial actualizada");
    }

    guardarDatos("divisionesEspeciales", especiales);
    limpiarDivisionEspecial();
    mostrarTodo();
}

function editarDivisionEspecial(id) {
    const especial = obtenerDatos("divisionesEspeciales").find((de) => de.id === id);
    document.getElementById("deId").value = especial.id;
    document.getElementById("deNombre").value = especial.nombre;
    document.getElementById("deDescripcion").value = especial.descripcion;
    document.getElementById("deDivision").value = especial.idDivision;
    document.getElementById("deNombre").focus();
}

function eliminarDivisionEspecial(id) {
    // si ya hay reclutas evaluados en esta división especial no se puede borrar
    const aptos = obtenerDatos("aptos").filter((a) => a.idDivisionEspecial === id);

    if (aptos.length > 0) {
        mostrarMensaje("No se puede eliminar: tiene reclutas evaluados", "error");
        return;
    }

    if (confirm("¿Eliminar esta división especial?")) {
        const especiales = obtenerDatos("divisionesEspeciales").filter((de) => de.id !== id);
        guardarDatos("divisionesEspeciales", especiales);
        limpiarDivisionEspecial();
        mostrarTodo();
        mostrarMensaje("División especial eliminada");
    }
}

function limpiarDivisionEspecial() {
    document.getElementById("deId").value = "";
    document.getElementById("deNombre").value = "";
    document.getElementById("deDescripcion").value = "";
    document.getElementById("deDivision").value = "";
}


// ============================================================
// 10. RECLUTAS
// ============================================================
function mostrarReclutas() {
    const reclutas = obtenerDatos("reclutas");
    const ramas = obtenerDatos("ramas");
    const aptos = obtenerDatos("aptos");
    const cuerpo = document.getElementById("tablaReclutas");
    cuerpo.innerHTML = "";

    if (reclutas.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="8" class="vacio">No hay reclutas registrados.</td></tr>`;
        return;
    }

    reclutas.forEach((r) => {
        // la columna "Evaluado" dice Sí si el recluta tiene un registro en la lista de aptos.
        // En Java esto era la relación @OneToOne entre Recluta y AptoDivisionEspecial
        let evaluado = "—";
        if (aptos.find((a) => a.idRecluta === r.id)) {
            evaluado = "Sí";
        }

        cuerpo.innerHTML += `
            <tr>
                <td class="mono">${r.id}</td>
                <td>${r.nombre}</td>
                <td>${r.apellido}</td>
                <td class="mono">${valorOGuion(r.altura)}</td>
                <td class="mono">${valorOGuion(r.peso)}</td>
                <td>${nombreDe(ramas, r.idRama)}</td>
                <td>${evaluado}</td>
                <td class="acciones">
                    <button class="boton boton--pequeno boton--secundario" onclick="editarRecluta(${r.id})"><i class="ti ti-edit"></i> Editar</button>
                    <button class="boton boton--pequeno boton--peligro" onclick="eliminarRecluta(${r.id})"><i class="ti ti-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function guardarRecluta() {
    const id = document.getElementById("recId").value;
    const nombre = document.getElementById("recNombre").value.trim();
    const apellido = document.getElementById("recApellido").value.trim();
    const alturaTexto = document.getElementById("recAltura").value;
    const pesoTexto = document.getElementById("recPeso").value;
    const idRama = document.getElementById("recRama").value;

    if (nombre === "") {
        mostrarMensaje("Ingrese el nombre del recluta", "error");
        return;
    }
    if (apellido === "") {
        mostrarMensaje("Ingrese el apellido del recluta", "error");
        return;
    }
    if (idRama === "") {
        mostrarMensaje("Seleccione una rama", "error");
        return;
    }

    // la altura y el peso son opcionales (en Java pueden ser null).
    // Si el campo está vacío guardo null, si no lo paso a número
    let altura = null;
    if (alturaTexto !== "") {
        altura = Number(alturaTexto);
    }
    let peso = null;
    if (pesoTexto !== "") {
        peso = Number(pesoTexto);
    }

    // pero si los escribieron, tienen que ser mayores que 0
    if ((altura !== null && altura <= 0) || (peso !== null && peso <= 0)) {
        mostrarMensaje("La altura y el peso deben ser mayores que 0", "error");
        return;
    }

    const reclutas = obtenerDatos("reclutas");

    if (id === "") {
        reclutas.push({
            id: siguienteId(reclutas),
            nombre: nombre,
            apellido: apellido,
            altura: altura,
            peso: peso,
            idRama: Number(idRama)
        });
        mostrarMensaje("Recluta guardado");
    } else {
        const recluta = reclutas.find((r) => r.id === Number(id));
        recluta.nombre = nombre;
        recluta.apellido = apellido;
        recluta.altura = altura;
        recluta.peso = peso;
        recluta.idRama = Number(idRama);
        mostrarMensaje("Recluta actualizado");
    }

    guardarDatos("reclutas", reclutas);
    limpiarRecluta();
    mostrarTodo();
}

function editarRecluta(id) {
    const recluta = obtenerDatos("reclutas").find((r) => r.id === id);
    document.getElementById("recId").value = recluta.id;
    document.getElementById("recNombre").value = recluta.nombre;
    document.getElementById("recApellido").value = recluta.apellido;
    document.getElementById("recAltura").value = recluta.altura;
    document.getElementById("recPeso").value = recluta.peso;
    document.getElementById("recRama").value = recluta.idRama;
    document.getElementById("recNombre").focus();
}

function eliminarRecluta(id) {
    // si el recluta ya tiene una evaluación, primero hay que borrar esa evaluación
    const aptos = obtenerDatos("aptos").filter((a) => a.idRecluta === id);

    if (aptos.length > 0) {
        mostrarMensaje("No se puede eliminar: el recluta tiene una evaluación", "error");
        return;
    }

    if (confirm("¿Eliminar este recluta?")) {
        const reclutas = obtenerDatos("reclutas").filter((r) => r.id !== id);
        guardarDatos("reclutas", reclutas);
        limpiarRecluta();
        mostrarTodo();
        mostrarMensaje("Recluta eliminado");
    }
}

function limpiarRecluta() {
    document.getElementById("recId").value = "";
    document.getElementById("recNombre").value = "";
    document.getElementById("recApellido").value = "";
    document.getElementById("recAltura").value = "";
    document.getElementById("recPeso").value = "";
    document.getElementById("recRama").value = "";
}


// ============================================================
// 11. APTOS DIVISIÓN ESPECIAL
// Aquí se asigna un recluta a una división especial y se guarda su
// evaluación (apto o no, fecha y puntaje).
// ============================================================
function mostrarAptos() {
    const aptos = obtenerDatos("aptos");
    const reclutas = obtenerDatos("reclutas");
    const especiales = obtenerDatos("divisionesEspeciales");
    const cuerpo = document.getElementById("tablaAptos");
    cuerpo.innerHTML = "";

    if (aptos.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="7" class="vacio">No hay evaluaciones registradas.</td></tr>`;
        return;
    }

    aptos.forEach((a) => {
        const recluta = reclutas.find((r) => r.id === a.idRecluta);

        cuerpo.innerHTML += `
            <tr>
                <td class="mono">${a.id}</td>
                <td>${nombreCompleto(recluta)}</td>
                <td>${nombreDe(especiales, a.idDivisionEspecial)}</td>
                <td>${etiquetaApto(a.aptoServicio)}</td>
                <td class="mono">${formatearFecha(a.fechaEvaluacion)}</td>
                <td class="mono">${a.puntaje}</td>
                <td class="acciones">
                    <button class="boton boton--pequeno boton--secundario" onclick="editarApto(${a.id})"><i class="ti ti-edit"></i> Editar</button>
                    <button class="boton boton--pequeno boton--peligro" onclick="eliminarApto(${a.id})"><i class="ti ti-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function guardarApto() {
    const id = document.getElementById("aptoId").value;
    const idRecluta = document.getElementById("aptoRecluta").value;
    const idEspecial = document.getElementById("aptoDivEsp").value;
    const fecha = document.getElementById("aptoFecha").value;
    const puntajeTexto = document.getElementById("aptoPuntaje").value;

    // el checkbox no se lee con .value sino con .checked, que da true o false
    const aptoServicio = document.getElementById("aptoServicio").checked;

    if (idRecluta === "") {
        mostrarMensaje("Seleccione un recluta", "error");
        return;
    }
    if (idEspecial === "") {
        mostrarMensaje("Seleccione una división especial", "error");
        return;
    }
    if (fecha === "") {
        mostrarMensaje("Ingrese la fecha de evaluación", "error");
        return;
    }
    if (puntajeTexto === "") {
        mostrarMensaje("Ingrese el puntaje", "error");
        return;
    }

    // el puntaje tiene que ser un entero entre 0 y 100.
    // (puntaje % 1 !== 0 es una forma de revisar que no tenga decimales)
    const puntaje = Number(puntajeTexto);
    if (puntaje < 0 || puntaje > 100 || puntaje % 1 !== 0) {
        mostrarMensaje("El puntaje debe ser un número entero entre 0 y 100", "error");
        return;
    }

    const aptos = obtenerDatos("aptos");

    // en Java la columna id_recluta era unique: un recluta solo puede tener UNA evaluación.
    // Busco si ese recluta ya está en otra evaluación distinta a la que estoy editando.
    // (si estoy creando, id es "" y Number("") da 0, así que ninguna coincide con 0)
    const repetido = aptos.find((a) => a.idRecluta === Number(idRecluta) && a.id !== Number(id));
    if (repetido) {
        mostrarMensaje("Ese recluta ya tiene una evaluación", "error");
        return;
    }

    if (id === "") {
        aptos.push({
            id: siguienteId(aptos),
            idRecluta: Number(idRecluta),
            idDivisionEspecial: Number(idEspecial),
            aptoServicio: aptoServicio,
            fechaEvaluacion: fecha,
            puntaje: puntaje
        });
        mostrarMensaje("Evaluación guardada");
    } else {
        const apto = aptos.find((a) => a.id === Number(id));
        apto.idRecluta = Number(idRecluta);
        apto.idDivisionEspecial = Number(idEspecial);
        apto.aptoServicio = aptoServicio;
        apto.fechaEvaluacion = fecha;
        apto.puntaje = puntaje;
        mostrarMensaje("Evaluación actualizada");
    }

    guardarDatos("aptos", aptos);
    limpiarApto();
    mostrarTodo();
}

function editarApto(id) {
    const apto = obtenerDatos("aptos").find((a) => a.id === id);
    document.getElementById("aptoId").value = apto.id;
    document.getElementById("aptoRecluta").value = apto.idRecluta;
    document.getElementById("aptoDivEsp").value = apto.idDivisionEspecial;
    document.getElementById("aptoFecha").value = apto.fechaEvaluacion;
    document.getElementById("aptoPuntaje").value = apto.puntaje;
    document.getElementById("aptoServicio").checked = apto.aptoServicio; // marca o desmarca el checkbox
    document.getElementById("aptoPuntaje").focus();
}

function eliminarApto(id) {
    // la evaluación no tiene nada que dependa de ella, se puede borrar directo
    if (confirm("¿Eliminar esta evaluación?")) {
        const aptos = obtenerDatos("aptos").filter((a) => a.id !== id);
        guardarDatos("aptos", aptos);
        limpiarApto();
        mostrarTodo();
        mostrarMensaje("Evaluación eliminada");
    }
}

function limpiarApto() {
    document.getElementById("aptoId").value = "";
    document.getElementById("aptoRecluta").value = "";
    document.getElementById("aptoDivEsp").value = "";
    document.getElementById("aptoFecha").value = "";
    document.getElementById("aptoPuntaje").value = "";
    document.getElementById("aptoServicio").checked = false;
}


// ============================================================
// 12. CONSULTAS
// Son las mismas consultas que hacía el CrudService en Java con HQL,
// pero aquí las hago a mano con filter y find.
// ============================================================

// devuelve las evaluaciones de todas las divisiones especiales de UNA división.
// Es el equivalente al JOIN de Java: aptos -> división especial -> división
function obtenerAptosDeDivision(idDivision) {
    const especiales = obtenerDatos("divisionesEspeciales");
    const aptos = obtenerDatos("aptos");

    // paso 1: me quedo con las divisiones especiales de esa división
    // y con map saco solo sus ids, queda algo como [2, 3]
    const idsEspeciales = especiales
        .filter((de) => de.idDivision === idDivision)
        .map((de) => de.id);

    // paso 2: me quedo con los aptos cuya división especial esté en esa lista.
    // includes responde true si el valor está dentro del arreglo
    return aptos.filter((a) => idsEspeciales.includes(a.idDivisionEspecial));
}

// ----- consulta 1: soldados de una división o de una división especial -----

// regla (igual que en la app de Java): si elijo una división se borra la división
// especial, y al revés. Uso addEventListener con el evento "change" de los select
document.getElementById("conDivision").addEventListener("change", () => {
    if (document.getElementById("conDivision").value !== "") {
        document.getElementById("conDivEsp").value = "";
        document.getElementById("conSoloAptos").disabled = false;
    }
});

document.getElementById("conDivEsp").addEventListener("change", () => {
    const hayEspecial = document.getElementById("conDivEsp").value !== "";
    if (hayEspecial) {
        document.getElementById("conDivision").value = "";
    }
    // "Solo aptos" solo sirve para divisiones, así que lo bloqueo si hay una especial elegida
    document.getElementById("conSoloAptos").disabled = hayEspecial;
});

function buscarSoldados() {
    const idDivision = document.getElementById("conDivision").value;
    const idEspecial = document.getElementById("conDivEsp").value;
    const soloAptos = document.getElementById("conSoloAptos").checked;

    let aptos = [];

    if (idEspecial !== "") {
        // caso 1: eligió una división especial -> las evaluaciones de esa especial
        aptos = obtenerDatos("aptos").filter((a) => a.idDivisionEspecial === Number(idEspecial));
    } else if (idDivision !== "") {
        // caso 2: eligió una división -> las de todas sus divisiones especiales
        aptos = obtenerAptosDeDivision(Number(idDivision));
        if (soloAptos) {
            aptos = aptos.filter((a) => a.aptoServicio === true);
        }
    } else {
        mostrarMensaje("Seleccione una división o una división especial", "error");
        return;
    }

    // de cada evaluación saco el recluta (la evaluación solo guarda su id)
    const reclutas = obtenerDatos("reclutas");
    const soldados = [];
    aptos.forEach((a) => {
        const recluta = reclutas.find((r) => r.id === a.idRecluta);
        if (recluta) {
            soldados.push(recluta);
        }
    });

    // los ordeno por apellido y, si el apellido es igual, por nombre
    soldados.sort((a, b) => {
        if (a.apellido !== b.apellido) {
            return a.apellido.localeCompare(b.apellido);
        }
        return a.nombre.localeCompare(b.nombre);
    });

    // dibujo la tabla de resultados
    const ramas = obtenerDatos("ramas");
    const cuerpo = document.getElementById("tablaSoldados");
    cuerpo.innerHTML = "";

    if (soldados.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="6" class="vacio">No se encontraron soldados adscritos.</td></tr>`;
        mostrarMensaje("No se encontraron soldados adscritos", "error");
        return;
    }

    soldados.forEach((r) => {
        cuerpo.innerHTML += `
            <tr>
                <td class="mono">${r.id}</td>
                <td>${r.nombre}</td>
                <td>${r.apellido}</td>
                <td class="mono">${valorOGuion(r.altura)}</td>
                <td class="mono">${valorOGuion(r.peso)}</td>
                <td>${nombreDe(ramas, r.idRama)}</td>
            </tr>
        `;
    });

    mostrarMensaje("Soldados encontrados: " + soldados.length);
}

function limpiarConsulta() {
    document.getElementById("conDivision").value = "";
    document.getElementById("conDivEsp").value = "";
    document.getElementById("conSoloAptos").checked = false;
    document.getElementById("conSoloAptos").disabled = false;
    document.getElementById("tablaSoldados").innerHTML =
        `<tr><td colspan="6" class="vacio">Elige una división o una división especial y pulsa buscar.</td></tr>`;
}

// ----- consulta 2: adscripciones detalladas de una división -----
function verAdscripciones() {
    const idDivision = document.getElementById("conDivisionDetalle").value;

    if (idDivision === "") {
        mostrarMensaje("Seleccione una división", "error");
        return;
    }

    const aptos = obtenerAptosDeDivision(Number(idDivision));
    const reclutas = obtenerDatos("reclutas");
    const ramas = obtenerDatos("ramas");
    const especiales = obtenerDatos("divisionesEspeciales");
    const divisiones = obtenerDatos("divisiones");

    // armo una lista de { apto, recluta } para poder ordenar por el apellido del recluta
    const filas = aptos.map((a) => {
        return { apto: a, recluta: reclutas.find((r) => r.id === a.idRecluta) };
    });

    filas.sort((x, y) => {
        if (x.recluta.apellido !== y.recluta.apellido) {
            return x.recluta.apellido.localeCompare(y.recluta.apellido);
        }
        return x.recluta.nombre.localeCompare(y.recluta.nombre);
    });

    const cuerpo = document.getElementById("tablaAdscripciones");
    cuerpo.innerHTML = "";

    if (filas.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="8" class="vacio">No hay adscripciones para esta división.</td></tr>`;
        mostrarMensaje("No hay adscripciones para la división", "error");
        return;
    }

    filas.forEach((fila) => {
        const a = fila.apto;
        // para mostrar la división especial y su división busco cada una por su id
        const especial = especiales.find((de) => de.id === a.idDivisionEspecial);

        cuerpo.innerHTML += `
            <tr>
                <td class="mono">${a.id}</td>
                <td>${nombreCompleto(fila.recluta)}</td>
                <td>${nombreDe(ramas, fila.recluta.idRama)}</td>
                <td>${nombreDe(especiales, a.idDivisionEspecial)}</td>
                <td>${nombreDe(divisiones, especial.idDivision)}</td>
                <td>${etiquetaApto(a.aptoServicio)}</td>
                <td class="mono">${formatearFecha(a.fechaEvaluacion)}</td>
                <td class="mono">${a.puntaje}</td>
            </tr>
        `;
    });

    mostrarMensaje("Adscripciones encontradas: " + filas.length);
}

function limpiarDetalle() {
    document.getElementById("conDivisionDetalle").value = "";
    document.getElementById("tablaAdscripciones").innerHTML =
        `<tr><td colspan="8" class="vacio">Elige una división y pulsa ver adscripciones.</td></tr>`;
}


// ============================================================
// 13. EXPORTAR A JSON
// Junta todas las listas en un solo objeto y descarga un archivo .json
// ============================================================
function exportarJSON() {
    const datos = {
        ramas: obtenerDatos("ramas"),
        divisiones: obtenerDatos("divisiones"),
        divisionesEspeciales: obtenerDatos("divisionesEspeciales"),
        reclutas: obtenerDatos("reclutas"),
        aptos: obtenerDatos("aptos")
    };

    // el 2 de JSON.stringify(datos, null, 2) es para que el archivo salga
    // con sangría y se pueda leer, si no sale todo en una sola línea
    const texto = JSON.stringify(datos, null, 2);

    // para descargar un archivo que no existe, hago esto:
    // 1. Blob = un "archivo" que existe solo en la memoria, con el texto adentro
    // 2. URL.createObjectURL le saca una dirección temporal
    // 3. creo un enlace <a> invisible con esa dirección. "download" hace que el
    //    navegador lo descargue con ese nombre en vez de abrirlo
    // 4. click() simula que alguien le dio clic al enlace
    const archivo = new Blob([texto], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "unsc_datos.json";
    enlace.click();

    mostrarMensaje("Datos exportados en unsc_datos.json");
}


// ============================================================
// 14. INICIO
// Esto es lo primero que se ejecuta al abrir la página.
// Como el script está al final del body, el HTML ya existe en este punto.
// ============================================================
document.getElementById("fechaHoy").textContent = new Date().toLocaleDateString("es-CO");

cargarDatosEjemplo();
mostrarTodo();
