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

                            int posidEmpleado = drd.GetOrdinal("EMPLEADO_ID");
                            int posidUsuario = drd.GetOrdinal("USUARIO_ID");
                            int posnombreUsuario = drd.GetOrdinal("NOMBRE_USUARIO");
                            int posemailEm = drd.GetOrdinal("EMAIL");
                            int posnombreEm = drd.GetOrdinal("NOMBRE");
                            int posapellidoEm = drd.GetOrdinal("APELLIDO");
                            int poscargoEm = drd.GetOrdinal("CARGO");
                            int postelefonoEm = drd.GetOrdinal("TELEFONO");

                            while (drd.Read())
                            {
                                oEmpleadosCLS = new EmpleadosCLS();
                                oEmpleadosCLS.idEmpleado = drd.IsDBNull(posidEmpleado) ? 0 : drd.GetInt32(0);
                                oEmpleadosCLS.idUsuario = drd.IsDBNull(posidUsuario) ? 0 : drd.GetInt32(1);
                                oEmpleadosCLS.nombreUsuario = drd.IsDBNull(posnombreUsuario) ? " " : drd.GetString(2);
                                oEmpleadosCLS.email = drd.IsDBNull(posemailEm) ? " " : drd.GetString(3);
                                oEmpleadosCLS.nombre = drd.IsDBNull(posnombreEm) ? " " : drd.GetString(4);
                                oEmpleadosCLS.apellido = drd.IsDBNull(posapellidoEm) ? " " : drd.GetString(5);
                                oEmpleadosCLS.cargo = drd.IsDBNull(poscargoEm) ? " " : drd.GetString(6);
                                oEmpleadosCLS.telefono = drd.IsDBNull(postelefonoEm) ? " " : drd.GetString(7);

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
