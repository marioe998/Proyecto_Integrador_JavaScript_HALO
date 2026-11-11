// ============================================================
// UNSC · Sistema de reclutamiento (versión simple)
// Panel, menú y CRUD de Ramas, Divisiones, Divisiones especiales
// y Reclutas. Todo se guarda en localStorage como JSON.
// ============================================================


// ------------------------------------------------------------
// 1. DATOS DE EJEMPLO
// Son los mismos datos del proyecto Java, pero en arreglos de objetos.
// Las relaciones se hacen con ids (idRama, idDivision, etc.).
// ------------------------------------------------------------
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

const aptosEjemplo = [
    { id: 1, idRecluta: 6, idDivisionEspecial: 2, aptoServicio: true, fechaEvaluacion: "2026-10-02", puntaje: 94 },
    { id: 2, idRecluta: 2, idDivisionEspecial: 1, aptoServicio: true, fechaEvaluacion: "2026-10-05", puntaje: 88 },
    { id: 3, idRecluta: 1, idDivisionEspecial: 3, aptoServicio: true, fechaEvaluacion: "2026-10-09", puntaje: 91 },
    { id: 4, idRecluta: 3, idDivisionEspecial: 4, aptoServicio: false, fechaEvaluacion: "2026-10-12", puntaje: 58 },
    { id: 5, idRecluta: 5, idDivisionEspecial: 5, aptoServicio: true, fechaEvaluacion: "2026-10-18", puntaje: 83 },
    { id: 6, idRecluta: 4, idDivisionEspecial: 6, aptoServicio: true, fechaEvaluacion: "2026-10-21", puntaje: 77 },
    { id: 7, idRecluta: 10, idDivisionEspecial: 1, aptoServicio: false, fechaEvaluacion: "2026-10-25", puntaje: 62 }
];


// ------------------------------------------------------------
// 2. LOCALSTORAGE (get y set con JSON)
// localStorage solo guarda texto, por eso:
//   - al guardar: JSON.stringify convierte el arreglo a texto
//   - al leer:    JSON.parse convierte el texto otra vez a arreglo
// ------------------------------------------------------------
const obtenerDatos = (clave) => JSON.parse(localStorage.getItem(clave)) || [];

const guardarDatos = (clave, lista) => localStorage.setItem(clave, JSON.stringify(lista));

function guardarEjemplos() {
    guardarDatos("ramas", ramasEjemplo);
    guardarDatos("divisiones", divisionesEjemplo);
    guardarDatos("divisionesEspeciales", divisionesEspecialesEjemplo);
    guardarDatos("reclutas", reclutasEjemplo);
    guardarDatos("aptos", aptosEjemplo);
}

function cargarDatosEjemplo() {
    // Solo se cargan la primera vez, cuando todavía no hay nada guardado
    if (localStorage.getItem("ramas") === null) {
        guardarEjemplos();
    }
}

function restablecerDatos() {
    const seguro = confirm("Se borrarán los cambios y se cargarán los datos de ejemplo. ¿Continuar?");
    if (seguro) {
        guardarEjemplos();
        limpiarRama();
        limpiarDivision();
        limpiarDivisionEspecial();
        limpiarRecluta();
        mostrarTodo();
        mostrarMensaje("Datos restablecidos");
    }
}


// ------------------------------------------------------------
// 3. MENSAJE EMERGENTE
// Si se le pasa "error" como segundo valor, sale en rojo.
// ------------------------------------------------------------
function mostrarMensaje(texto, tipo) {
    const aviso = document.createElement("div");
    aviso.className = "aviso";
    if (tipo === "error") {
        aviso.classList.add("aviso--error");
    } else {
        aviso.classList.add("aviso--exito");
    }
    aviso.textContent = texto;
    document.getElementById("avisos").appendChild(aviso);

    // A los 3 segundos el mensaje desaparece
    setTimeout(() => aviso.remove(), 3000);
}


// ------------------------------------------------------------
// 4. MENÚ: mostrar una vista y ocultar las demás
// ------------------------------------------------------------
function mostrarVista(nombre) {
    // Quitamos la clase "activa" a todas las vistas y botones
    document.querySelectorAll(".vista").forEach((vista) => vista.classList.remove("activa"));
    document.querySelectorAll(".menu__item").forEach((boton) => boton.classList.remove("activo"));

    // Se la ponemos solo a la que se eligió
    document.getElementById(`vista-${nombre}`).classList.add("activa");
    document.querySelector(`[data-vista="${nombre}"]`).classList.add("activo");

    // Al cambiar de pestaña se refresca todo (panel, tablas y listas desplegables)
    mostrarTodo();
}

// Cada botón del menú escucha el evento "click"
document.querySelectorAll(".menu__item").forEach((boton) => {
    boton.addEventListener("click", () => {
        mostrarVista(boton.dataset.vista);
    });
});


// ------------------------------------------------------------
// 5. FUNCIONES DE AYUDA (las usan varios módulos)
// ------------------------------------------------------------

// Devuelve el siguiente id: el mayor que exista + 1
function siguienteId(lista) {
    let mayor = 0;
    lista.forEach((item) => {
        if (item.id > mayor) {
            mayor = item.id;
        }
    });
    return mayor + 1;
}

// Busca un elemento por id y devuelve su nombre ("—" si no existe)
function nombreDe(lista, id) {
    const item = lista.find((x) => x.id === id);
    if (item) {
        return item.nombre;
    }
    return "—";
}

// Si el valor está vacío muestra un guion
function valorOGuion(valor) {
    if (valor === null || valor === "") {
        return "—";
    }
    return valor;
}

// Llena un <select> con opciones. "opciones" es un arreglo de { id, texto }
function llenarSelect(idSelect, opciones, textoInicial) {
    const select = document.getElementById(idSelect);
    const anterior = select.value; // para no perder lo que ya estaba elegido

    select.innerHTML = `<option value="">${textoInicial}</option>`;
    opciones.forEach((o) => {
        select.innerHTML += `<option value="${o.id}">${o.texto}</option>`;
    });
    select.value = anterior;
}

function actualizarSelects() {
    const ramas = obtenerDatos("ramas");
    const divisiones = obtenerDatos("divisiones");

    const opcionesRamas = ramas.map((r) => ({ id: r.id, texto: r.nombre }));
    const opcionesDivisiones = divisiones.map((d) => ({
        id: d.id,
        texto: `${d.nombre} (${nombreDe(ramas, d.idRama)})`
    }));

    llenarSelect("divRama", opcionesRamas, "Seleccione una rama");
    llenarSelect("recRama", opcionesRamas, "Seleccione una rama");
    llenarSelect("deDivision", opcionesDivisiones, "Seleccione una división");
}

function mostrarTodo() {
    mostrarPanel();
    mostrarRamas();
    mostrarDivisiones();
    mostrarDivisionesEspeciales();
    mostrarReclutas();
    actualizarSelects();
}


// ------------------------------------------------------------
// 6. PANEL PRINCIPAL
// ------------------------------------------------------------

// ----- Tarjetas de resumen -----
function mostrarTarjetas() {
    const reclutas = obtenerDatos("reclutas");
    const aptos = obtenerDatos("aptos");
    const divisiones = obtenerDatos("divisiones");
    const divisionesEspeciales = obtenerDatos("divisionesEspeciales");

    // filter: nos quedamos solo con los aptos para servicio
    const aprobados = aptos.filter((a) => a.aptoServicio === true);

    // forEach: sumamos todos los puntajes para sacar el promedio
    let suma = 0;
    aptos.forEach((a) => {
        suma += a.puntaje;
    });
    let promedio = 0;
    if (aptos.length > 0) {
        promedio = (suma / aptos.length).toFixed(1);
    }

    const tarjetas = [
        { etiqueta: "Reclutas", valor: reclutas.length, icono: "ti-users", color: "" },
        { etiqueta: "Aptos para servicio", valor: aprobados.length, icono: "ti-circle-check", color: "tarjeta--dorado" },
        { etiqueta: "Divisiones", valor: divisiones.length, icono: "ti-sitemap", color: "" },
        { etiqueta: "Div. especiales", valor: divisionesEspeciales.length, icono: "ti-star", color: "tarjeta--cian" },
        { etiqueta: "Puntaje medio", valor: promedio, icono: "ti-target", color: "tarjeta--dorado" }
    ];

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

// ----- Gráfico de barras: reclutas por rama -----
function mostrarGrafico() {
    const ramas = obtenerDatos("ramas");
    const reclutas = obtenerDatos("reclutas");

    // map: por cada rama contamos cuántos reclutas tiene (usando filter)
    const cantidades = ramas.map((rama) => {
        return reclutas.filter((r) => r.idRama === rama.id).length;
    });

    // Buscamos la cantidad más grande para calcular el ancho de las barras
    let maximo = 1;
    cantidades.forEach((c) => {
        if (c > maximo) {
            maximo = c;
        }
    });

    const contenedor = document.getElementById("grafico");
    contenedor.innerHTML = "";

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

// ----- Tabla: últimas 5 evaluaciones -----
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

    // Ordenamos de la más reciente a la más antigua y tomamos las primeras 5
    aptos.sort((a, b) => b.fechaEvaluacion.localeCompare(a.fechaEvaluacion));
    const ultimos = aptos.slice(0, 5);

    ultimos.forEach((apto) => {
        // find: buscamos el recluta y la división especial por su id
        const recluta = reclutas.find((r) => r.id === apto.idRecluta);

        let nombre = "—";
        if (recluta) {
            nombre = `${recluta.nombre} ${recluta.apellido}`;
        }

        const nombreDivision = nombreDe(divisionesEspeciales, apto.idDivisionEspecial);

        // La fecha viene como 2026-10-02 y la mostramos como 02/10/2026
        const partes = apto.fechaEvaluacion.split("-");
        const fecha = `${partes[2]}/${partes[1]}/${partes[0]}`;

        let estado = `<span class="etiqueta etiqueta--no-apto">No apto</span>`;
        if (apto.aptoServicio) {
            estado = `<span class="etiqueta etiqueta--apto">Apto</span>`;
        }

        cuerpo.innerHTML += `
            <tr>
                <td>${nombre}</td>
                <td>${nombreDivision}</td>
                <td class="mono">${fecha}</td>
                <td class="mono">${apto.puntaje}</td>
                <td>${estado}</td>
            </tr>
        `;
    });
}

function mostrarPanel() {
    mostrarTarjetas();
    mostrarGrafico();
    mostrarEvaluaciones();
}


// ------------------------------------------------------------
// 7. RAMAS
// Todos los módulos siguen el mismo patrón:
//   mostrarX()  -> dibuja la tabla
//   guardarX()  -> crea (si no hay ID) o actualiza (si hay ID)
//   editarX()   -> pasa los datos de la fila al formulario
//   eliminarX() -> borra, si no tiene datos relacionados
//   limpiarX()  -> vacía el formulario
// ------------------------------------------------------------
function mostrarRamas() {
    const ramas = obtenerDatos("ramas");
    const cuerpo = document.getElementById("tablaRamas");
    cuerpo.innerHTML = "";

    if (ramas.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="4" class="vacio">No hay ramas registradas.</td></tr>`;
        return;
    }

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
    const nombre = document.getElementById("ramaNombre").value.trim();
    const descripcion = document.getElementById("ramaDescripcion").value.trim();

    if (nombre === "") {
        mostrarMensaje("Ingrese el nombre de la rama", "error");
        return;
    }

    const ramas = obtenerDatos("ramas");

    if (id === "") {
        // Crear: se agrega un objeto nuevo al arreglo
        ramas.push({ id: siguienteId(ramas), nombre: nombre, descripcion: descripcion });
        mostrarMensaje("Rama guardada");
    } else {
        // Actualizar: buscamos la rama y cambiamos sus datos
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
    document.getElementById("ramaId").value = rama.id;
    document.getElementById("ramaNombre").value = rama.nombre;
    document.getElementById("ramaDescripcion").value = rama.descripcion;
    document.getElementById("ramaNombre").focus();
}

function eliminarRama(id) {
    // No se puede borrar una rama si otras tablas dependen de ella
    const divisiones = obtenerDatos("divisiones").filter((d) => d.idRama === id);
    const reclutas = obtenerDatos("reclutas").filter((r) => r.idRama === id);

    if (divisiones.length > 0 || reclutas.length > 0) {
        mostrarMensaje("No se puede eliminar: la rama tiene divisiones o reclutas", "error");
        return;
    }

    if (confirm("¿Eliminar esta rama?")) {
        // filter: nos quedamos con todas las ramas MENOS la que se borra
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


// ------------------------------------------------------------
// 8. DIVISIONES
// ------------------------------------------------------------
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
    document.getElementById("divRama").value = division.idRama;
    document.getElementById("divNombre").focus();
}

function eliminarDivision(id) {
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


// ------------------------------------------------------------
// 9. DIVISIONES ESPECIALES
// ------------------------------------------------------------
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


// ------------------------------------------------------------
// 10. RECLUTAS
// ------------------------------------------------------------
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
        // "Evaluado" es Sí si el recluta tiene un registro en la tabla de aptos
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

    // Altura y peso son opcionales, pero si se escriben deben ser mayores que 0
    let altura = null;
    if (alturaTexto !== "") {
        altura = Number(alturaTexto);
    }
    let peso = null;
    if (pesoTexto !== "") {
        peso = Number(pesoTexto);
    }
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


// ------------------------------------------------------------
// 11. EXPORTAR A JSON
// Junta todas las listas en un objeto y descarga un archivo .json
// ------------------------------------------------------------
function exportarJSON() {
    const datos = {
        ramas: obtenerDatos("ramas"),
        divisiones: obtenerDatos("divisiones"),
        divisionesEspeciales: obtenerDatos("divisionesEspeciales"),
        reclutas: obtenerDatos("reclutas"),
        aptos: obtenerDatos("aptos")
    };

    // El 2 hace que el JSON salga con sangría y sea legible
    const texto = JSON.stringify(datos, null, 2);

    const archivo = new Blob([texto], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "unsc_datos.json";
    enlace.click();

    mostrarMensaje("Datos exportados en unsc_datos.json");
}


// ------------------------------------------------------------
// 12. INICIO
// Como el script está al final del body, el HTML ya existe aquí.
// ------------------------------------------------------------
document.getElementById("fechaHoy").textContent = new Date().toLocaleDateString("es-CO");

cargarDatosEjemplo();
mostrarTodo();
