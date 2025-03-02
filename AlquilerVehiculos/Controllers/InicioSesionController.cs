using Microsoft.AspNetCore.Mvc;
namespace AlquilerVehiculos.Controllers
{
    public class InicioSesionController : Controller
    {
        public IActionResult InicioSesion()
        {
            return View();
        }
    }
}