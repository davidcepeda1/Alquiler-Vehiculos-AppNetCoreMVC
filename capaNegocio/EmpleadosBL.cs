using capaDatos;
using capaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaNegocio
{
    public class EmpleadosBL
    {
        public List<EmpleadosCLS> listarEmpleados()
        {
            EmpleadosDAL obj = new EmpleadosDAL();
            return obj.listarEmpleados();
        }
    }
}
