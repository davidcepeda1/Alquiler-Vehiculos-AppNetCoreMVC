using capaEntidad;
using capaNegocio;
using Microsoft.AspNetCore.Mvc;
namespace AlquilerVehiculos.Controllers
{
    public class InicioSesionController : Controller
    {
        public IActionResult InicioSesion()
        {
            return View();
        }

        public int Registrar(ClientesCLS usuario)
        {
            ClientesBL cliente = new ClientesBL(); 
            return cliente.Registrar(usuario);
        }


        public int Validar(ClientesCLS usuario)
        {
            ClientesBL cliente = new ClientesBL();
            return cliente.ValidarUsuario(usuario);
        }

    }
}