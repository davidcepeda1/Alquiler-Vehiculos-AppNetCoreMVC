using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using capaEntidad;
using System.Text.RegularExpressions;

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
        public int Registrar(ClientesCLS usuario)
        {
            int registrado = 0;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspRegistroUsuario", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        // Definir los parámetros
                        cmd.Parameters.AddWithValue("@nombre", usuario.nombre == null ? " " : usuario.nombre);
                        cmd.Parameters.AddWithValue("@apellido", usuario.apellido == null ? " " : usuario.apellido);
                        cmd.Parameters.AddWithValue("@usuario", usuario.nombreUsuario == null ? " " : usuario.nombreUsuario);
                        cmd.Parameters.AddWithValue("@telefono", usuario.telefono);
                        cmd.Parameters.AddWithValue("@email", usuario.email == null ? " " : usuario.email);
                        cmd.Parameters.AddWithValue("@contrasena", usuario.contraseña == null ? " " : usuario.contraseña);

                        cn.Open();

                        // Ejecutar el procedimiento
                        registrado = cmd.ExecuteNonQuery();

                    }
                }
                catch (Exception ex)
                {
                    registrado = 0;
                    // Manejo de error
                    Console.WriteLine("Error en registrar dal " + ex.Message);
                }
            }
            
            return registrado;
        }

        public int ValidarUsuario(ClientesCLS usuario)
        {
            int respuesta = 0;
            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspValidarUsuario", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        // Definir los parámetros
       
                        cmd.Parameters.AddWithValue("@usuario", usuario.nombreUsuario ?? string.Empty);
                        cmd.Parameters.AddWithValue("@contrasena", usuario.contraseña ?? string.Empty);

                        cn.Open();

                        var resultado = cmd.ExecuteScalar();  // ✅ Aquí recuperas el resultado
                        if (resultado != null)
                        {
                            respuesta = Convert.ToInt32(resultado);
                        }

                    }
                }
                catch (Exception ex)
                {
                    // Manejo de error
                    Console.WriteLine("Error al insertar usuario: " + ex.Message);

                }
            }

            return respuesta == 0 ? -1 : respuesta;
        }
    }
}
