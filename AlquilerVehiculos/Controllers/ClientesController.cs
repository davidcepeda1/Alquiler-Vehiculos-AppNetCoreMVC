﻿using capaDatos;
using capaEntidad;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class ClientesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public List<ClientesCLS> listarClientes()
        {
            ClientesDAL obj = new ClientesDAL();
            return obj.listarClientes();
        }
    }
}
