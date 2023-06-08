//Grafo de entrada para algoritmo Dikstra

// digraph G {
//   rankdir = LR;
//   node [shape = circle;];
//   edge [color = gray;];

//   A -> D [label = "1"; dir = "both";];
//   A -> B [label = "1"; dir = "both";];

//   I -> A [label = "9"; dir = "both";];
//   I -> C [label = "2"; dir = "both";];

//   C -> F [label = "10"; dir = "both";];
//   C -> B [label = "1"; dir = "both";];

//   B -> D [label = "7"; dir = "both";];
//   B -> F [label = "6"; dir = "both";];

//   F -> T [label = "2"; dir = "both";];

//   D -> E [label = "2"; dir = "both";];
//   D -> T [label = "18"; dir = "both";];

//   E -> T [label = "9"; dir = "both";];
// }
//crea este grafo pero cada nodo se relacione bidireccinalmente
const grafo = {
  I: { A: 9, C: 2 },
  A: { I: 9, B: 1, D: 1 },
  C: { I: 2, B: 1, F: 10 },
  B: { A: 1, C: 1, F: 6, D: 7 },
  D: { B: 7, A: 1, E: 2, T: 18 },
  F: { C: 10, B: 6, T: 2 },
  E: { D: 2, T: 9 },
  T: { F: 2, E: 9, D: 18 },
};
function dijkstra(graph, startNode, endNode) {
  const distances = {};
  const visited = {};
  const previous = {};
  const queue = {};

  // Inicializar las distancias de todos los nodos como infinito, excepto el nodo de inicio
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[startNode] = 0;

  // Agregar el nodo de inicio a la cola de prioridad
  queue[startNode] = 0;

  while (Object.keys(queue).length > 0) {
    let currentNode = null;
    let currentDistance = Infinity;

    // Encontrar el nodo con la distancia más corta en la cola de prioridad
    for (let node in queue) {
      if (queue[node] < currentDistance) {
        currentNode = node;
        currentDistance = queue[node];
      }
    }

    delete queue[currentNode];

    if (visited[currentNode]) {
      continue; // Ignorar el nodo si ya ha sido visitado
    }

    visited[currentNode] = true;

    // Si se llega al nodo de destino, construir y devolver la ruta óptima
    if (currentNode === endNode) {
      const path = [];
      let node = endNode;
      while (node !== startNode) {
        path.unshift(node);
        node = previous[node];
      }
      path.unshift(startNode);
      return { distance: distances[endNode], path };
    }

    for (let neighbor in graph[currentNode]) {
      const distance = graph[currentNode][neighbor];
      const totalDistance = distances[currentNode] + distance;

      // Si se encuentra un camino más corto hacia el vecino, actualizar la distancia y el nodo anterior
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previous[neighbor] = currentNode;
        queue[neighbor] = totalDistance;
      }
    }
  }

  // No se encontró una ruta hacia el nodo de destino
  return { distance: Infinity, path: [] };
}

// Ejemplo de uso:

const graph = {
  A: { B: 5, C: 1 },
  B: { A: 5, C: 2, D: 1 },
  C: { A: 1, B: 2, D: 4, E: 8 },
  D: { B: 1, E: 2, C: 4 },
  E: { C: 8, D: 2 },
  F: {},
};

const startNode = 'A';
const endNode = 'E';

const { distance, path } = dijkstra(graph, startNode, endNode);
console.log('Distancia más corta:', distance);
console.log('Ruta óptima:', path);
