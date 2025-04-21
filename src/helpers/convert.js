const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt"); // <-- Asegúrate que el archivo exista aquí
const outputPath = path.join(__dirname, "output.json");

const lines = fs
  .readFileSync(inputPath, "utf-8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const result = [];
let current = null;

for (const line of lines) {
  if (line.startsWith("*")) {
    // Si ya teníamos una dependencia previa, la guardamos
    if (current) result.push(current);
    current = {
      dependencia: line.replace(/^\*\s*/, "").trim(),
      cargos: [],
    };
  } else if (current) {
    current.cargos.push(line);
  }
}

// Agregar la última
if (current) result.push(current);

// Guardar el archivo JSON
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");
console.log("✅ Archivo generado en:", outputPath);
