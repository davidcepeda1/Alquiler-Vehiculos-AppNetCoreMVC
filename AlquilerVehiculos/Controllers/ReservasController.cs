using capaDatos;
using capaEntidad;
using capaNegocio;
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
        public int CrearReserva(ReservasCLS reservas)
        {
            ReservasDAL obj = new ReservasDAL();
            return obj.CrearReserva(reservas);
        }
        public int ActualizarEstadoReserva(ReservasCLS reserva)
        {
            ReservasBL obj = new ReservasBL();
            return obj.ActualizarEstadoReserva(reserva);
        }
        public ReservasCLS RecuperarReserva(int idReserva)
        {
            ReservasBL obj = new ReservasBL();
            return obj.RecuperarReserva(idReserva);
        }
        public int EliminarReserva(int idReserva)
        {
            ReservasBL obj = new ReservasBL();
            return obj.EliminarReserva(idReserva);
        }
    }
}
