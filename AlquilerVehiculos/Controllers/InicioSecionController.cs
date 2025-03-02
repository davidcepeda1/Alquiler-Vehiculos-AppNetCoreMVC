using Microsoft.AspNetCore.Mvc;
namespace AlquilerVehiculos.Controllers
{
    public class InicioSecionController : Controller
    {
        public IActionResult InicioSecion()
        {
            return View();
        }
    }
}