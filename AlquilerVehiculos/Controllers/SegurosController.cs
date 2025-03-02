using capaDatos;
using capaEntidad;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class SegurosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Basico()
        {
            return View();
        }
        public IActionResult Intermedio()
        {
            return View();
        }
        public IActionResult Premium()
        {
            return View();
        }
        public List<SegurosCLS> listarSeguros()
        {
            SegurosDAL obj = new SegurosDAL();
            return obj.listarSeguros();
        }
    }
}
