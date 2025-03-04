using capaEntidad;
using capaNegocio;
using Microsoft.AspNetCore.Mvc;
namespace AlquilerVehiculos.Controllers
{
    public class InicioSecionController : Controller
    {
        public IActionResult InicioSecion()
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