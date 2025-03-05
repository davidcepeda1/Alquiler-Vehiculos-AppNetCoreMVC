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

        public int GuardarEmpleado(EmpleadosCLS empleado)
        {
            int respuesta = 0;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspGuardarEmpleadoYUsuario", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idUsuario", empleado.idUsuario);
                        cmd.Parameters.AddWithValue("@nombreUsuario", empleado.nombreUsuario);
                        cmd.Parameters.AddWithValue("@email", empleado.email == null ? "" : empleado.email);
                        cmd.Parameters.AddWithValue("@contrasena", empleado.contraseña == null ? "" : empleado.contraseña);
                        cmd.Parameters.AddWithValue("@nombreEmpleado", empleado.nombre== null ? "" : empleado.nombre);
                        cmd.Parameters.AddWithValue("@apellidoEmpleado", empleado.apellido== null ? "" : empleado.apellido);
                        cmd.Parameters.AddWithValue("@cargoEmpleado", empleado.cargo == null ? "" : empleado.cargo);
                        cmd.Parameters.AddWithValue("@telefonoEmpleado", empleado.telefono == null ? "" : empleado.telefono);


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
        
        public EmpleadosCLS RecuperarEmpleado(int idEmpleado)
        {
            EmpleadosCLS empleados = null; // Inicializar como null
            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarEmpleados", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@usuarioId", idEmpleado);

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.HasRows) // Verificar si hay filas
                            {
                                while (dr.Read())
                                {
                                    empleados = new EmpleadosCLS
                                    {
                                        idEmpleado = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                        idUsuario = dr.IsDBNull(1) ? 0 : dr.GetInt32(1),
                                        nombre = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                        apellido = dr.IsDBNull(3) ? "" : dr.GetString(3),
                                        cargo = dr.IsDBNull(4) ? "" : dr.GetString(4),
                                        telefono = dr.IsDBNull(5) ? "" : dr.GetString(5),
                                        email = dr.IsDBNull(6) ? "" : dr.GetString(6) // Corregido el índice
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
            return empleados; // Devolver el objeto empleados
        }

        public int EliminarEmpleado(int idEmpleado)
        {
            int respuesta = 0;
            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspEliminarEmpleado", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idEmpleado", idEmpleado);
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
