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
        public int GuardarCliente(ClientesCLS cliente)
        {
            ClientesBL obj = new ClientesBL();
            return obj.GuardarCliente(cliente);
        }
        public ClientesCLS RecuperarCliente(int idCliente)
        {
            ClientesBL obj = new ClientesBL();
            return obj.RecuperarCliente(idCliente);
        }
        public int EliminarCliente(int idCliente)
        {
            ClientesBL obj = new ClientesBL();
            return obj.EliminarCliente(idCliente);
        }

    }
}
