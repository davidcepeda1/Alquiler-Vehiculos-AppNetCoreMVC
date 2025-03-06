using capaDatos;
using capaEntidad;
using capaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class ClientesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public List<ClientesCLS> listarClientes()
        {
            ClientesDAL obj = new ClientesDAL();
            List<ClientesCLS> clientes =  obj.listarClientes();
            return clientes;
        }
    }
}
