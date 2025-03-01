using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using capaEntidad;

namespace capaDatos
{
    public class ClientesDAL : ConexionBD
    {
        public List<ClientesCLS> listarClientes()
        {
            List<ClientesCLS> Lista = null;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarCLientes", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

                        if (drd != null)
                        {
                            ClientesCLS oClientesCLS;
                            Lista = new List<ClientesCLS>();

                            int posidCliente = drd.GetOrdinal("CLIENTE_ID");
                            int posidUsuario = drd.GetOrdinal("USUARIO_ID");
                            int posnombreU = drd.GetOrdinal("NOMBRE_USUARIO");
                            int posemailCl = drd.GetOrdinal("EMAIL");
                            int posnombreCl = drd.GetOrdinal("NOMBRE");
                            int posapellidoCl = drd.GetOrdinal("APELLIDO");
                            int postelefonoCl = drd.GetOrdinal("TELEFONO");

                            while (drd.Read())
                            {
                                oClientesCLS = new ClientesCLS();
                                oClientesCLS.idCliente = drd.IsDBNull(posidCliente) ? 0 : drd.GetInt32(0);
                                oClientesCLS.idUsuario = drd.IsDBNull(posidCliente) ? 0 : drd.GetInt32(1);
                                oClientesCLS.nombreUsuario = drd.IsDBNull(posnombreU) ? " " : drd.GetString(2);
                                oClientesCLS.email = drd.IsDBNull(posemailCl) ? " " : drd.GetString(3);
                                oClientesCLS.nombre = drd.IsDBNull(posnombreCl) ? " " : drd.GetString(4);
                                oClientesCLS.apellido = drd.IsDBNull(posapellidoCl) ? " " : drd.GetString(5);
                                oClientesCLS.telefono = drd.IsDBNull(postelefonoCl) ? " " : drd.GetString(6);

                                Lista.Add(oClientesCLS);
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
