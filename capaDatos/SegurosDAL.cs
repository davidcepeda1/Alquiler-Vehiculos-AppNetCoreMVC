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
    public class SegurosDAL : ConexionBD
    {
        public List<SegurosCLS> listarSeguros()
        {
            List<SegurosCLS> Lista = null;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarSeguros", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

                        if (drd != null)
                        {
                            SegurosCLS oSegurosCLS;
                            Lista = new List<SegurosCLS>();

                            int posidSeguro = drd.GetOrdinal("SEGURO_ID");
                            int posidReserva = drd.GetOrdinal("RESERVA_ID");
                            int posidCliente = drd.GetOrdinal("CLIENTE_ID");
                            int posclienteNombre = drd.GetOrdinal("CLIENTE_NOMBRE");
                            int posclienteApellido = drd.GetOrdinal("CLIENTE_APELLIDO");
                            int posidTipoSeguro = drd.GetOrdinal("TIPO_SEGURO_ID");
                            int postipoSeguro = drd.GetOrdinal("TIPO_SEGURO");
                            int posdescripcionSeguro = drd.GetOrdinal("DESCRIPCION_SEGURO");
                            int poscostoSeguro = drd.GetOrdinal("COSTO");
                            int posfechaContratacion = drd.GetOrdinal("FECHA_CONTRATACION");

                            while (drd.Read())
                            {
                                oSegurosCLS = new SegurosCLS();
                                oSegurosCLS.idSeguro = drd.IsDBNull(posidSeguro) ? 0 : drd.GetInt32(0);
                                oSegurosCLS.idReserva = drd.IsDBNull(posidReserva) ? 0 : drd.GetInt32(1);
                                oSegurosCLS.idCliente = drd.IsDBNull(posidCliente) ? 0 : drd.GetInt32(2);
                                oSegurosCLS.clienteNombre = drd.IsDBNull(posclienteNombre) ? " " : drd.GetString(3);
                                oSegurosCLS.clienteApellido = drd.IsDBNull(posclienteApellido) ? " " : drd.GetString(4);
                                oSegurosCLS.idTipoSeguro = drd.IsDBNull(posidTipoSeguro) ? 0 : drd.GetInt32(5);
                                oSegurosCLS.tipoSeguro = drd.IsDBNull(postipoSeguro) ? " " : drd.GetString(6);
                                oSegurosCLS.descripcionSeguro = drd.IsDBNull(posdescripcionSeguro) ? " " : drd.GetString(7);
                                oSegurosCLS.costo = drd.IsDBNull(poscostoSeguro) ? 0 : drd.GetDecimal(8);
                                oSegurosCLS.fechaContratacion = drd.IsDBNull(posfechaContratacion) ? DateTime.Now : drd.GetDateTime(9);
                                Lista.Add(oSegurosCLS);
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
