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

                            int posidReserva = drd.GetOrdinal("RESERVA_ID");
                            int posidCliente = drd.GetOrdinal("CLIENTE_ID");
                            int posclienteNombre = drd.GetOrdinal("CLIENTE_NOMBRE");
                            int posclienteApellido = drd.GetOrdinal("CLIENTE_APELLIDO");
                            int posidVehiculo = drd.GetOrdinal("VEHICULO_ID");
                            int posvehiculoMarca = drd.GetOrdinal("VEHICULO_MARCA");
                            int posvehiculoModelo = drd.GetOrdinal("VEHICULO_MODELO");
                            int posvehiculoAño = drd.GetOrdinal("VEHICULO_AÑO");
                            int posfechaInicio = drd.GetOrdinal("FECHA_INICIO");
                            int posfechaFin = drd.GetOrdinal("FECHA_FIN");
                            int posestado = drd.GetOrdinal("ESTADO");

                            while (drd.Read())
                            {
                                oReservasCLS = new ReservasCLS();
                                oReservasCLS.idReserva = drd.IsDBNull(posidReserva) ? 0 : drd.GetInt32(0);
                                oReservasCLS.idCliente = drd.IsDBNull(posidCliente) ? 0 : drd.GetInt32(1);
                                oReservasCLS.clienteNombre = drd.IsDBNull(posclienteNombre) ? " " : drd.GetString(3);
                                oReservasCLS.clienteApellido = drd.IsDBNull(posclienteApellido) ? " " : drd.GetString(4);
                                oReservasCLS.idVehiculo = drd.IsDBNull(posidVehiculo) ? 0 : drd.GetInt32(5);
                                oReservasCLS.vehiculoMarca = drd.IsDBNull(posvehiculoMarca) ? " " : drd.GetString(6);
                                oReservasCLS.vehiculoModelo = drd.IsDBNull(posvehiculoModelo) ? " " : drd.GetString(7);
                                oReservasCLS.vehiculoAño = drd.IsDBNull(posvehiculoAño) ? 0 : drd.GetInt32(8);
                                oReservasCLS.fechaInicio = drd.IsDBNull(posfechaInicio) ? DateTime.Now : drd.GetDateTime(9);
                                oReservasCLS.fechaFin = drd.IsDBNull(posfechaFin) ? DateTime.Now : drd.GetDateTime(10);
                                oReservasCLS.estado = drd.IsDBNull(posestado) ? " " : drd.GetString(11);
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
