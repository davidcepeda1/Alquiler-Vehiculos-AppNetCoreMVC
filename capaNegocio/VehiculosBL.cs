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
        public int GuardarVehiculo(VehiculosCLS vehiculo)
        {
            // Llamamos al método de la capa de datos
            VehiculosDAL obj = new VehiculosDAL();
            return obj.GuardarVehiculo(vehiculo);
        }
        public VehiculosCLS RecuperarVehiculo(int idVehiculo)
        {
            VehiculosDAL obj = new VehiculosDAL();
            return obj.RecuperarVehiculo(idVehiculo);
        }
        public int EliminarVehiculo(int idVehiculo)
        {
            VehiculosDAL obj = new VehiculosDAL();
            return obj.EliminarVehiculo(idVehiculo);
        }
    }
}
