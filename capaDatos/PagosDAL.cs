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
    public class PagosDAL : ConexionBD
    {
        public List<PagosCLS> listarPagos()
        {
            List<PagosCLS> Lista = null;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarPagos", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

                        if (drd != null)
                        {
                            PagosCLS oPagosCLS;
                            Lista = new List<PagosCLS>();

                            int posidPago = drd.GetOrdinal("PAGO_ID");
                            int posidReserva = drd.GetOrdinal("RESERVA_ID");
                            int posidCliente = drd.GetOrdinal("CLIENTE_ID");
                            int posclienteNombre = drd.GetOrdinal("CLIENTE_NOMBRE");
                            int posclienteApellido = drd.GetOrdinal("CLIENTE_APELLIDO");
                            int posmontoP = drd.GetOrdinal("MONTO");
                            int posmetodoPagoId = drd.GetOrdinal("METODO_PAGO_ID");
                            int posmetodoPago = drd.GetOrdinal("METODO_PAGO");
                            int posfechaPago = drd.GetOrdinal("FECHA_PAGO");

                            while (drd.Read())
                            {
                                oPagosCLS = new PagosCLS();
                                oPagosCLS.idPago = drd.IsDBNull(posidPago) ? 0 : drd.GetInt32(0);
                                oPagosCLS.idReserva = drd.IsDBNull(posidReserva) ? 0 : drd.GetInt32(1);
                                oPagosCLS.idCliente = drd.IsDBNull(posidCliente) ? 0 : drd.GetInt32(2);
                                oPagosCLS.clienteNombre = drd.IsDBNull(posclienteNombre) ? " " : drd.GetString(3);
                                oPagosCLS.clienteApellido = drd.IsDBNull(posclienteApellido) ? " " : drd.GetString(4);
                                oPagosCLS.monto = drd.IsDBNull(posmontoP) ? 0 : drd.GetDecimal(5);
                                oPagosCLS.idMetodoPago = drd.IsDBNull(posmetodoPagoId) ? 0 : drd.GetInt32(6);
                                oPagosCLS.metodoPago = drd.IsDBNull(posmetodoPago) ? " " : drd.GetString(7);
                                oPagosCLS.fechaPago = drd.IsDBNull(posfechaPago) ? DateTime.Now : drd.GetDateTime(8);
                                Lista.Add(oPagosCLS);
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
