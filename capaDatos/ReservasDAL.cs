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
    public class ReservasDAL : ConexionBD
    {
        public List<ReservasCLS> listarReservas()
        {
            List<ReservasCLS> Lista = null;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarReservas", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

                        if (drd != null)
                        {
                            ReservasCLS oReservasCLS;
                            Lista = new List<ReservasCLS>();

                            int posidReserva = drd.GetOrdinal("RESERVA_ID");
                            int posidCliente = drd.GetOrdinal("CLIENTE_ID");
                            int posclienteNombre = drd.GetOrdinal("CLIENTE_NOMBRE");
                            int posclienteApellido = drd.GetOrdinal("CLIENTE_APELLIDO");
                            int posidVehiculo = drd.GetOrdinal("VEHICULO_ID");
                            int posvehiculoMarca = drd.GetOrdinal("VEHICULO_MARCA");
                            int posvehiculoModelo = drd.GetOrdinal("VEHICULO_MODELO");
                            int posvehiculoAño = drd.GetOrdinal("VEHICULO_AÑO");
                            int posfechaInicio = drd.GetOrdinal("FECHA_INICIO");
                            int posfechaFin = drd.GetOrdinal("FECHA_FIN");
                            int posestado = drd.GetOrdinal("ESTADO");

                            while (drd.Read())
                            {
                                oReservasCLS = new ReservasCLS();
                                oReservasCLS.idReserva = drd.IsDBNull(posidReserva) ? 0 : drd.GetInt32(0);
                                oReservasCLS.idCliente = drd.IsDBNull(posidCliente) ? 0 : drd.GetInt32(1);
                                oReservasCLS.clienteNombre = drd.IsDBNull(posclienteNombre) ? " " : drd.GetString(3);
                                oReservasCLS.clienteApellido = drd.IsDBNull(posclienteApellido) ? " " : drd.GetString(4);
                                oReservasCLS.idVehiculo = drd.IsDBNull(posidVehiculo) ? 0 : drd.GetInt32(5);
                                oReservasCLS.vehiculoMarca = drd.IsDBNull(posvehiculoMarca) ? " " : drd.GetString(6);
                                oReservasCLS.vehiculoModelo = drd.IsDBNull(posvehiculoModelo) ? " " : drd.GetString(7);
                                oReservasCLS.vehiculoAño = drd.IsDBNull(posvehiculoAño) ? 0 : drd.GetInt32(8);
                                oReservasCLS.fechaInicio = drd.IsDBNull(posfechaInicio) ? DateTime.Now : drd.GetDateTime(9);
                                oReservasCLS.fechaFin = drd.IsDBNull(posfechaFin) ? DateTime.Now : drd.GetDateTime(10);
                                oReservasCLS.estado = drd.IsDBNull(posestado) ? " " : drd.GetString(11);
                                Lista.Add(oReservasCLS);
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
        public int CrearReserva(ReservasCLS reservas)
        {
            try
            {
                // Verificar si 'reservas' es nulo
                if (reservas == null)
                {
                    throw new Exception("El objeto de reserva es nulo.");
                }

                string cadenaDato = ConexionBD.getCadenaConexion();
                using (SqlConnection cn = new SqlConnection(cadenaDato))
                {
                    cn.Open();
                    SqlCommand cmd = new SqlCommand("uspCrearReserva", cn);
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Asegurarse de que el idCliente y idVehiculo no sean nulos antes de agregarlos como parámetros
                    if (reservas.idCliente == 0 || reservas.idVehiculo == 0)
                    {
                        throw new Exception("El ID del cliente o del vehículo es inválido.");
                    }

                    cmd.Parameters.AddWithValue("@ClienteID", reservas.idCliente);
                    cmd.Parameters.AddWithValue("@VehiculoID", reservas.idVehiculo);
                    cmd.Parameters.AddWithValue("@FechaInicio", reservas.fechaInicio);
                    cmd.Parameters.AddWithValue("@FechaFin", reservas.fechaFin);
                    cmd.Parameters.AddWithValue("@Estado", reservas.estado ?? string.Empty);

                    // Ejecutar el procedimiento y obtener el ID de la reserva
                    int idReserva = Convert.ToInt32(cmd.ExecuteScalar());
                    return idReserva;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al crear la reserva: " + ex.Message);
            }
        }

        public int ActualizarEstadoReserva(ReservasCLS reserva)
        {
            int respuesta = 0;

            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspActualizarEstadoReserva", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@reservaId", reserva.idReserva);
                        cmd.Parameters.AddWithValue("@nuevoEstado", reserva.estado== null ? "" : reserva.estado);


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

        public ReservasCLS RecuperarReserva(int idReserva)
        {
            ReservasCLS reserva = null; // Inicializar como null
            string cadenaDato = ConexionBD.getCadenaConexion();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarClientes", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@reservaId", idReserva);

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.HasRows) // Verificar si hay filas
                            {
                                while (dr.Read())
                                {
                                    reserva = new ReservasCLS
                                    {
                                        idReserva = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                        idCliente = dr.IsDBNull(1) ? 0 : dr.GetInt32(1),
                                        clienteNombre = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                        clienteApellido = dr.IsDBNull(3) ? "" : dr.GetString(3),
                                        idVehiculo = dr.IsDBNull(4) ? 0 : dr.GetInt32(4),
                                        vehiculoMarca = dr.IsDBNull(5) ? "" : dr.GetString(5),
                                        vehiculoModelo = dr.IsDBNull(6) ? "" : dr.GetString(6),
                                        vehiculoAño = dr.IsDBNull(7) ? 0 : dr.GetInt32(7),
                                        fechaInicio = dr.IsDBNull(8) ? DateTime.MinValue : dr.GetDateTime(8),
                                        fechaFin = dr.IsDBNull(9) ? DateTime.MinValue : dr.GetDateTime(9),
                                        estado = dr.IsDBNull(10) ? "" : dr.GetString(10)
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
            return reserva; // Devolver el objeto empleados
        }
        public int EliminarReserva(int idReserva)
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
                        cmd.Parameters.AddWithValue("@reservaId", idReserva);
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