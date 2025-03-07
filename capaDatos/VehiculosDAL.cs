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
    public class VehiculosDAL : ConexionBD
    {
        public List<VehiculosCLS> listarVehiculos()
        {
            List<VehiculosCLS> Lista = null;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarVehiculos", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

                        if (drd != null)
                        {
                            VehiculosCLS oVehiculosCLS;
                            Lista = new List<VehiculosCLS>();

                            int posidVehiculo = drd.GetOrdinal("VEHICULO_ID"); 
                            int posmarca = drd.GetOrdinal("MARCA");
                            int posmodelo = drd.GetOrdinal("MODELO");
                            int posaño = drd.GetOrdinal("ANIO");
                            int posprecio = drd.GetOrdinal("PRECIO");
                            int posestado = drd.GetOrdinal("ESTADO");
                            int posimagen = drd.GetOrdinal("IMAGEN");

                            while (drd.Read())
                            {
                                oVehiculosCLS = new VehiculosCLS();
                                oVehiculosCLS.idVehiculo = drd.IsDBNull(posidVehiculo) ? 0 : drd.GetInt32(0);
                                oVehiculosCLS.marca = drd.IsDBNull(posmarca) ? " " : drd.GetString(1);
                                oVehiculosCLS.modelo = drd.IsDBNull(posmodelo) ? " " : drd.GetString(2);
                                oVehiculosCLS.año = drd.IsDBNull(posaño) ? 0 : drd.GetInt32(3);
                                oVehiculosCLS.precio = drd.IsDBNull(posprecio) ? 0 : drd.GetDecimal(4);
                                oVehiculosCLS.estado = drd.IsDBNull(posestado) ? " " : drd.GetString(5);
                                oVehiculosCLS.imagen = drd.IsDBNull(posimagen) ? " " : drd.GetString(6);
                                Lista.Add(oVehiculosCLS);
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
        public int GuardarVehiculo(VehiculosCLS vehiculos)
        {
            int respuesta = 0;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspGuardarVehiculo", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idVehiculo", vehiculos.idVehiculo);
                        cmd.Parameters.AddWithValue("@marca", vehiculos.marca == null ? "" : vehiculos.marca);
                        cmd.Parameters.AddWithValue("@modelo", vehiculos.modelo == null ? "" : vehiculos.modelo);
                        cmd.Parameters.AddWithValue("@año", vehiculos.año == 0 ? 0 : vehiculos.año);
                        cmd.Parameters.AddWithValue("@precio", vehiculos.precio == 0 ? 0  : vehiculos.precio);
                        cmd.Parameters.AddWithValue("@estado", vehiculos.estado == null ? "" : vehiculos.estado);
                        cmd.Parameters.AddWithValue("@imagen", vehiculos.imagen == null ? "" : vehiculos.imagen);
                       
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
        public VehiculosCLS RecuperarVehiculo(int idVehiculo)
        {
            VehiculosCLS vehiculo = null; // Inicializar como null
            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarVehiculo", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@vehiculoId", idVehiculo);

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.HasRows) // Verificar si hay filas
                            {
                                while (dr.Read())
                                {
                                    vehiculo = new VehiculosCLS
                                    {
                                        idVehiculo  = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                        marca = dr.IsDBNull(1) ? "" : dr.GetString(1),
                                        modelo = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                        año = dr.IsDBNull(3) ? 0 : dr.GetInt32(3),
                                        precio = dr.IsDBNull(4) ? 0 : dr.GetDecimal(4),
                                        estado = dr.IsDBNull(5) ? "" : dr.GetString(5),
                                        imagen = dr.IsDBNull(6) ? "" : dr.GetString(6)
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
            return vehiculo; // Devolver el objeto empleados
        }
        public int EliminarVehiculo(int idVehiculo)
        {
            int respuesta = 0;
            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspEliminarVehiculo", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idVehiculo", idVehiculo);
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
