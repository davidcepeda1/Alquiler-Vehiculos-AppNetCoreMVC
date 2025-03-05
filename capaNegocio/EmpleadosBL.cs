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
        public int GuardarEmpleado(EmpleadosCLS empleado)
        {
            // Llamamos al método de la capa de datos
            EmpleadosDAL obj = new EmpleadosDAL();
            return obj.GuardarEmpleado(empleado);
        }
        public EmpleadosCLS RecuperarEmpleado(int idEmpleado)
        {
            EmpleadosDAL obj = new EmpleadosDAL();
            return obj.RecuperarEmpleado(idEmpleado);
        }
        public int EliminarEmpleado(int idEmpleado)
        {
            EmpleadosDAL obj = new EmpleadosDAL();
            return obj.EliminarEmpleado(idEmpleado);
        }
    }
}
