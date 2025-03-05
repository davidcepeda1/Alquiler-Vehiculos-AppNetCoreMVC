using capaDatos;
using capaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace capaNegocio
{
    public class ClientesBL
    {
        public List<ClientesCLS> listarClientes()
        {
            ClientesDAL obj = new ClientesDAL();
            return obj.listarClientes();
        }
        public int Registrar(ClientesCLS usuario)
        {
            // Llamamos al método de la capa de datos
            ClientesDAL cliente = new ClientesDAL();
            return cliente.Registrar(usuario);
        }

        public int ValidarUsuario(ClientesCLS usuario)
        {
            // Llamamos al método de la capa de datos
            ClientesDAL cliente = new ClientesDAL();

            return cliente.ValidarUsuario(usuario);
        }

        
    }
}
