// Estado de la comparativa
var comparativa = [];
var beerImages = [];
var brandLogoIndex = 0;
var populares = [
    'Amstel','Bohemia','Carta Blanca','Coors Light','Corona','Coronita','Dos Equis','Heineken','Indio',
    'Kloster Light','Miller High Life','Miller Lite','Sol','Superior','Tecate','Tecate Light','Tecate Original','Victoria','Modelo','Pacifico'
];
var aliasMarca = {
    'xx': 'Dos Equis',
    'xx lager': 'Dos Equis',
    'tecate clara': 'Tecate',
    'kloster ligth': 'Kloster Light'
};

function concatena_cerveza() {
    var marca = document.getElementById('marca').value.trim();
    marca = normalizarMarca(marca);
    var presentacion = parseFloat(document.getElementById('presentacion').value);
    var mililitros = parseFloat(document.getElementById('mililitros').value);
    var precio = parseFloat(document.getElementById('precio').value);

    if (isNaN(mililitros) || isNaN(precio)) {
        alert("Ingrese al menos mililitros y precio válidos");
        return;
    }

    var precio_mililitros = (precio / presentacion) / mililitros;
    comparativa.push({ marca: marca || 'Sin marca', presentacion: presentacion, mililitros: mililitros, precio: precio, ppm: precio_mililitros });
    renderComparativa();
    actualizarConteo();
    guardarReciente(marca || 'Sin marca');

    // Reset campos
    document.getElementById('marca').value = "";
    document.getElementById('presentacion').value = "1";
    document.getElementById('mililitros').value = "";
    document.getElementById('precio').value = "";
}

function renderComparativa() {
    var ul = document.getElementById('lista');
    if (!ul) return;
    // Ordena por precio por ml (ascendente)
    var items = comparativa.slice().sort(function(a, b){ return a.ppm - b.ppm; });
    // Calcular min y max
    var min = Infinity, max = -Infinity;
    for (var i = 0; i < items.length; i++) {
        if (items[i].ppm < min) min = items[i].ppm;
        if (items[i].ppm > max) max = items[i].ppm;
    }
    ul.innerHTML = '';
    for (var j = 0; j < items.length; j++) {
        var it = items[j];
        // Si hay más de 2 elementos, usa una escala por rango para asegurar gama completa verde→rojo.
        // En listas cortas (<=2), usa normalización por valor para ser fiel a los datos.
        var tValue = (max - min) > 0 ? (it.ppm - min) / (max - min) : 0; // 0=barato 1=caro por valor
        var tRank = (items.length > 1) ? (j / (items.length - 1)) : 0;     // 0=primero 1=último por rango
        var t = (items.length > 2) ? tRank : tValue;
        var hue = Math.round(130 * (1 - t)); // 130 (verde) -> 0 (rojo)
        var border = 'hsl(' + hue + ', 65%, 45%)';
        var badgeBg = 'hsl(' + hue + ', 90%, 93%)';
        var badgeBorder = 'hsl(' + hue + ', 75%, 70%)';
        var badgeText = 'hsl(' + hue + ', 65%, 18%)';

        var li = document.createElement('li');
        li.className = 'result-item';
        li.style.borderLeftColor = border;
        li.innerHTML = '' +
            '<div class="result-content">' +
            '  <div class="result-title">' + (it.marca) + ' <span class="result-pres">' + it.presentacion + '×</span></div>' +
            '  <div class="result-sub">' + it.mililitros + ' ml c/u · Total: $' + it.precio + '</div>' +
            '</div>' +
            '<div class="result-badge" aria-label="Precio por mililitro" style="background:' + badgeBg + ';border-color:' + badgeBorder + ';color:' + badgeText + '">$' + it.ppm.toFixed(3) + ' / ml</div>';
        ul.appendChild(li);
    }
    actualizarConteo();
}

// UI bindings
document.addEventListener('DOMContentLoaded', function () {
    var y = document.getElementById('year');
    if (y) { y.textContent = new Date().getFullYear(); }

    var btnAgregar = document.getElementById('btn-agregar');
    var btnLimpiar = document.getElementById('btn-limpiar');
    var btnExportar = document.getElementById('btn-exportar');
    var btnWhatsapp = document.getElementById('btn-whatsapp');
    var brandLogo = document.getElementById('brand-logo');

    if (btnAgregar) btnAgregar.addEventListener('click', concatena_cerveza);
    if (btnLimpiar) btnLimpiar.addEventListener('click', function(){ comparativa = []; renderComparativa(); actualizarConteo(); });
    if (btnExportar) btnExportar.addEventListener('click', exportarCSV);
    if (btnWhatsapp) btnWhatsapp.addEventListener('click', compartirWhatsApp);

    poblarDatalist();
    actualizarConteo();
    initBeerAssets(brandLogo);
});

function initBeerAssets(brandLogo){
    cargarListaImagenesBeer().then(function(list){
        beerImages = list;
        // Logo aleatorio
        if (brandLogo && beerImages.length){
            brandLogoIndex = Math.floor(Math.random() * beerImages.length);
            brandLogo.src = beerImages[brandLogoIndex];
            brandLogo.addEventListener('click', function(){
                if (!beerImages.length) return;
                brandLogoIndex = (brandLogoIndex + 1) % beerImages.length;
                brandLogo.src = beerImages[brandLogoIndex];
            });
        }
        // Fondo decorativo
        colocarDecoracionesCerveza(beerImages);
    });
}

function cargarListaImagenesBeer(){
    // Intenta leer manifest.json con lista de imágenes dentro de images/beer
    return fetch('images/beer/manifest.json', { cache: 'no-store' })
        .then(function(r){ if (!r.ok) throw new Error('no manifest'); return r.json(); })
        .then(function(arr){
            if (!Array.isArray(arr)) throw new Error('bad manifest');
            return arr.filter(function(name){ return typeof name === 'string'; })
                      .map(function(name){ return 'images/beer/' + name; });
        })
        .catch(function(){
            // Fallback a nombres comunes si no hay manifest ni índice
            return ['images/beer/beer.png','images/beer/beer (1).png','images/beer/beer (2).png'];
        });
}

function actualizarConteo(){
    var el = document.getElementById('count');
    if (!el) return;
    el.textContent = comparativa.length ? (comparativa.length + ' ítem(s)') : 'Sin elementos';
}

function exportarCSV(){
    if (!comparativa.length) return;
    var header = ['Marca','Presentacion','Mililitros','Precio','Precio_por_ml'];
    var rows = comparativa.map(function(it){ return [it.marca, it.presentacion, it.mililitros, it.precio, it.ppm.toFixed(3)]; });
    var csv = [header].concat(rows).map(function(r){ return r.join(','); }).join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'comparativa_cervezas.csv'; a.click();
    URL.revokeObjectURL(url);
}

// Fondo: colocar imágenes de cerveza en posiciones y tamaños aleatorios
function colocarDecoracionesCerveza(rutas){
    var rutasLista = Array.isArray(rutas) && rutas.length ? rutas : beerImages;
    precargarImagenes(rutasLista, function(disponibles){
        if (!disponibles.length) return;
        var w = window.innerWidth, h = window.innerHeight;
        var objetivo = (w < 480) ? 10 : 16; // más imágenes en ambos casos
        var colocadas = [];
        var intentosMax = 200;
        var intentos = 0;
        while (colocadas.length < objetivo && intentos < intentosMax){
            intentos++;
            var src = disponibles[Math.floor(Math.random() * disponibles.length)];
            // Reducir tamaños ~20%
            var sizeMin = (w < 480) ? 40 : 48;
            var sizeMax = (w < 480) ? 96 : 128;
            var size = Math.floor(Math.random() * (sizeMax - sizeMin)) + sizeMin;
            var left = Math.floor(Math.random() * (w - size));
            var top = Math.floor(Math.random() * (h - size));
            var nuevo = {left:left, top:top, right:left+size, bottom:top+size, size:size, src:src};
            // evitar empalmes: checar intersección con ya colocadas con margen
            var margen = 16; // px
            var solapa = false;
            for (var i=0;i<colocadas.length;i++){
                var c = colocadas[i];
                if (!(nuevo.right + margen < c.left || nuevo.left - margen > c.right || nuevo.bottom + margen < c.top || nuevo.top - margen > c.bottom)){
                    solapa = true; break;
                }
            }
            if (solapa) continue;
            colocadas.push(nuevo);
        }
        for (var j=0;j<colocadas.length;j++){
            var d = colocadas[j];
            var el = document.createElement('div');
            el.className = 'beer-deco';
            el.style.width = d.size + 'px';
            el.style.height = d.size + 'px';
            el.style.left = d.left + 'px';
            el.style.top = d.top + 'px';
            el.style.backgroundImage = 'url("' + d.src + '")';
            document.body.appendChild(el);
        }
    });
}

function precargarImagenes(rutas, done){
    var res = [];
    var pendientes = rutas.length;
    if (!pendientes) return done(res);
    rutas.forEach(function(r){
        var img = new Image();
        img.onload = function(){ res.push(r); if (--pendientes===0) done(res); };
        img.onerror = function(){ if (--pendientes===0) done(res); };
        img.src = r;
    });
}

function compartirWhatsApp(){
    if (!comparativa.length) { alert('No hay elementos para compartir'); return; }
    var items = comparativa.slice().sort(function(a, b){ return a.ppm - b.ppm; });
    var lineas = [];
    var best = items[0];
    lineas.push('🔥 Mejor precio: ' + best.marca + ' (' + best.presentacion + '×, ' + best.mililitros + ' ml c/u) — $' + best.ppm.toFixed(3) + '/ml');
    lineas.push('');
    lineas.push('Comparativa de cerveza (precio por ml)');
    for (var i=0;i<items.length;i++){
        var it = items[i];
        var idx = (i+1) + ') ';
        var texto = idx + it.marca + ' (' + it.presentacion + '×, ' + it.mililitros + ' ml c/u, $' + it.precio + ' total) — $' + it.ppm.toFixed(3) + '/ml';
        lineas.push(texto);
    }
    lineas.push('');
    lineas.push('Precios comparados en ComparaChela: https://www.comparachela.com');
    var mensaje = lineas.join('\n');
    var url = 'https://wa.me/?text=' + encodeURIComponent(mensaje);
    window.open(url, '_blank');
}

function normalizarMarca(nombre){
    var raw = (nombre || '').trim();
    if (!raw) return '';
    var key = raw.toLowerCase();
    if (aliasMarca[key]) return aliasMarca[key];
    // Capitalizar cada palabra
    return raw.toLowerCase().split(/\s+/).map(function(w){ return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
}

function poblarDatalist(){
    var dl = document.getElementById('marcas-populares');
    if (!dl) return;
    var recientes = leerRecientes();
    var conjunto = [];
    function agregar(arr){
        for (var i=0;i<arr.length;i++){
            var m = normalizarMarca(arr[i]);
            if (m && conjunto.indexOf(m) === -1) conjunto.push(m);
        }
    }
    // Primero las populares (orden original), luego recientes
    agregar(populares);
    agregar(recientes);
    dl.innerHTML = conjunto.slice(0,100).map(function(m){ return '<option value="'+m+'"></option>'; }).join('');
}

function guardarReciente(marca){
    if (!marca) return;
    var recientes = leerRecientes();
    recientes.unshift(marca);
    // única y top 15
    var unicos = [];
    for (var i=0;i<recientes.length;i++){
        var m = recientes[i];
        if (unicos.indexOf(m) === -1) unicos.push(m);
        if (unicos.length >= 15) break;
    }
    localStorage.setItem('marcas_recientes', JSON.stringify(unicos));
    poblarDatalist();
}

function leerRecientes(){
    try {
        var raw = localStorage.getItem('marcas_recientes');
        if (!raw) return [];
        var arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    } catch(e){ return []; }
}