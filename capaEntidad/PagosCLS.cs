using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaEntidad
{
    public class PagosCLS
    {
        public int idPago { get; set; }
        public int idReserva { get; set; }
        public int idCliente { get; set; }
        public string clienteNombre { get; set; }
        public string clienteApellido { get; set; }
        public decimal monto { get; set; }
        public int idMetodoPago { get; set; }
        public string metodoPago { get; set; }
        public DateTime fechaPago { get; set; }
    }
}
