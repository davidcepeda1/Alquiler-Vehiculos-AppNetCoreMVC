using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaEntidad
{
    public class ReservasCLS
    {
        public int idReserva { get; set; }
        public int idCliente { get; set; }
        public int idVehiculo { get; set; }
        public DateTime fechaInicio { get; set; }
        public DateTime fechaFin { get; set; }
        public string estado { get; set; }
    }
}
