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

                    // 1️⃣ Ejecutar el procedimiento almacenado para generar pagos
                    using (SqlCommand cmdGenerarPagos = new SqlCommand("uspGenerarPagos", cn))
                    {
                        cmdGenerarPagos.CommandType = System.Data.CommandType.StoredProcedure;
                        cmdGenerarPagos.ExecuteNonQuery(); // No esperamos resultados, solo ejecutamos
                    }

                    // 2️⃣ Ejecutar el procedimiento almacenado para listar pagos
                    using (SqlCommand cmdListarPagos = new SqlCommand("uspListarPagos", cn))
                    {
                        cmdListarPagos.CommandType = System.Data.CommandType.StoredProcedure;
                        SqlDataReader drd = cmdListarPagos.ExecuteReader(CommandBehavior.SingleResult);

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
                                oPagosCLS.idPago = drd.IsDBNull(posidPago) ? 0 : drd.GetInt32(posidPago);
                                oPagosCLS.idReserva = drd.IsDBNull(posidReserva) ? 0 : drd.GetInt32(posidReserva);
                                oPagosCLS.idCliente = drd.IsDBNull(posidCliente) ? 0 : drd.GetInt32(posidCliente);
                                oPagosCLS.clienteNombre = drd.IsDBNull(posclienteNombre) ? " " : drd.GetString(posclienteNombre);
                                oPagosCLS.clienteApellido = drd.IsDBNull(posclienteApellido) ? " " : drd.GetString(posclienteApellido);
                                oPagosCLS.monto = drd.IsDBNull(posmontoP) ? 0 : drd.GetDecimal(posmontoP);
                                oPagosCLS.idMetodoPago = drd.IsDBNull(posmetodoPagoId) ? 0 : drd.GetInt32(posmetodoPagoId);
                                oPagosCLS.metodoPago = drd.IsDBNull(posmetodoPago) ? " " : drd.GetString(posmetodoPago);
                                oPagosCLS.fechaPago = drd.IsDBNull(posfechaPago) ? DateTime.Now : drd.GetDateTime(posfechaPago);
                                Lista.Add(oPagosCLS);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: " + ex.Message);
                    Lista = null;
                }
            }
            return Lista;
        }

        public int RegistrarPago(PagosCLS pagos)
        {
            try
            {
                string cadenaDato = ConexionBD.getCadenaConexion();

                using (SqlConnection cn = new SqlConnection(cadenaDato))
                {
                    cn.Open();
                    SqlCommand cmd = new SqlCommand("RegistrarPago", cn);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ReservaID", pagos.idReserva);
                    cmd.Parameters.AddWithValue("@Monto", pagos.monto);
                    cmd.Parameters.AddWithValue("@MetodoPagoID", pagos.idMetodoPago);

                    // Ejecutar el procedimiento y obtener el ID del pago
                    int pagoID = Convert.ToInt32(cmd.ExecuteScalar());
                    return pagoID;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al registrar el pago: " + ex.Message);
            }
        }

        
    }
}
