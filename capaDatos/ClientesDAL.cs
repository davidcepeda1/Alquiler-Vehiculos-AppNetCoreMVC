using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using capaEntidad;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations;

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
            int respuesta = -2;
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
                        
                        if (resultado != null && resultado != DBNull.Value)
                        {
                            return respuesta = Convert.ToInt32(resultado); // Convierte el valor obtenido de SQL
                        }


                    }
                }
                catch (Exception ex)
                {
                    // Manejo de error
                    Console.WriteLine("Error al insertar usuario: " + ex.Message);

                }
            }

            return respuesta;
        }
        public int GuardarCliente(ClientesCLS cliente)
        {
            int respuesta = 0;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspGuardarClienteYUsuario", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idUsuario", cliente.idUsuario);
                        cmd.Parameters.AddWithValue("@nombreUsuario", cliente.nombreUsuario);
                        cmd.Parameters.AddWithValue("@email", cliente.email == null ? "" : cliente.email);
                        cmd.Parameters.AddWithValue("@contrasena", cliente.contraseña == null ? "" : cliente.contraseña);
                        cmd.Parameters.AddWithValue("@nombreCliente", cliente.nombre == null ? "" : cliente.nombre);
                        cmd.Parameters.AddWithValue("@apellidoCliente", cliente.apellido == null ? "" : cliente.apellido);
                        cmd.Parameters.AddWithValue("@telefonoCliente", cliente.telefono == null ? "" : cliente.telefono);


                        respuesta = cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception)
                {
                    cn.Close();
                    respuesta = 0;
                    throw;
                }
            }
            return respuesta;
        }

        public ClientesCLS RecuperarCliente(int idCliente)
        {
            ClientesCLS clientes = null; // Inicializar como null
            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarClientes", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@usuarioId", idCliente);

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.HasRows) // Verificar si hay filas
                            {
                                while (dr.Read())
                                {
                                    clientes = new ClientesCLS
                                    {
                                        idCliente = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                        idUsuario = dr.IsDBNull(1) ? 0 : dr.GetInt32(1),
                                        nombre = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                        apellido = dr.IsDBNull(3) ? "" : dr.GetString(3),
                                        telefono = dr.IsDBNull(4) ? "" : dr.GetString(4),
                                        nombreUsuario = dr.IsDBNull(5) ? "" : dr.GetString(5),
                                        email = dr.IsDBNull(6) ? "" : dr.GetString(6)
                                    };
                                }
                            }
                            else
                            {
                                Console.WriteLine("No se encontraron registros para el ID proporcionado.");
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Manejo de excepciones
                    Console.WriteLine("Error: " + ex.Message);
                }
                finally
                {
                    cn.Close();
                }
            }
            return clientes; // Devolver el objeto empleados
        }
        public int EliminarCliente(int idCliente)
        {
            int respuesta = 0;
            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspEliminarCliente", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        respuesta = cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception)
                {
                    cn.Close();
                }
            }
            return respuesta;
        }
    }
}
