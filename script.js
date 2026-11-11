// ============================================================
// UNSC · Sistema de reclutamiento (versión simple)
// Parte 1: datos en localStorage, menú y panel principal
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
        mostrarPanel();
        mostrarMensaje("Datos restablecidos");
    }
}


// ------------------------------------------------------------
// 3. MENSAJE EMERGENTE
// ------------------------------------------------------------
function mostrarMensaje(texto) {
    const aviso = document.createElement("div");
    aviso.className = "aviso";
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
}

// Cada botón del menú escucha el evento "click"
document.querySelectorAll(".menu__item").forEach((boton) => {
    boton.addEventListener("click", () => {
        mostrarVista(boton.dataset.vista);
    });
});


// ------------------------------------------------------------
// 5. PANEL PRINCIPAL
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
        const division = divisionesEspeciales.find((d) => d.id === apto.idDivisionEspecial);

        let nombre = "—";
        if (recluta) {
            nombre = `${recluta.nombre} ${recluta.apellido}`;
        }

        let nombreDivision = "—";
        if (division) {
            nombreDivision = division.nombre;
        }

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
// 6. EXPORTAR A JSON
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
// 7. INICIO
// Como el script está al final del body, el HTML ya existe aquí.
// ------------------------------------------------------------
document.getElementById("fechaHoy").textContent = new Date().toLocaleDateString("es-CO");

cargarDatosEjemplo();
mostrarPanel();
