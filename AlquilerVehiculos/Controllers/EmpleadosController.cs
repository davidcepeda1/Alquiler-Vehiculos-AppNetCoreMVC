using capaDatos;
using capaEntidad;
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
    }
}
