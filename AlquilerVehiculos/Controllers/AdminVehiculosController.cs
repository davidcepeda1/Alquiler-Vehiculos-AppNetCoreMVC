using capaEntidad;
using capaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class AdminVehiculosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public int GuardarVehiculo(VehiculosCLS vehiculo)
        {
            VehiculosBL obj = new VehiculosBL();
            return obj.GuardarVehiculo(vehiculo);
        }
        public VehiculosCLS RecuperarVehiculo(int idVehiculo)
        {
            VehiculosBL obj = new VehiculosBL();
            return obj.RecuperarVehiculo(idVehiculo);
        }
        public int EliminarVehiculo(int idVehiculo)
        {
            VehiculosBL obj = new VehiculosBL();
            return obj.EliminarVehiculo(idVehiculo);
        }
    }
}
