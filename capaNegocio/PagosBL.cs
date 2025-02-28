using capaDatos;
using capaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaNegocio
{
    public class PagosBL
    {
        public List<PagosCLS> listarPagos()
        {
            PagosDAL obj = new PagosDAL();
            return obj.listarPagos();
        }
    }
}
