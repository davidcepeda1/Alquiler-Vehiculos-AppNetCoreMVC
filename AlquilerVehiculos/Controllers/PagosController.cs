using capaDatos;
using capaEntidad;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class PagosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public List<PagosCLS> listarPagos()
        {
            PagosDAL obj = new PagosDAL();
            return obj.listarPagos();
        }
        public int RegistrarPago(PagosCLS pagos)
        {
            PagosDAL obj = new PagosDAL();
            return obj.RegistrarPago(pagos);
        }
    }
}
