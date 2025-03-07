using capaDatos;
using capaEntidad;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class VehiculosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public List<VehiculosCLS> listarVehiculos()
        {
            VehiculosDAL obj = new VehiculosDAL();
            return obj.listarVehiculos();
        }
        public List<VehiculosCLS> listarVehiculosDisponibles()
        {
            VehiculosDAL obj = new VehiculosDAL();
            return obj.listarVehiculosDisponibles();
        }
    }
}
