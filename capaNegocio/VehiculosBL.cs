using capaDatos;
using capaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaNegocio
{
    public class VehiculosBL
    {
        public List<VehiculosCLS> listarVehiculos()
        {
            VehiculosDAL obj = new VehiculosDAL();
            return obj.listarVehiculos();
        }
    }
}
