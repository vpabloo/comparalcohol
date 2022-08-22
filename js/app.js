// Catalogo sin utilizarse
var cervezas = ["Amstel",
    "Bohemia",
    "Carta Blanca",
    "Coors Light",
    "Corona",
    "Coronita",
    "Dos Equis",
    "Heineken",
    "Indio",
    "Kloster Ligth",
    "Miller High Life",
    "Miller Lite",
    "Sol",
    "Superior",
    "Tecate Clara",
    "Tecate Light",
    "Tecate Original",
    "XX"
];

function concatena_cerveza() {
    var marca = document.getElementById('marca').value;
    var presentacion = document.getElementById('presentacion').value;
    var mililitros = document.getElementById('mililitros').value;
    var precio = document.getElementById('precio').value;

    if (mililitros === '' || precio === '') {
        alert("Ingrese almenos mililitros y precio")
    } else {
        precio_mililitros = (precio / presentacion) / mililitros
        var cerveza = presentacion + '\u00A0Chela(s)\u00A0' + marca + '\u00A0de\u00A0' + mililitros + 'ml\u00A0c/u.\u00A0Cuesta\u00A0$' + precio + '.\u00A0Quedando\u00A0' + "$" + parseFloat(precio_mililitros).toFixed(3) + '\u00A0' + "por mililitro."

        // Creamos un nuevo elemento LI
        var li = document.createElement('li');
        // Añadimos el valor introducido al nuevo elemento
        li.innerHTML = cerveza;
        // Añadimos el elemento LI a la lista UL
        var ul = document.getElementById('lista');
        ul.appendChild(li);
        // Vaciamos la caja de texto
        document.getElementById('marca').value = "";
        document.getElementById('presentacion').value = "1";
        document.getElementById('mililitros').value = "";
        document.getElementById('precio').value = "";
    }
}