using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace capaDatos
{
    public class ConexionBD
    {
        public static string getCadenaConexion()
        {
            IConfigurationBuilder builder = new ConfigurationBuilder();
            builder.AddJsonFile("appsettings.json");
            var root = builder.Build();
            string cadenaConexion = root.GetConnectionString("cn");
            return cadenaConexion;
        }
    }
}
