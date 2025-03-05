using capaDatos;
using capaEntidad;
using capaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class EmpleadosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public List<EmpleadosCLS> listarEmpleados()
        {
            EmpleadosDAL obj = new EmpleadosDAL();
            return obj.listarEmpleados();
        }
        public int GuardarEmpleado(EmpleadosCLS empleado )
        {
            EmpleadosBL obj = new EmpleadosBL();
            return obj.GuardarEmpleado(empleado);
        }
        public EmpleadosCLS RecuperarEmpleado(int idEmpleado)
        {
            EmpleadosBL obj = new EmpleadosBL();
            
            EmpleadosCLS empleados = obj.RecuperarEmpleado(idEmpleado);
            return empleados;
        }
        public int EliminarEmpleado(int idEmpleado)
        {
            EmpleadosBL obj = new EmpleadosBL();
            return obj.EliminarEmpleado(idEmpleado);
        }
    }
}
