const memory = [];

export function saveMemory(message) {
  memory.push(message);
}

export function getMemory() {
  return memory;
}

export function clearMemory() {
  memory.length = 0;
}
