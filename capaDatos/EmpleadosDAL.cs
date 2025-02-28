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
    public class EmpleadosDAL : ConexionBD
    {
        public List<EmpleadosCLS> listarEmpleados()
        {
            List<EmpleadosCLS> Lista = null;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarEmpleados", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

                        if (drd != null)
                        {
                            EmpleadosCLS oEmpleadosCLS;
                            Lista = new List<EmpleadosCLS>();

                            int posidEmpleado = drd.GetOrdinal("ID");
                            int posnombreEm = drd.GetOrdinal("NOMBRE");
                            int posapellidoEm = drd.GetOrdinal("APELLIDO");
                            int poscargoEm = drd.GetOrdinal("CARGO");
                            int postelefonoEm = drd.GetOrdinal("TELEFONO");
                            int posemailEm = drd.GetOrdinal("EMAIL");

                            while (drd.Read())
                            {
                                oEmpleadosCLS = new EmpleadosCLS();
                                oEmpleadosCLS.idEmpleado = drd.IsDBNull(posidEmpleado) ? 0 : drd.GetInt32(0);
                                oEmpleadosCLS.nombre = drd.IsDBNull(posnombreEm) ? " " : drd.GetString(1);
                                oEmpleadosCLS.apellido = drd.IsDBNull(posapellidoEm) ? " " : drd.GetString(2);
                                oEmpleadosCLS.cargo = drd.IsDBNull(poscargoEm) ? " " : drd.GetString(3);
                                oEmpleadosCLS.telefono = drd.IsDBNull(postelefonoEm) ? " " : drd.GetString(4);
                                oEmpleadosCLS.email = drd.IsDBNull(posemailEm) ? " " : drd.GetString(5);

                                Lista.Add(oEmpleadosCLS);
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
