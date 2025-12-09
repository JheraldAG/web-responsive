
  const palabras = ['PLAYS', 'WORKS', 'EATS', 'READS', 'WALKS', 'COOKS', 'DRIVES', 'WRITES', 'OPENS', 'CALLS', 'LIKES', 'TALKS', 'RUNS', 'JUMPS', 'LISTENS', 'CLEANS', 'HELPS', 'STARTS'];
  const size = 12;
  let grid = Array.from({ length: size }, () => Array(size).fill(''));
  let encontradas = [];

  function colocarPalabra(palabra) {
    const direcciones = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    let colocada = false;
    while (!colocada) {
      const dir = direcciones[Math.floor(Math.random() * direcciones.length)];
      const maxX = size - (dir.x ? palabra.length : 0);
      const maxY = size - (dir.y ? palabra.length : 0);
      const startX = Math.floor(Math.random() * maxX);
      const startY = Math.floor(Math.random() * maxY);

      let puede = true;
      for (let i = 0; i < palabra.length; i++) {
        const x = startX + i * dir.x;
        const y = startY + i * dir.y;
        const celda = grid[y][x];
        if (celda && celda !== palabra[i]) {
          puede = false;
          break;
        }
      }

      if (puede) {
        for (let i = 0; i < palabra.length; i++) {
          const x = startX + i * dir.x;
          const y = startY + i * dir.y;
          grid[y][x] = palabra[i];
        }
        colocada = true;
      }
    }
  }

  palabras.forEach(colocarPalabra);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!grid[y][x]) {
        grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  const sopaDiv = document.getElementById('sopa');
  let seleccion = [];
  let divs = [];

  grid.forEach((fila, y) => {
    fila.forEach((letra, x) => {
      const div = document.createElement('div');
      div.textContent = letra.toUpperCase();
      div.classList.add('letra');
      div.dataset.x = x;
      div.dataset.y = y;
      sopaDiv.appendChild(div);

      div.addEventListener('click', () => {
        div.classList.add('seleccionada');
        seleccion.push(letra.toUpperCase());
        divs.push(div);

        const palabraActual = seleccion.join('');
        if (palabras.includes(palabraActual) && !encontradas.includes(palabraActual)) {
          divs.forEach(d => {
            d.classList.remove('seleccionada');
            d.classList.add('correcta');
          });
          encontradas.push(palabraActual);
          document.getElementById('mensaje').textContent = `¡Encontraste: ${palabraActual}!`;

          // Verificar si se encontraron todas
          if (encontradas.length === palabras.length) {
            document.getElementById('mensaje').textContent = '🎉 ¡Juego completado! Has encontrado todas las palabras.';
          }

          seleccion = [];
          divs = [];
        } else if (!palabras.some(p => p.startsWith(palabraActual))) {
          // No es parte de ninguna palabra
          divs.forEach(d => d.classList.remove('seleccionada'));
          seleccion = [];
          divs = [];
          document.getElementById('mensaje').textContent = 'Intenta otra combinación.';
        }
      });
    });
  });

  document.getElementById('palabras').textContent = 'Palabras a buscar: ' + palabras.join(', ');