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
        public string tipoSeguro { get; set; }
        public decimal costo { get; set; }
    }
}
