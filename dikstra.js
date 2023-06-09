function dijkstra(grafo, nodoInicial, nodoFinal) {
  const distancias = {};

  const visitados = {};

  const previos = {};

  const cola = {};

  for (let node in grafo) {
    distancias[node] = Infinity;
  }
  distancias[nodoInicial] = 0;

  cola[nodoInicial] = 0;

  while (Object.keys(cola).length > 0) {
    let nodoActual = null;
    let distanciaActual = Infinity;

    for (let nodo in cola) {
      if (cola[nodo] < distanciaActual) {
        nodoActual = nodo;
        distanciaActual = cola[nodo];
      }
    }
    delete cola[nodoActual];

    if (visitados[nodoActual]) {
      continue;
    }

    visitados[nodoActual] = true;

    if (nodoActual === nodoFinal) {
      const path = [];
      let node = nodoFinal;
      while (node !== nodoInicial) {
        path.unshift(node);
        node = previos[node];
      }
      path.unshift(nodoInicial);
      return { distancia: distancias[nodoFinal], ruta };
    }

    for (let vecino in grafo[nodoActual]) {
      const distancia = grafo[nodoActual][vecino];
      const distanciaTotal = distancias[nodoActual] + distancia;

      if (distanciaTotal < distancias[vecino]) {
        distancias[vecino] = distanciaTotal;
        previos[vecino] = nodoActual;
        cola[vecino] = distanciaTotal;
      }
    }
  }

  return { distancia: Infinity, ruta: [] };
}

// Ejemplo de uso:
const grafo1 = {
  I: { A: 9, C: 2 },
  A: { I: 9, B: 1, D: 1 },
  C: { I: 2, B: 1, F: 10 },
  B: { A: 1, C: 1, F: 6, D: 7 },
  D: { B: 7, A: 1, E: 2, T: 18 },
  F: { C: 10, B: 6, T: 2 },
  E: { D: 2, T: 9 },
  T: { F: 2, E: 9, D: 18 },
};

const grafo2 = {
  0: { 1: 2, 2: 6 },
  1: { 3: 5 },
  2: { 3: 8 },
  3: { 5: 15, 4: 10 },
  4: { 5: 6, 6: 2 },
  5: { 6: 6 },
};

const startNode = "I";
const endNode = "T";

const { distance, path } = dijkstra(grafo1, startNode, endNode);
console.log("Distancia más corta:", distance);
console.log("Ruta óptima:", path);
