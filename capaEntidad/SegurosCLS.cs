using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaEntidad
{
    public class SegurosCLS
    {
        public int idSeguro { get; set; }
        public int idReserva { get; set; }
        public int idCliente {  get; set; }
        public string clienteNombre { get; set; }
        public string clienteApellido { get; set; }
        public int idTipoSeguro { get; set; }
        public string tipoSeguro { get; set; }
        public string descripcionSeguro { get; set; }
        public decimal costo { get; set; }
        public DateTime fechaContratacion { get; set; }
    }
}
