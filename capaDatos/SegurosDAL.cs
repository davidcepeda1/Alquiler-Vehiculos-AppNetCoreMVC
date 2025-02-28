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

                            int posidSeguro = drd.GetOrdinal("ID");
                            int posidReserva = drd.GetOrdinal("RESERVA_ID");
                            int postipoSeguro = drd.GetOrdinal("TIPO_SEGURO");
                            int poscostoSeguro = drd.GetOrdinal("COSTO");

                            while (drd.Read())
                            {
                                oSegurosCLS = new SegurosCLS();
                                oSegurosCLS.idSeguro = drd.IsDBNull(posidSeguro) ? 0 : drd.GetInt32(0);
                                oSegurosCLS.idReserva = drd.IsDBNull(posidReserva) ? 0 : drd.GetInt32(1);
                                oSegurosCLS.tipoSeguro = drd.IsDBNull(postipoSeguro) ? " " : drd.GetString(2);
                                oSegurosCLS.costo = drd.IsDBNull(poscostoSeguro) ? 0 : drd.GetDecimal(3);
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
