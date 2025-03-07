using capaDatos;
using capaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaNegocio
{
    public class ReservasBL
    {
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
            ReservasDAL obj = new ReservasDAL();
            return obj.ActualizarEstadoReserva(reserva);
        }
        public ReservasCLS RecuperarReserva(int idReserva)
        {
            ReservasDAL obj = new ReservasDAL();
            return obj.RecuperarReserva(idReserva);
        }
        public int EliminarReserva(int idReserva)
        {
            ReservasDAL obj = new ReservasDAL();
            return obj.EliminarReserva(idReserva);
        }
    }
}
