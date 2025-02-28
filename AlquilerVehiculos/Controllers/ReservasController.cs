using capaDatos;
using capaEntidad;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class ReservasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public List<ReservasCLS> listarReservas()
        {
            ReservasDAL obj = new ReservasDAL();
            return obj.listarReservas();
        }
    }
}
