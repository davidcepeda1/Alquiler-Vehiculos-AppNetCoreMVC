using capaDatos;
using capaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaNegocio
{
    public class SegurosBL
    {
        public List<SegurosCLS> listarSeguros()
        {
            SegurosDAL obj = new SegurosDAL();
            return obj.listarSeguros();
        }
    }
}
