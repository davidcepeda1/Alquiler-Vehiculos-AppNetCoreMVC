using capaDatos;
using capaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaNegocio
{
    public class ReservasBL
    {
        public List<ReservasCLS> listarReservas()
        {
            ReservasDAL obj = new ReservasDAL();
            return obj.listarReservas();
        }
    }
}
