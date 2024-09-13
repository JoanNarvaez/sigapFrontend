

export interface Empresa {
    id:                      number;
    tipo_identificacion:     string;
    razon_social:            string;
    numero_nit:              number;
    digito_verificacion:     number;
    tipo_entidad:            number;
    codigo_municipio:        string;
    actividad_economica:     number;
    telefono:                string;
    direccion:               string;
    email:                   string;
    valor_activo:            number;
    valor_pasivo:            number;
    valor_patrimonio:        number;
    valor_patrimonio_sin_re: number;
    valor_reserva_especial:  number;
    codigo_Contable:         number;
}
