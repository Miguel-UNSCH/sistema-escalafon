# Escalafón

- Lista de los individuos de una corporación, clasificados según su grado, antigüedad, méritos, etcétera.
- La aplicación debe tener un login con usuario, correo electrónico y contraseña, con posibilidad de recuperar contraseña.
- La aplicación debe tener una vista para el administrador, y otra para el trabajador de la empresa, quien subirá sus datos, pero también el administrador puede subir datos del trabajador.
- El administrador es el encargado de crear un usuario para el trabajador.
- El trabajador ingresa sus datos por secciones, estas secciones permitirán avanzar al siguiente cuando se haya llenado todo lo requerido en la sección actual y permitir volver a secciones anteriores si es que fuera necesario.
- El trabajador no puede editar los datos subidos en caso de que se haya equivocado.
- Los datos ingresados por el usuario son verificados por el administrador quien dará el visto bueno y aceptará.
- El administrador debe tener un panel donde puede observar todo lo subido por los trabajadores, así como también otro panel para generar reportes de los usuarios (mes, año, etc).

## 1. Secciones de la aplicación:

### I. Datos personales (+ trabajador)

#### a. Datos personales

- Apellido Paterno
- Apellido Materno
- Nombres
- Sexo
- Edad
- DNI (Carnet de extranjería)
- N° de Autogenerado
- Licencia de conducir
- Grupo sanguíneo
- Fecha de ingreso
- Unidad estructurada donde trabaja
- Cargo
- Fecha de Nacimiento
- Distrito
- Provincia

- Departamento/Región
- Nacionalidad
- Domicilio Av/Jr. Calle
- Interior Urbanización
- Provincia
- Distrito
- Teléfono fijo
- Celular
- Correo electrónico
- Personal con discapacidad (si, no)
- Régimen pensionario (L. N° 29903, D. L. ° 19990)
- Nombre de AFP
- Situación laboral (Nombrado-D-L. 276, Contratado plaza vacante, Contratado ley 30057, Contratado CAS-Indeterminado, Contratado en CAS-Temporal D.L. 1057, Contratado en proyecto de inversión, Practicantes preprofesionales-D.L. 1404, Practicante profesional-D.L. 1004).
- Estado civil (Soltero/a, Casado/a, Separado/a, Viudo/a, Conviviente)

#### b. Datos del Cónyuge

- Apellidos y nombres
- Lugar y fecha de nacimiento
- Departamento/Región
- Provincia
- Distrito
- Grado de instrucción
- Profesión
- Ocupación
- Centro de Trabajo
- Postgrado / Especialización (Título, Año, Universidad)

#### c. Datos de los hijos

- Apellidos y nombres
- Lugar y fecha de nacimiento
- Edad
- Grado de instrucción

### II. Estudios y capacitación (+ trabajador)

#### a. Estudios

- Apellidos y nombres
- Formación Académica(Primaria Completa, Primaria Incompleta, Incompleta, Universitario Secundaria Completa, Secundaria Completa, Universitario Incompleta, Bachiller, Titulado, Postgrado, Técnico Completo, Técnico Incompleta, Técnico Egresado, Técnico Titulado)
- Año(Del, Al)
- Nombre de la institución
- Otros estudios con certificación

#### b. Capacitación

- Apellidos y nombres
- Centro de capacitación
- Materia
- Profesión o especialidad
- Periodo (Del, Al)
- Horas Lectivas
- Fecha de emisión
- Certificado escaneado en PDF

### III. Contratos y nombramiento

#### a. Régimen de decreto legislativo 276

- Apellidos y Nombres -----------
- Condición laboral (Nombrado, Contratado o en plaza vacante, Designado)
- Dependencia y/o oficina
- Resolución de nombramiento y/o contrato
- Cargo estructural
- Régimen laboral (276, 276, FAG-CAS-FUN276)
- Nivel remuneración
- PAP
- CNP
- Fecha de ingreso-GRA
- Años de servicio
- Fecha de nacimiento -----------
- Fecha de Cese -----------------

#### b. Contrato Administrativo de Servicio - CAS

- Apellidos y nombres -----------
- Condición laboral (Indeterminado, Eventual)
- Dependencia y/o oficina
- Contrato-CAS
- Cargo
- Régimen laboral
- Fecha de Ingreso-GRA (Desde - Hasta)

#### c. D.L. 276-Proyecto de inversión

- Apellidos y nombres -----------
- Condición laboral (Contratado, Reincorporado-Mandato Judicial)
- Dependencia y/o oficina
- Resolución de contrato
- Cargo
- Meta
- Régimen laboral
- Fecha de Ingreso-GRA (Desde - Hasta)

#### d. Practicante-D.L. N° 1401-Régimen Especial Modalidades Formativas

- Apellidos y nombres -----------
- Condición laboral (Profesional - Preprofesional)
- Dependencia y/o oficina
- Convenio
- Fecha de Ingreso-GRA (Desde - Hasta)

### IV. Renuncia y liquidación

- Apellidos y nombres -----------
- Documento de renuncia (Carta, resolución)
- Motivo de renuncia (Particular, salud, personal)
- Fecha de Renuncia
- Dependencia y/o oficina
- Cargo

### V. Desplazamiento

- Apellidos y nombres
- Tipo (Rotación interna, Rotación voluntaria, Reasignación, Designación, Destaque, Permuta, Encargar)
- Documento de rotación (Memorando, resolución)
- Fecha de Desplazamiento
- De la oficina
- A la oficina
- Cargo

### VI. Descanso médico

- Apellidos y nombres
- Tipo de descanso (Descanso médico según enfermedad, Particular, Pre y Postnatal)
- Documento de sustento (Memorando, resolución, certificado de salud)
- Fecha de descanso (Del - Al)
- Dependencia y/o oficina
- Cargo

### VII. Permisos licencias vacaciones

- Apellidos y nombres
- Tipo de permisos licencias vacaciones (Particular, Por cuenta de Vacaciones, Permiso por familiar)
- Documento de sustento (Solicitud, resolución)
- Fecha de permiso (Del - Al)
- Dependencia y/o oficina
- Cargo

### VIII. Ascensos

- Apellidos y nombres
- Resolución de ascenso
- Cargo (Del cargo, Al cargo)
- Nivel Remunerativo (Del - Al)
- PAP-CNP (Del - Al)
- Dependencia y/o oficina

### IX. Bonificación personal (+ trabajador)

- Apellidos y nombres
- Tipo de bonificación personal
- Resolución de bonificación personal
- Dependencia y/o oficina
- Cargo

### X. Bonificación familiar (+ trabajador)

- Apellidos y nombres
- Tipo de Bonificación familiar
- Resolución de bonificación familiar
- Dependencia y/o oficina
- Cargo

### XI. Experiencia laboral (+ trabajador)

- Apellidos y nombres
- Documento de sustento (Certificado, Constancia, Resolución, CAS, Locación de servicio)
- Centro de labor
- Dependencia y/o oficina
- Cargo
- Periodo de labor (Del - Al)
- Fecha de emisión

### XII. Ficha de evaluación (+ trabajador)

- Apellidos y nombres
- Documento de sustento
- Dependencia y/o oficina
- Cargo
- Fecha de evaluación

### XIII. Méritos (+ trabajador)

- Apellidos y nombres
- Documento de sustento (Resoluciones, Cartas)
- Dependencia y/o oficina
- Cargo
- Fecha

### XIV. Deméritos

- Apellidos y nombres
- Documento de sustento (Resoluciones, Memorando)
- Tipo de sanción (suspensión de labor sin goce de haberes, Amonestación, Papeleta de abandono)
- Fecha de Sanción (Del - Al)
- Dependencia y/o oficina
- Cargo

### XV. Personal con discapacidad (+ trabajador)

- Apellidos y nombres
- Sexo
- DNI
- Documento de sustento
- Tipo de discapacidad
- Cargo
- Órgano estructurado
- Condición laboral

### XVI. Acta de entrega (+ trabajador)

- Apellidos y nombres
- Quien recibe la acta de entrega
- Documento de sustento (acta)
- Dependencia y/o oficina
- Cargo
- Fecha (Del - Al)

### XVII. Constancia de pagos de haberes y descuentos (+ trabajador)

- Apellidos y nombres
- Documento de sustento (Constancia de pago, Boleta de pago)
- Dependencia y/o oficina
- Cargo
- Nivel Remunerativo (SPC, P-4)
- PAP
- CNP
- Dias Laborados (Del - Al)

PAP (Puesto de Asignación Personal)
CNP (Código Nacional del Personal)

## 2. Menú principal (básico)

**Dashboard**

- Vista general o tablero principal.
- El administrador podría ver estadísticas generales (número de trabajadores, estados de la verificación de datos, reportes rápidos, etc.).
- El trabajador puede ver un resumen de su propio estatus (avances, secciones completadas, etc.).

**Gestión de Usuarios** (solo administrador)

- **Crear usuario** (trabajador)
- **Editar usuario**
- **Roles y Permisos** (p.ej. admin, trabajador)

```
NAVEGACIÓN
└── Dashboard

GESTIÓN DE USUARIOS (solo admin)
   ├── Crear Usuario
   ├── Editar Usuario
   └── Roles y Permisos

FICHA PERSONAL
   ├── Datos Personales
   ├── Estudios y Capacitación
   ├── Experiencia Laboral
   └── Discapacidad

SITUACIÓN LABORAL
   ├── Contratos y Nombramiento
   ├── Renuncia y Liquidación
   ├── Desplazamiento
   ├── Descanso Médico
   ├── Permisos / Licencias / Vacaciones
   └── Ascensos

BONIFICACIONES Y EVALUACIONES
   ├── Bonificación Personal
   ├── Bonificación Familiar
   └── Ficha de Evaluación

MÉRITOS Y DEMÉRITOS
   ├── Méritos
   └── Deméritos

DOCUMENTOS / OTROS
   ├── Acta de Entrega
   └── Constancia de Pagos

REPORTES (solo admin)
   ├── Reportes Mensuales
   ├── Reportes Anuales
   └── Reportes Personalizados
```

## 5. Resumen

1. **Menú principal** con un **Dashboard** (estadísticas/resumen).
2. **Gestión de Usuarios** (para el admin).
3. Agrupar la información del personal en **Fichas** o **Módulos** de manera que sea amigable:
   - **Ficha Personal** (datos personales, familiares, estudios, experiencia).
   - **Situación Laboral** (contratos, renuncias, desplazamientos, descansos, licencias, ascensos).
   - **Bonificaciones y Evaluaciones**.
   - **Méritos y Deméritos**.
   - **Documentos / Otros** (actas de entrega, constancias de pago).
4. **Reportes** (sección exclusiva para administrador).
5. **Configuración** (perfil de usuario, contraseñas, preferencias).

---
