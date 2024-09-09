export interface Afiliado {
    id:                    number;
    genero:                string;
    indicador:             string;
    telefono:              string;
    direccion:             string;
    email:                 string;
    tipo_documento:        string;
    numero_identificacion: number;
    primer_apellido:       string;
    segundo_apellido:      string;
    primer_nombre:         string;
    segundo_nombre:        string;
    fecha_nacimiento:      Date;
    codigo_municipio:      string;
    fecha_ingreso:         Date;
    fecha_retiro:          Date;
}
