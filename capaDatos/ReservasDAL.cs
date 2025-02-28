using capaEntidad;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaDatos
{
    public class ReservasDAL : ConexionBD
    {
        public List<ReservasCLS> listarReservas()
        {
            List<ReservasCLS> Lista = null;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarReservas", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

                        if (drd != null)
                        {
                            ReservasCLS oReservasCLS;
                            Lista = new List<ReservasCLS>();

                            int posidReserva = drd.GetOrdinal("ID");
                            int posidCliente = drd.GetOrdinal("CLIENTE_ID");
                            int posidVehiculo = drd.GetOrdinal("VEHICULO_ID");
                            int posfechaInicio = drd.GetOrdinal("FECHA_INICIO");
                            int posfechaFin = drd.GetOrdinal("FECHA_FIN");
                            int posestadoR = drd.GetOrdinal("ESTADO");

                            while (drd.Read())
                            {
                                oReservasCLS = new ReservasCLS();
                                oReservasCLS.idReserva = drd.IsDBNull(posidReserva) ? 0 : drd.GetInt32(0);
                                oReservasCLS.idCliente = drd.IsDBNull(posidCliente) ? 0 : drd.GetInt32(1);
                                oReservasCLS.idVehiculo = drd.IsDBNull(posidVehiculo) ? 0 : drd.GetInt32(2);
                                oReservasCLS.fechaInicio = drd.IsDBNull(posfechaInicio) ? DateTime.Now : drd.GetDateTime(3);
                                oReservasCLS.fechaFin = drd.IsDBNull(posfechaFin) ? DateTime.Now : drd.GetDateTime(4);
                                oReservasCLS.estado = drd.IsDBNull(posestadoR) ? " " : drd.GetString(5);
                                Lista.Add(oReservasCLS);
                            }
                        }
                    }
                }
                catch (Exception)
                {
                    cn.Close();
                    Lista = null;
                }
            }
            return Lista;
        }
    }
}
