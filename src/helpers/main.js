import { readFile, writeFile } from "fs";

// Leer el archivo de entrada 'ubigeo_provincia.json'
readFile("ubigeo_provincia.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  // Parsear los datos JSON
  const jsonData = JSON.parse(data);

  // Crear el nuevo array con los campos deseados
  const result = jsonData.map((item) => ({
    inei: item.inei,
    reniec: item.reniec,
    departamento: item.departamento,
    provincia: item.provincia,
    region: item.region,
  }));

  // Guardar el nuevo archivo 'ubigeo.json'
  writeFile("ubigeo.json", JSON.stringify(result, null, 4), "utf8", (err) => {
    if (err) {
      console.error("Error al escribir el archivo:", err);
      return;
    }
    console.log("Archivo 'ubigeo.json' creado exitosamente.");
  });
});
