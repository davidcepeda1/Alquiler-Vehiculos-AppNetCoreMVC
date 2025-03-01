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
    }
}
