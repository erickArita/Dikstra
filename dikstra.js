//Grafo de entrada para algoritmo Dikstra

//crea este grafo pero cada nodo se relacione bidireccinalmente

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
    debugger;
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
      debugger;
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
const startNode = "I";
const endNode = "T";

const { distance, path } = dijkstra(grafo, startNode, endNode);
console.log("Distancia más corta:", distance);
console.log("Ruta óptima:", path);
