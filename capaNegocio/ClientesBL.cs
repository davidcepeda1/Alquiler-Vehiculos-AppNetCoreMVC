using capaDatos;
using capaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
