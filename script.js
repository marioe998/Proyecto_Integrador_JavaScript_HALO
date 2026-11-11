// Sistema de reclutamiento UNSC
// Aquí está toda la lógica de la página: guardar en localStorage, el menú,
// el panel y los módulos (ramas, divisiones, divisiones especiales,
// reclutas, aptos y consultas). Está en el mismo orden en que se ve la página.


// ---------------------------------------------------------------
// 1. DATOS DE EJEMPLO
// Son datos de prueba para que la página no se vea vacía la primera vez.
// Cada uno es un arreglo de objetos (como las filas de una tabla en SQL).
// Para relacionar las cosas uso el id de la otra tabla, igual que una llave
// foránea: por ejemplo un recluta tiene idRama: 1, que es el id de "Marines".
// ---------------------------------------------------------------
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

// las evaluaciones: cada una une un recluta con una división especial
const aptosEjemplo = [
    { id: 1, idRecluta: 6, idDivisionEspecial: 2, aptoServicio: true, fechaEvaluacion: "2026-10-02", puntaje: 94 },
    { id: 2, idRecluta: 2, idDivisionEspecial: 1, aptoServicio: true, fechaEvaluacion: "2026-10-05", puntaje: 88 },
    { id: 3, idRecluta: 1, idDivisionEspecial: 3, aptoServicio: true, fechaEvaluacion: "2026-10-09", puntaje: 91 },
    { id: 4, idRecluta: 3, idDivisionEspecial: 4, aptoServicio: false, fechaEvaluacion: "2026-10-12", puntaje: 58 },
    { id: 5, idRecluta: 5, idDivisionEspecial: 5, aptoServicio: true, fechaEvaluacion: "2026-10-18", puntaje: 83 },
    { id: 6, idRecluta: 4, idDivisionEspecial: 6, aptoServicio: true, fechaEvaluacion: "2026-10-21", puntaje: 77 },
    { id: 7, idRecluta: 10, idDivisionEspecial: 1, aptoServicio: false, fechaEvaluacion: "2026-10-25", puntaje: 62 }
];


// ---------------------------------------------------------------
// 2. LOCALSTORAGE
// localStorage solo puede guardar TEXTO, no arreglos ni objetos.
// Entonces:
//   - para guardar uso JSON.stringify (arreglo -> texto)
//   - para leer uso JSON.parse (texto -> arreglo)
// Con estas dos funciones hago todo, no uso localStorage directo en otro lado.
// ---------------------------------------------------------------

// lee una lista. El "|| []" es por si todavía no hay nada guardado:
// getItem devuelve null, JSON.parse(null) da null y entonces uso un arreglo vacío
const obtenerDatos = (clave) => JSON.parse(localStorage.getItem(clave)) || [];

// guarda una lista (la convierte a texto primero)
const guardarDatos = (clave, lista) => localStorage.setItem(clave, JSON.stringify(lista));

function guardarEjemplos() {
    guardarDatos("ramas", ramasEjemplo);
    guardarDatos("divisiones", divisionesEjemplo);
    guardarDatos("divisionesEspeciales", divisionesEspecialesEjemplo);
    guardarDatos("reclutas", reclutasEjemplo);
    guardarDatos("aptos", aptosEjemplo);
}

function cargarDatosEjemplo() {
    // solo cargo los ejemplos si no hay nada guardado (o sea la primera vez que se abre)
    // si no hiciera esto, cada vez que recargue la página se borrarían mis cambios
    if (localStorage.getItem("ramas") === null) {
        guardarEjemplos();
    }
}

function restablecerDatos() {
    // confirm abre la ventanita de aceptar/cancelar y devuelve true o false
    const seguro = confirm("Se borrarán los cambios y se cargarán los datos de ejemplo. ¿Continuar?");

    if (seguro) {
        guardarEjemplos();

        // también limpio los formularios por si alguno estaba a medio editar
        limpiarRama();
        limpiarDivision();
        limpiarDivisionEspecial();
        limpiarRecluta();
        limpiarApto();
        limpiarBusqueda();
        limpiarAdscripciones();

        mostrarTodo();
        mostrarMensaje("Datos restablecidos");
    }
}


// ---------------------------------------------------------------
// 3. MENSAJITO EMERGENTE
// Sale abajo a la derecha unos segundos. Si le paso "error" se ve en rojo.
// ---------------------------------------------------------------
function mostrarMensaje(texto, tipo) {
    // createElement crea un div nuevo en memoria, todavía no se ve en la página
    const aviso = document.createElement("div");
    aviso.className = "aviso";

    if (tipo === "error") {
        aviso.classList.add("aviso--error");
    } else {
        aviso.classList.add("aviso--exito");
    }

    aviso.textContent = texto;

    // appendChild lo mete dentro del contenedor "avisos" y ahí sí aparece
    document.getElementById("avisos").appendChild(aviso);

    // setTimeout espera 3000 ms (3 segundos) y después borra el mensaje
    setTimeout(() => aviso.remove(), 3000);
}


// ---------------------------------------------------------------
// 4. MENÚ
// Todas las secciones están en el mismo html. Lo que hago es mostrar una
// y esconder las demás cambiando la clase "activa" (el css se encarga del resto).
// ---------------------------------------------------------------
function mostrarVista(nombre) {
    // primero le quito "activa" a todas las secciones y a todos los botones
    document.querySelectorAll(".vista").forEach((vista) => vista.classList.remove("activa"));
    document.querySelectorAll(".menu__item").forEach((boton) => boton.classList.remove("activo"));

    // y se la pongo solo a la que elegí. El id de la sección es "vista-" + el nombre
    document.getElementById(`vista-${nombre}`).classList.add("activa");
    document.querySelector(`[data-vista="${nombre}"]`).classList.add("activo");

    // cada vez que cambio de pestaña vuelvo a dibujar todo, así lo que cambié
    // en una pestaña se ve actualizado en las otras (y los select tienen las opciones nuevas)
    mostrarTodo();
}

// a cada botón del menú le pongo un listener para el clic.
// boton.dataset.vista lee el atributo data-vista que puse en el html
document.querySelectorAll(".menu__item").forEach((boton) => {
    boton.addEventListener("click", () => {
        mostrarVista(boton.dataset.vista);
    });
});


// ---------------------------------------------------------------
// 5. FUNCIONES QUE USO EN VARIOS LADOS
// ---------------------------------------------------------------

// como no hay base de datos que cree los id sola (el autoincrement de SQL),
// el id nuevo lo calculo yo: el id más grande que haya + 1
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
// Sirve para mostrar "Marines" en la tabla en vez del número 1
function nombreDe(lista, id) {
    const item = lista.find((x) => x.id === id);
    if (item) {
        return item.nombre;
    }
    return "—"; // si no lo encuentra (por ejemplo si lo borraron)
}

// junta nombre y apellido de un recluta
function nombreCompleto(recluta) {
    if (recluta) {
        return `${recluta.nombre} ${recluta.apellido}`;
    }
    return "—";
}

// la fecha se guarda como 2026-10-02 (así la da el input date)
// y yo la muestro como 02/10/2026: la parto por los guiones y la reordeno
function formatearFecha(fecha) {
    const partes = fecha.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// si no hay valor (null o texto vacío) muestra un guion para que la celda no quede vacía
function valorOGuion(valor) {
    if (valor === null || valor === "") {
        return "—";
    }
    return valor;
}

// la etiqueta verde de "Apto" o roja de "No apto"
function etiquetaApto(apto) {
    if (apto) {
        return `<span class="etiqueta etiqueta--apto">Apto</span>`;
    }
    return `<span class="etiqueta etiqueta--no-apto">No apto</span>`;
}

// sirve para ordenar reclutas por apellido y, si el apellido es igual, por nombre
// (lo mismo que el ORDER BY r.apellido, r.nombre de las consultas del Java).
// localeCompare compara textos y respeta tildes y la ñ
function compararReclutas(a, b) {
    const porApellido = a.apellido.localeCompare(b.apellido);
    if (porApellido !== 0) {
        return porApellido;
    }
    return a.nombre.localeCompare(b.nombre);
}

// llena un <select> con opciones. "opciones" es un arreglo de { id, texto }
function llenarSelect(idSelect, opciones, textoInicial) {
    const select = document.getElementById(idSelect);

    // guardo lo que estaba elegido porque al reconstruir las opciones se pierde
    const anterior = select.value;

    // la primera opción es el texto de ayuda y no tiene valor (value="")
    select.innerHTML = `<option value="">${textoInicial}</option>`;
    opciones.forEach((o) => {
        select.innerHTML += `<option value="${o.id}">${o.texto}</option>`;
    });

    // y ahora le devuelvo lo que tenía elegido
    select.value = anterior;
}

// llena todos los select de la página con los datos actuales
function actualizarSelects() {
    const ramas = obtenerDatos("ramas");
    const divisiones = obtenerDatos("divisiones");
    const especiales = obtenerDatos("divisionesEspeciales");
    const reclutas = obtenerDatos("reclutas");

    // map convierte cada elemento en otra cosa; aquí cada rama pasa a { id, texto }.
    // Los paréntesis alrededor de las llaves ({ ... }) son para que JS entienda
    // que estoy devolviendo un objeto y no abriendo un bloque de código
    const opcionesRamas = ramas.map((r) => ({ id: r.id, texto: r.nombre }));

    const opcionesDivisiones = divisiones.map((d) => ({
        id: d.id,
        texto: `${d.nombre} (${nombreDe(ramas, d.idRama)})`
    }));

    const opcionesEspeciales = especiales.map((e) => ({
        id: e.id,
        texto: `${e.nombre} (${nombreDe(divisiones, e.idDivision)})`
    }));

    const opcionesReclutas = reclutas.map((r) => ({ id: r.id, texto: nombreCompleto(r) }));

    llenarSelect("divRama", opcionesRamas, "Seleccione una rama");
    llenarSelect("recRama", opcionesRamas, "Seleccione una rama");
    llenarSelect("deDivision", opcionesDivisiones, "Seleccione una división");
    llenarSelect("aptRecluta", opcionesReclutas, "Seleccione un recluta");
    llenarSelect("aptEspecial", opcionesEspeciales, "Seleccione una división especial");
    llenarSelect("conDivision", opcionesDivisiones, "Seleccione una división");
    llenarSelect("conEspecial", opcionesEspeciales, "Seleccione una división especial");
    llenarSelect("conDivisionDetalle", opcionesDivisiones, "Seleccione una división");
}

// vuelve a dibujar todo: panel, tablas y selects.
// Las consultas no las dibujo aquí porque solo se muestran cuando se aprieta el botón
function mostrarTodo() {
    mostrarPanel();
    mostrarRamas();
    mostrarDivisiones();
    mostrarDivisionesEspeciales();
    mostrarReclutas();
    mostrarAptos();
    actualizarSelects();
}


// ---------------------------------------------------------------
// 6. PANEL PRINCIPAL
// ---------------------------------------------------------------

// ----- las tarjetas de arriba -----
function mostrarTarjetas() {
    const reclutas = obtenerDatos("reclutas");
    const aptos = obtenerDatos("aptos");
    const divisiones = obtenerDatos("divisiones");
    const divisionesEspeciales = obtenerDatos("divisionesEspeciales");

    // filter me deja solo los que cumplen la condición: los que son aptos para servicio
    const aprobados = aptos.filter((a) => a.aptoServicio === true);

    // con forEach voy sumando todos los puntajes para después sacar el promedio
    let suma = 0;
    aptos.forEach((a) => {
        suma += a.puntaje;
    });

    // si no hay evaluaciones no se puede dividir (daría división por cero)
    let promedio = 0;
    if (aptos.length > 0) {
        promedio = (suma / aptos.length).toFixed(1); // toFixed(1) = un solo decimal
    }

    // cada tarjeta es un objeto con lo que necesito para dibujarla
    const tarjetas = [
        { etiqueta: "Reclutas", valor: reclutas.length, icono: "ti-users", color: "" },
        { etiqueta: "Aptos para servicio", valor: aprobados.length, icono: "ti-circle-check", color: "tarjeta--dorado" },
        { etiqueta: "Divisiones", valor: divisiones.length, icono: "ti-sitemap", color: "" },
        { etiqueta: "Div. especiales", valor: divisionesEspeciales.length, icono: "ti-star", color: "tarjeta--cian" },
        { etiqueta: "Puntaje medio", valor: promedio, icono: "ti-target", color: "tarjeta--dorado" }
    ];

    const contenedor = document.getElementById("tarjetas");
    contenedor.innerHTML = ""; // lo vacío primero para que no se repitan las tarjetas

    // las comillas invertidas ` ` me dejan escribir html en varias líneas
    // y meter variables con ${...}. El += va agregando una tarjeta más a lo que ya había
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

// ----- las barras de reclutas por rama -----
function mostrarGrafico() {
    const ramas = obtenerDatos("ramas");
    const reclutas = obtenerDatos("reclutas");

    // por cada rama cuento cuántos reclutas tiene (filtro los reclutas de esa rama y miro el length)
    // el resultado es un arreglo de números en el mismo orden que las ramas, ej: [4, 2, 2, 2]
    const cantidades = ramas.map((rama) => {
        return reclutas.filter((r) => r.idRama === rama.id).length;
    });

    // busco el número más grande, porque esa va a ser la barra al 100% de ancho
    // y las demás se calculan proporcionales a esa
    let maximo = 1;
    cantidades.forEach((c) => {
        if (c > maximo) {
            maximo = c;
        }
    });

    const contenedor = document.getElementById("grafico");
    contenedor.innerHTML = "";

    // forEach me da el elemento y también la posición (i), la uso para sacar su cantidad
    ramas.forEach((rama, i) => {
        const ancho = (cantidades[i] / maximo) * 100; // porcentaje del ancho
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

// ----- la tabla con las últimas 5 evaluaciones -----
function mostrarEvaluaciones() {
    const aptos = obtenerDatos("aptos");
    const reclutas = obtenerDatos("reclutas");
    const divisionesEspeciales = obtenerDatos("divisionesEspeciales");

    const cuerpo = document.getElementById("tablaEvaluaciones");
    cuerpo.innerHTML = "";

    if (aptos.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="5" class="vacio">Aún no hay evaluaciones registradas.</td></tr>`;
        return;
    }

    // sort ordena el arreglo. Resto b - a (comparando fechas como texto) para que
    // queden primero las más nuevas. Las fechas tipo 2026-10-25 se pueden comparar así
    // porque van en orden año-mes-día
    aptos.sort((a, b) => b.fechaEvaluacion.localeCompare(a.fechaEvaluacion));

    // slice(0, 5) corta el arreglo y me deja solo los primeros 5
    const ultimos = aptos.slice(0, 5);

    ultimos.forEach((apto) => {
        // find busca UN elemento por su id (el recluta de esta evaluación)
        const recluta = reclutas.find((r) => r.id === apto.idRecluta);

        cuerpo.innerHTML += `
            <tr>
                <td>${nombreCompleto(recluta)}</td>
                <td>${nombreDe(divisionesEspeciales, apto.idDivisionEspecial)}</td>
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


// ---------------------------------------------------------------
// 7. RAMAS
// Los 4 primeros módulos (ramas, divisiones, divisiones especiales y reclutas)
// son casi iguales, todos tienen estas 5 funciones:
//   mostrarX()  -> dibuja la tabla
//   guardarX()  -> crea (si el ID está vacío) o actualiza (si ya tiene ID)
//   editarX()   -> pasa los datos de una fila al formulario
//   eliminarX() -> borra, pero solo si no tiene datos que dependan de él
//   limpiarX()  -> deja el formulario vacío
// ---------------------------------------------------------------
function mostrarRamas() {
    const ramas = obtenerDatos("ramas");
    const cuerpo = document.getElementById("tablaRamas");
    cuerpo.innerHTML = "";

    if (ramas.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="4" class="vacio">No hay ramas registradas.</td></tr>`;
        return;
    }

    // a los botones les pongo onclick con el id de la fila, así cada botón
    // sabe sobre cuál rama tiene que actuar, por ejemplo editarRama(3)
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
    const id = document.getElementById("ramaId").value;
    // trim() le quita los espacios del principio y el final, para que "   " no cuente como nombre
    const nombre = document.getElementById("ramaNombre").value.trim();
    const descripcion = document.getElementById("ramaDescripcion").value.trim();

    // validación: el nombre es obligatorio. El return corta la función aquí y no guarda nada
    if (nombre === "") {
        mostrarMensaje("Ingrese el nombre de la rama", "error");
        return;
    }

    const ramas = obtenerDatos("ramas");

    if (id === "") {
        // no hay id en el formulario, entonces es una rama NUEVA
        ramas.push({ id: siguienteId(ramas), nombre: nombre, descripcion: descripcion });
        mostrarMensaje("Rama guardada");
    } else {
        // sí hay id, entonces estoy EDITANDO: busco esa rama y le cambio los datos.
        // Number(id) porque lo que sale del input es texto y los id en la lista son números
        const rama = ramas.find((r) => r.id === Number(id));
        rama.nombre = nombre;
        rama.descripcion = descripcion;
        mostrarMensaje("Rama actualizada");
    }

    guardarDatos("ramas", ramas);
    limpiarRama();
    mostrarTodo();
}

function editarRama(id) {
    const rama = obtenerDatos("ramas").find((r) => r.id === id);

    // paso los datos de la fila al formulario. Al quedar el ID lleno,
    // guardarRama() sabe que tiene que actualizar y no crear
    document.getElementById("ramaId").value = rama.id;
    document.getElementById("ramaNombre").value = rama.nombre;
    document.getElementById("ramaDescripcion").value = rama.descripcion;
    document.getElementById("ramaNombre").focus(); // deja el cursor en el nombre
}

function eliminarRama(id) {
    // antes de borrar reviso si hay divisiones o reclutas que usan esta rama.
    // Si la borro se quedarían apuntando a una rama que ya no existe
    // (en SQL esto lo evitaría la llave foránea)
    const divisiones = obtenerDatos("divisiones").filter((d) => d.idRama === id);
    const reclutas = obtenerDatos("reclutas").filter((r) => r.idRama === id);

    if (divisiones.length > 0 || reclutas.length > 0) {
        mostrarMensaje("No se puede eliminar: la rama tiene divisiones o reclutas", "error");
        return;
    }

    if (confirm("¿Eliminar esta rama?")) {
        // para borrar uso filter al revés: me quedo con todas las ramas MENOS la que quiero borrar
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


// ---------------------------------------------------------------
// 8. DIVISIONES
// (igual que ramas pero con el select de la rama)
// ---------------------------------------------------------------
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
        divisiones.push({
            id: siguienteId(divisiones),
            nombre: nombre,
            descripcion: descripcion,
            idRama: Number(idRama) // el value del select es texto, lo paso a número
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
    document.getElementById("divRama").value = division.idRama; // así el select queda en la rama correcta
    document.getElementById("divNombre").focus();
}

function eliminarDivision(id) {
    // una división no se borra si tiene divisiones especiales
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


// ---------------------------------------------------------------
// 9. DIVISIONES ESPECIALES
// ---------------------------------------------------------------
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
    // no se borra si ya hay reclutas evaluados en ella
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


// ---------------------------------------------------------------
// 10. RECLUTAS
// ---------------------------------------------------------------
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
        // la columna "Evaluado" dice Sí si el recluta aparece en la lista de aptos
        // (find devuelve el elemento si lo encuentra o undefined si no, y undefined cuenta como falso)
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

    // la altura y el peso son opcionales (en el Java pueden ser null).
    // Si el campo está vacío guardo null; si no, lo paso de texto a número
    let altura = null;
    if (alturaTexto !== "") {
        altura = Number(alturaTexto);
    }
    let peso = null;
    if (pesoTexto !== "") {
        peso = Number(pesoTexto);
    }

    // si escribieron algo tiene que ser mayor que 0 (no tiene sentido una altura negativa)
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
    // si el recluta ya tiene una evaluación no lo dejo borrar
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


// ---------------------------------------------------------------
// 11. APTOS DIVISIÓN ESPECIAL
// Aquí se registra la evaluación de un recluta en una división especial:
// si es apto o no, la fecha y el puntaje.
// ---------------------------------------------------------------
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
        // busco el recluta completo para poder mostrar su nombre y no solo el id
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
    const id = document.getElementById("aptId").value;
    const idRecluta = document.getElementById("aptRecluta").value;
    const idEspecial = document.getElementById("aptEspecial").value;
    const fecha = document.getElementById("aptFecha").value;
    const puntajeTexto = document.getElementById("aptPuntaje").value;

    // el checkbox no se lee con .value, se lee con .checked (da true o false)
    const aptoServicio = document.getElementById("aptServicio").checked;

    if (idRecluta === "") {
        mostrarMensaje("Seleccione un recluta", "error");
        return;
    }
    if (idEspecial === "") {
        mostrarMensaje("Seleccione una división especial", "error");
        return;
    }
    if (fecha === "") {
        mostrarMensaje("Seleccione la fecha de evaluación", "error");
        return;
    }
    if (puntajeTexto === "") {
        mostrarMensaje("Ingrese el puntaje", "error");
        return;
    }

    const puntaje = Number(puntajeTexto);
    if (puntaje < 0 || puntaje > 100) {
        mostrarMensaje("El puntaje debe estar entre 0 y 100", "error");
        return;
    }

    const aptos = obtenerDatos("aptos");

    // un recluta solo puede tener UNA evaluación (en el Java el id_recluta es unique).
    // Busco si ya hay una evaluación de ese recluta, pero sin contar la que estoy editando
    // (por eso comparo también que el id sea distinto)
    const repetido = aptos.find((a) => a.idRecluta === Number(idRecluta) && a.id !== Number(id));
    if (repetido) {
        mostrarMensaje("Ese recluta ya tiene una evaluación registrada", "error");
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
    document.getElementById("aptId").value = apto.id;
    document.getElementById("aptRecluta").value = apto.idRecluta;
    document.getElementById("aptEspecial").value = apto.idDivisionEspecial;
    document.getElementById("aptFecha").value = apto.fechaEvaluacion;
    document.getElementById("aptPuntaje").value = apto.puntaje;
    document.getElementById("aptServicio").checked = apto.aptoServicio;
    document.getElementById("aptRecluta").focus();
}

function eliminarApto(id) {
    // la evaluación no la usa ninguna otra tabla, entonces se puede borrar sin revisar nada
    if (confirm("¿Eliminar esta evaluación?")) {
        const aptos = obtenerDatos("aptos").filter((a) => a.id !== id);
        guardarDatos("aptos", aptos);
        limpiarApto();
        mostrarTodo();
        mostrarMensaje("Evaluación eliminada");
    }
}

function limpiarApto() {
    document.getElementById("aptId").value = "";
    document.getElementById("aptRecluta").value = "";
    document.getElementById("aptEspecial").value = "";
    document.getElementById("aptFecha").value = "";
    document.getElementById("aptPuntaje").value = "";
    document.getElementById("aptServicio").checked = false;
}


// ---------------------------------------------------------------
// 12. CONSULTAS
// Son las mismas búsquedas que tenía el CrudService del Java, pero hechas
// con filter y find sobre los arreglos en vez de usar HQL.
// ---------------------------------------------------------------

// Reglas de los filtros de la consulta 1 (las mismas del Java):
//   - se busca por división O por división especial, no por las dos a la vez
//   - "solo aptos" solo se usa cuando se busca por división
// Para eso uso addEventListener con el evento "change", que se dispara cuando
// el usuario cambia lo que hay elegido en el select.
document.getElementById("conDivision").addEventListener("change", () => {
    // si eligió una división, borro la división especial
    if (document.getElementById("conDivision").value !== "") {
        document.getElementById("conEspecial").value = "";
        document.getElementById("conSoloAptos").disabled = false;
    }
});

document.getElementById("conEspecial").addEventListener("change", () => {
    const especial = document.getElementById("conEspecial").value;

    if (especial !== "") {
        // si eligió una división especial, borro la división y apago "solo aptos"
        document.getElementById("conDivision").value = "";
        document.getElementById("conSoloAptos").checked = false;
    }

    // disabled = true deja el checkbox gris y no se puede tocar
    document.getElementById("conSoloAptos").disabled = (especial !== "");
});

// ----- consulta 1: soldados de una división o división especial -----
function buscarSoldados() {
    const idDivision = document.getElementById("conDivision").value;
    const idEspecial = document.getElementById("conEspecial").value;
    const soloAptos = document.getElementById("conSoloAptos").checked;

    const aptos = obtenerDatos("aptos");
    const especiales = obtenerDatos("divisionesEspeciales");
    const reclutas = obtenerDatos("reclutas");
    const ramas = obtenerDatos("ramas");

    // aquí guardo las evaluaciones que cumplen el filtro
    // (los soldados "adscritos" son los que tienen una evaluación en esa división)
    let aptosFiltrados = [];

    if (idEspecial !== "") {
        // caso 1: por división especial. Las evaluaciones de esa división especial
        aptosFiltrados = aptos.filter((a) => a.idDivisionEspecial === Number(idEspecial));

    } else if (idDivision !== "") {
        // caso 2: por división. Una evaluación es de esa división si SU división especial
        // pertenece a la división elegida, entonces busco la división especial de cada una
        aptosFiltrados = aptos.filter((a) => {
            const especial = especiales.find((e) => e.id === a.idDivisionEspecial);
            if (especial) {
                return especial.idDivision === Number(idDivision);
            }
            return false;
        });

        // y si marcó "solo aptos" me quedo solo con los aptos para servicio
        if (soloAptos) {
            aptosFiltrados = aptosFiltrados.filter((a) => a.aptoServicio === true);
        }

    } else {
        mostrarMensaje("Seleccione una división o una división especial", "error");
        return;
    }

    // paso de evaluaciones a reclutas: por cada evaluación busco su recluta
    const encontrados = [];
    aptosFiltrados.forEach((a) => {
        const recluta = reclutas.find((r) => r.id === a.idRecluta);
        if (recluta) {
            encontrados.push(recluta);
        }
    });

    // los ordeno por apellido y nombre
    encontrados.sort(compararReclutas);

    const cuerpo = document.getElementById("tablaSoldados");
    cuerpo.innerHTML = "";

    if (encontrados.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="6" class="vacio">No se encontraron soldados adscritos.</td></tr>`;
        mostrarMensaje("No se encontraron soldados adscritos", "error");
        return;
    }

    encontrados.forEach((r) => {
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

    mostrarMensaje("Soldados encontrados: " + encontrados.length);
}

function limpiarBusqueda() {
    document.getElementById("conDivision").value = "";
    document.getElementById("conEspecial").value = "";
    document.getElementById("conSoloAptos").checked = false;
    document.getElementById("conSoloAptos").disabled = false;
    document.getElementById("tablaSoldados").innerHTML = "";
}

// ----- consulta 2: adscripciones detalladas de una división -----
function verAdscripciones() {
    const idDivision = document.getElementById("conDivisionDetalle").value;

    if (idDivision === "") {
        mostrarMensaje("Seleccione una división", "error");
        return;
    }

    const aptos = obtenerDatos("aptos");
    const especiales = obtenerDatos("divisionesEspeciales");
    const reclutas = obtenerDatos("reclutas");
    const ramas = obtenerDatos("ramas");
    const divisiones = obtenerDatos("divisiones");

    // armo un arreglo de objetos que junta todo lo de cada evaluación
    // (la evaluación, su recluta y su división especial) para poder ordenar fácil.
    // Esto es como el JOIN FETCH del Java: unir varias tablas en una sola fila
    const filas = [];
    aptos.forEach((a) => {
        const recluta = reclutas.find((r) => r.id === a.idRecluta);
        const especial = especiales.find((e) => e.id === a.idDivisionEspecial);

        // solo me sirve si existen los dos y la división especial es de la división elegida
        if (recluta && especial && especial.idDivision === Number(idDivision)) {
            filas.push({ apto: a, recluta: recluta, especial: especial });
        }
    });

    // ordeno por los datos del recluta (apellido y nombre)
    filas.sort((x, y) => compararReclutas(x.recluta, y.recluta));

    const cuerpo = document.getElementById("tablaAdscripciones");
    cuerpo.innerHTML = "";

    if (filas.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="8" class="vacio">No hay adscripciones para la división.</td></tr>`;
        mostrarMensaje("No hay adscripciones para la división", "error");
        return;
    }

    filas.forEach((f) => {
        cuerpo.innerHTML += `
            <tr>
                <td class="mono">${f.apto.id}</td>
                <td>${nombreCompleto(f.recluta)}</td>
                <td>${nombreDe(ramas, f.recluta.idRama)}</td>
                <td>${f.especial.nombre}</td>
                <td>${nombreDe(divisiones, f.especial.idDivision)}</td>
                <td>${etiquetaApto(f.apto.aptoServicio)}</td>
                <td class="mono">${formatearFecha(f.apto.fechaEvaluacion)}</td>
                <td class="mono">${f.apto.puntaje}</td>
            </tr>
        `;
    });

    mostrarMensaje("Adscripciones encontradas: " + filas.length);
}

function limpiarAdscripciones() {
    document.getElementById("conDivisionDetalle").value = "";
    document.getElementById("tablaAdscripciones").innerHTML = "";
}


// ---------------------------------------------------------------
// 13. EXPORTAR A JSON
// Descarga un archivo .json con todos los datos que hay guardados.
// ---------------------------------------------------------------
function exportarJSON() {
    // junto las 5 listas en un solo objeto
    const datos = {
        ramas: obtenerDatos("ramas"),
        divisiones: obtenerDatos("divisiones"),
        divisionesEspeciales: obtenerDatos("divisionesEspeciales"),
        reclutas: obtenerDatos("reclutas"),
        aptos: obtenerDatos("aptos")
    };

    // lo paso a texto. El null y el 2 son para que quede con sangría
    // (de 2 espacios) y se pueda leer bien, si no saldría todo en una sola línea
    const texto = JSON.stringify(datos, null, 2);

    // para descargar un archivo que no existe en ningún lado, lo creo en memoria:
    //   1. Blob = un "archivo" en memoria con el texto adentro
    //   2. createObjectURL = me da una dirección temporal para ese archivo
    //   3. un enlace <a> con esa dirección en href y con "download" (que es el nombre del archivo)
    //   4. .click() simula el clic en ese enlace y el navegador lo descarga
    // el enlace nunca lo agrego a la página, solo existe para disparar la descarga
    const archivo = new Blob([texto], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "unsc_datos.json";
    enlace.click();

    mostrarMensaje("Datos exportados en unsc_datos.json");
}


// ---------------------------------------------------------------
// 14. INICIO
// Esto es lo primero que se ejecuta al abrir la página.
// Como el script está al final del body, el html ya existe en este punto
// (si no, getElementById daría null).
// ---------------------------------------------------------------
document.getElementById("fechaHoy").textContent = new Date().toLocaleDateString("es-CO");

cargarDatosEjemplo();
mostrarTodo();
