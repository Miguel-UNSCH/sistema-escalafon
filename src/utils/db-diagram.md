Table trabajador {
id int [pk, increment]
apellido_paterno varchar
apellido_materno varchar
nombres varchar
sexo varchar
edad int
dni varchar
nro_autogenerado varchar
licencia_conducir varchar
grupo_sanguineo varchar
fecha_ingreso date
unidad_estructurada varchar
cargo varchar
fecha_nacimiento date
distrito varchar
provincia varchar
departamento_region varchar
nacionalidad varchar
domicilio varchar
interior_urbanizacion varchar
telefono_fijo varchar
celular varchar
correo_electronico varchar
personal_discapacidad boolean
regimen_pensionario varchar
nombre_afp varchar
situacion_laboral varchar
estado_civil varchar
}

Table conyuge {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
apellidos_nombres varchar
lugar_fecha_nacimiento varchar
grado_instruccion varchar
profesion varchar
ocupacion varchar
centro_trabajo varchar
postgrado_especializacion varchar
}

Table hijo {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
apellidos_nombres varchar
lugar_fecha_nacimiento varchar
edad int
grado_instruccion varchar
}

Table estudios {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
formacion_academica varchar
ano_inicio int
ano_fin int
institucion varchar
otros_estudios varchar
}

Table capacitacion {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
centro_capacitacion varchar
materia varchar
profesion_especialidad varchar
periodo_inicio date
periodo_fin date
horas_lectivas int
fecha_emision date
certificado_pdf varchar
}

Table experiencia_laboral {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
documento_sustento varchar
centro_laboral varchar
dependencia_oficina varchar
cargo varchar
periodo_inicio date
periodo_fin date
fecha_emision date
}

Table discapacidad {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
tipo_discapacidad varchar
cargo varchar
organo_estructurado varchar
condicion_laboral varchar
}

Table contrato {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
tipo_contrato varchar
dependencia_oficina varchar
cargo_estructural varchar
regimen_laboral varchar
nivel_remuneracion varchar
pap_cnp varchar
fecha_ingreso date
fecha_cese date
}

Table renuncia {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
documento_renuncia varchar
motivo_renuncia varchar
fecha_renuncia date
dependencia_oficina varchar
cargo varchar
}

Table desplazamiento {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
tipo_desplazamiento varchar
documento_rotacion varchar
fecha_desplazamiento date
oficina_origen varchar
oficina_destino varchar
cargo varchar
}

Table descanso_medico {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
tipo_descanso varchar
documento_sustento varchar
fecha_inicio date
fecha_fin date
dependencia_oficina varchar
cargo varchar
}

Table permiso_licencia_vacaciones {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
tipo_permiso varchar
documento_sustento varchar
fecha_inicio date
fecha_fin date
dependencia_oficina varchar
cargo varchar
}

Table ascenso {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
documento_ascenso varchar
cargo_anterior varchar
cargo_actual varchar
nivel_remunerativo varchar
pap_cnp varchar
fecha_ascenso date
}

Table bonificacion_personal {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
tipo_bonificacion varchar
documento_bonificacion varchar
dependencia_oficina varchar
cargo varchar
}

Table bonificacion_familiar {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
tipo_bonificacion varchar
documento_bonificacion varchar
dependencia_oficina varchar
cargo varchar
}

Table ficha_evaluacion {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
documento_sustento varchar
dependencia_oficina varchar
cargo varchar
fecha_evaluacion date
}

Table merito {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
documento_sustento varchar
dependencia_oficina varchar
cargo varchar
fecha_merito date
}

Table demérito {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
documento_sustento varchar
tipo_sancion varchar
fecha_inicio date
fecha_fin date
dependencia_oficina varchar
cargo varchar
}

Table acta_entrega {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
persona_recibe_acta varchar
documento_acta varchar
dependencia_oficina varchar
cargo varchar
fecha_inicio date
fecha_fin date
}

Table constancia_pago {
id int [pk, increment]
trabajador_id int [ref: > trabajador.id]
documento_pago varchar
dependencia_oficina varchar
cargo varchar
nivel_remunerativo varchar
pap_cnp varchar
dias_laborados_inicio date
dias_laborados_fin date
}
