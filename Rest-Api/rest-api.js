const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var api = express.Router();


const port = process.env.PORT || 8080;

app.use(cors());

// funcion que se encarga de hacer conexión con la base de datos
let cachedDbPool;
function getDbPool() {
    if (!cachedDbPool) {
        console.log("entro en el metodo que debe de conectar con la base de datos")
        cachedDbPool = mysql.createPool({
            // nada mas se puede descomentar cuando se va subir a google cloud
            // (cuando se suba hay que montar una nueva imagen que contenga los nuevos cambios)
            connectionLimit: 1,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_NAME,
            socketPath: `/cloudsql/${process.env.INST_CON_NAME}`


            // esto nada mas se descomenta cuando se estan haciendo pruebas locales
            // host: "34.95.157.90",
            // user: "mesasdb",
            // password: "mesasdb123",
            // database: 'mesas_interactivas'
        });


    }
    return cachedDbPool;
}

app.listen(port, () => {
    console.log('REST API listening on port ', port);
});

app.get('/', async (req, res) => {

    res.json({
        status: 'success',
        data: "se ha conectado satisfactoriamente"
    })
});

// Inicio de las rutas de los usarios

// ruta del login del usuario
api.post('/Usuario/Login', async (req, res) => {

res.append('Access-Control-Allow-Methods','*') 

    let parametros ={
        nombre:req.body.nombre,
        contraseña: req.body.password
    }   
    const user = await Login(parametros);
    if (user[0][0].id_alerta){
        res.json({
            estado: "error",
            error: user[0][0]
        })
    }else{
        res.json({
            estado: "success",
            usuario: user[0][0],
            mensaje: "se ha traido el usario satisfactoriamente"
        })
    }
});

// ruta para entrar como usuario invitado
api.get('/Usuario/LoginInvitado', async (req, res) => {

res.append('Access-Control-Allow-Methods','*')  
    const user = await Login_Invitado();
    res.json({
        estado: "success",
        usuario: user[0][0],
        mensaje: "El usuario ha entrado como login invitado"
    })
});

// ruta para la creacion del usuario
api.post('/Usuario/Crear', async (req, res) => {

res.append('Access-Control-Allow-Methods','*') 
    let parametros ={
        nombre:req.body.nombre,
        correo:req.body.correo,
        contraseña: req.body.password
    }   
    const user = await Create_User(parametros);
    
    if (user[0][0].id_alerta){
        res.json({
            estado: "error",
            error: user[0][0],
        })

    }else{
        res.json({
            estado: "success",
            usuario: user[0][0],
            mensaje: "Usuario creado satisfactoriamente"
        })
    }
});

// ruta para verificar usuario para el cambio de contraseña
api.post('/Usuario/Verificar', async (req, res) => {

res.append('Access-Control-Allow-Methods','*') 
    let parametros ={
        nombre:req.body.nombre,
        correo: req.body.correo
    }   
    const user = await Verficar_Usario(parametros);
    if (user[0][0].id_alerta){
        res.json({
            estado: "error",
            error: user[0][0]
        })
    }else{
        res.json({
            estado: "success",
            usuario: user[0][0],
            mensaje: "validacion realizada satisfactoriamente "
        })
    }
});

// ruta para cambiar la contraseña del usuario
//cambio
api.post('/Usuario/Cambiar', async (req, res) => {

res.append('Access-Control-Allow-Methods','*') 
    let parametros ={
        id_usuario:req.body.id_usuario,
        password: req.body.password
    }   
    const user = await Cambiar_Contraseña(parametros);
   
    if (user[0][0].id_alerta != 24){
        res.json({
            estado: "error",
            error: user[0][0]
        })
    }else{
        res.json({
            estado: "success",
            mensaje: user[0][0].mensaje
        })
    }
});


// fin de las rutas de los uaurios

// --------------------------------------------------------

// inicio de las rutas de los platos 

// ruta para mostrar los platos disponibles tanto para el administrador como para los usuarios
api.get('/Platos/Disponibles', async (req, res) => {

res.append('Access-Control-Allow-Methods','*')  
    const platos = await Disponibles();

    if (platos[0][0].id_alerta){
        res.json({
            status: "error",
            error: platos[0][0]
        })
    }else{
        res.json({
            estado: "success",
            plato: platos[0],
            mensaje: "Lista de platos disponibles"
        })
    }
});

// ruta para traer los platos no disponibles
api.get('/Platos/NoDisponibles', async (req, res) => {
res.append('Access-Control-Allow-Methods','*')  
    const platos = await No_Disponibles();

    
    if (platos[0][0].id_alerta){
        res.json({
            status: "error",
            error: platos[0][0]
        })
    }else{
        res.json({
            estado: "success",
            plato: platos[0],
            mensaje: "Lista de platos disponibles"
        })
    }
});

// ruta para crear platos
api.post('/Platos/Crear', async (req, res) => {
res.append('Access-Control-Allow-Methods','*') 
    let parametros ={
        nombre:req.body.nombre,
        precio:req.body.precio,
        descripcion:req.body.descripcion,
        imagen:req.body.imagen
    }

    const platos = await Crear_Platos(parametros);

    if(platos[0][0].id_alerta){
        res.json({
            estado: "error",
            error: platos[0][0],
            // mensaje: "Plato creado satisfactoriamente"
        })
    }else{
        res.json({
            estado: "success",
            plato: platos[0][0],
            mensaje: "Plato creado satisfactoriamente"
        })
    }
});

// ruta para mnodificar un plato
api.post('/Platos/Modificar', async (req, res) => {
res.append('Access-Control-Allow-Methods','*') 
    let parametros ={
        id:req.body.id,
        nombre:req.body.nombre,
        precio:req.body.precio,
        descripcion:req.body.descripcion,
        estado: req.body.estado,
        imagen:req.body.imagen
    }

    const platos = await Modificar_Platos(parametros);

    if(platos[0][0].id_alerta != 7){
        res.json({
            estado: "error",
            error: platos[0][0],
            // mensaje: "Plato creado satisfactoriamente"
        })
    }else{
        res.json({
            estado: "success",
            mensaje: "Plato modificado satisfactoriamente"
        })
    }
});

// ruta para asignar categorias a un plato
api.post('/Categorias/Agregar', async (req, res) => {

res.append('Access-Control-Allow-Methods','*') 
    let parametros ={
        id_plato:req.body.id_plato,
        id_categoria: req.body.id_categoria
    }

    const platos = await Asignar_Categoria(parametros);
 
    if( platos.sqlState){
        console.log("entro en la condicion");
        res.json({
            estado: "error",
            error: platos,
            // mensaje: "Plato creado satisfactoriamente"
        })
    } 
    else if( platos[0][0].id_alerta != 9){
        res.json({
            estado: "error",
            error: platos[0][0],
            // mensaje: "Plato creado satisfactoriamente"
        })
    }else{
        res.json({
            estado: "success",
            mensaje: "Se ha añadido la categoria satisfactoriamente"
        })
    }
});

// ruta para mostrar todas las categorias activas
api.get('/Categorias', async (req, res) => {
res.append('Access-Control-Allow-Methods','*')  
    const platos = await Mostrar_Categorias();

    if (platos[0][0].id_alerta){
        res.json({
            status: "error",
            error: platos[0][0]
        })
    }else{
        res.json({
            estado: "success",
            plato: platos[0],
            mensaje: "Lista de categorias disponibles"
        })
    }
});

// ruta para mostrar las todos los platos que tiene una categoria
api.post('/Categorias/Id', async (req, res) => {

res.append('Access-Control-Allow-Methods','*')  
    let parametros ={
        id_categoria: req.body.id_categoria
    }
    const platos = await Mostrar_Categorias_Plato(parametros);

    if (platos[0][0].id_alerta){
        res.json({
            status: "error",
            error: platos[0][0]
        })
    }else{
        res.json({
            estado: "success",
            plato: platos[0],
            mensaje: "Lista de platos de la categoria"
        })
    }
});


api.post('/Platos/Categorias', async (req, res) => {

    res.append('Access-Control-Allow-Methods','*')  
        let parametros ={
            id_plato: req.body.id_plato
        }
        const platos = await Mostrar_Platos_Categorias(parametros);
    
        if (platos[0][0].id_alerta){
            res.json({
                status: "error",
                error: platos[0][0]
            })
        }else{
            res.json({
                estado: "success",
                categortias: platos[0],
                mensaje: "Listas de las categorias pertenecientes al plato"
            })
        }
    });

// ruta poara mostrar los detalles de un plato
api.post('/Plato/Id', async (req, res) => {

res.append('Access-Control-Allow-Methods','*')  
    let parametros ={
        id_plato: req.body.id_plato
    }
    const platos = await Mostrar_Plato(parametros);

    if (platos[0][0].id_alerta){
        res.json({
            status: "error",
            error: platos[0][0]
        })
    }else{
        res.json({
            estado: "success",
            plato: platos[0],
            mensaje: "Datos del plato"
        })
    }
});
// fin de las rutas de los platos 

// inicio de las rutas de pedido

// ruta para realizar pedidos
api.post('/Pedidos/Realizar', async (req, res) => {

res.append('Access-Control-Allow-Methods','*') 
    let parametros ={
        id_usuario:req.body.id_usuario,
        mesa:req.body.mesa,
        precio:req.body.precio,
        nota_cocinero:req.body.nota_cocinero
    }

    const pedidos = await Realizar_Pedido(parametros);
    res.json({
        estado: "success",
        pedido: pedidos[0][0],
        mensaje: "Pedido realizado satisfactoriamente"
    })
});

// ruta para especificar los platos que tiene un pedido (error de fecha pedido)
api.post('/Pedidos/Especificar', async (req, res) => {

res.append('Access-Control-Allow-Methods','*') 
    let parametros ={
        id_pedido:req.body.id_pedido,
        id_plato:req.body.id_plato,
        cantidad:req.body.cantidad
    }

    const pedidos = await Especificar_Pedido(parametros);
    if(pedidos[0][0].id_alerta != 12 ){
        res.json({
            estado: "error",
            error: pedidos[0][0],
            // mensaje: "Plato creado satisfactoriamente"
        })
    }else{
        res.json({
            estado: "success",
            mensaje: pedidos[0][0].mensaje,
            
        })
    }
});

// ruta para mostarar todos los pedidos activos
api.get('/Pedidos/Activos', async (req, res) => {

res.append('Access-Control-Allow-Methods','*')  
    const pedido = await Pedidos_Activos();

    if (pedido[0][0].id_alerta){
        res.json({
            status: "error",
            error: pedido[0][0]
        })
    }else{
        res.json({
            estado: "success",
            pedidos: pedido[0],
            mensaje: "Listad de pedidos activos"
        })
    }
});

// ruta para confirmar un pedido
api.post('/Pedidos/Confirmar', async (req, res) => {
res.append('Access-Control-Allow-Methods','*') 
    let parametros ={
        id_pedido:req.body.id_pedido,
    }

    const pedidos = await Confirmar_Pedido(parametros);
    if(pedidos[0][0].id_alerta != 14 ){
        res.json({
            estado: "error",
            error: pedidos[0][0],
            // mensaje: "Plato creado satisfactoriamente"
        })
    }else{
        res.json({
            estado: "success",
            mensaje:pedidos[0][0].mensaje 
        })
    }
});

// ruta para mostrar los pedidos en curso
api.get('/Pedidos/EnCurso', async (req, res) => {

res.append('Access-Control-Allow-Methods','*')  
    const pedido = await Pedidos_EnCurso();

    if (pedido[0][0].id_alerta){
        res.json({
            status: "error",
            error: pedido[0][0]
        })
    }else{
        res.json({
            estado: "success",
            pedidos: pedido[0],
            mensaje: "Listad de pedidos en curso"
        })
    }
});

// ruta para mostrar la informacion del pedido
api.post('/Pedidos/Informacion', async (req, res) => {
    res.append('Access-Control-Allow-Methods','*') 
        let parametros ={
            id_pedido:req.body.id_pedido,
        }
    
        const pedidos = await Mostrar_Informacion_Pedido(parametros);
        if(pedidos[0][0].id_alerta ){
            res.json({
                estado: "error",
                error: pedidos[0][0],
                // mensaje: "Plato creado satisfactoriamente"
            })
        }else{
            res.json({
                estado: "success",
                pedido: pedidos[0],
                mensaje:"datos del pedido"
            })
        }
});

// ruta para añadir una valoracion al pedido 
api.post('/Pedidos/Valoracion', async (req, res) => {
    res.append('Access-Control-Allow-Methods','*') 
        let parametros ={
            id_pedido:req.body.id_pedido,
            valoracion: req.body.valoracion
        }
    
        const pedidos = await Valorar_Pedido(parametros);
        if(pedidos[0][0].id_alerta != 31){
            res.json({
                estado: "error",
                error: pedidos[0][0],
                // mensaje: "Plato creado satisfactoriamente"
            })
        }else{
            res.json({
                estado: "success",
                mensaje: pedidos[0][0].mensaje
            })
        }
});

// ruta para finalizar un pedido
api.post('/Pedidos/Finalizar', async (req, res) => {
    res.append('Access-Control-Allow-Methods','*') 
        let parametros ={
            id_pedido:req.body.id_pedido,
        }
    
        const pedidos = await Finalizar_Pedido(parametros);
        if(pedidos[0][0].id_alerta != 18){
            res.json({
                estado: "error",
                error: pedidos[0][0],
                // mensaje: "Plato creado satisfactoriamente"
            })
        }else{
            res.json({
                estado: "success",
                mensaje: pedidos[0][0].mensaje
            })
        }
});

// ruta para mostrar los pedidos en finalizados
api.get('/Pedidos/Finalizados', async (req, res) => {

    res.append('Access-Control-Allow-Methods','*')  
        const pedido = await Pedidos_Finalizados();
    
        if (pedido[0][0].id_alerta){
            res.json({
                status: "error",
                error: pedido[0][0]
            })
        }else{
            res.json({
                estado: "success",
                pedidos: pedido[0],
                mensaje: "Listad de pedidos en curso"
            })
        }
    });
// fin de las rutas de pedido

// esto es para definir las rutas de la api 
app.use(api);



// metodo que se encarga de traer a a un usuario en especifico;
async function Login(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call login('"+req.nombre+"','"+req.contraseña+"')", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para verificar que un usuario existe 
async function Verficar_Usario(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call verificarUsuario('"+req.nombre+"','"+req.correo+"')", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para cambiar la contraseña de un usuario
async function Cambiar_Contraseña(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call cambiarContraseña("+req.id_usuario+",'"+req.password+"')", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para crear usuario
async function Create_User(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call crearUsuario('"+req.nombre+"','"+req.correo+"','"+req.contraseña+"')", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para ingrear ucomo usario invitado
async function Login_Invitado(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call loginInvitado()", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para traer los platos disponibles
async function Disponibles(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarPlatosDisponibles() ", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para traer los platos no disponibles
async function No_Disponibles(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarPlatosNoDisponibles() ", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para crear un plato
async function Crear_Platos(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call crearPlato('"+req.nombre+"',"+req.precio+",'"+req.descripcion+"','"+req.imagen+"')", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para modificar un plato
async function Modificar_Platos(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call modificarPlato("+req.id+",'"+req.nombre+"',"+req.precio+",'"+req.descripcion+"',"+req.estado+",'"+req.imagen+"')", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para aañadir categorias a un plato
async function Asignar_Categoria(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call asignarCategoria("+req.id_plato+","+req.id_categoria+")", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para mostrar todas las categorias
async function Mostrar_Categorias(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarCategoria() ", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// mostrar las categorias que tiene un plato
async function Mostrar_Categorias_Plato(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarPlatosCategoria("+req.id_categoria+")", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para mostrar todos los detalles de un plato
async function Mostrar_Plato(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarPlato("+req.id_plato+")", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para realizar pedido 
async function Realizar_Pedido(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call realizarPedido("+req.id_usuario+","+req.precio+","+req.mesa+",'"+req.nota_cocinero+"')", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para añadir platos a un pedido activo
async function Especificar_Pedido(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call  especificarPedido("+req.id_pedido+","+req.id_plato+","+req.cantidad+")", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para mostrar todos los pedidos activos
async function Pedidos_Activos(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarPedidosActivos() ", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para confirmar un pedido (en preparacion)
async function Confirmar_Pedido(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call confirmarPedido("+req.id_pedido+")", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para ver los pedidos que estan en curso
async function Pedidos_EnCurso(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarPedidosEnCurso()", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para ver los pedidos finalizados
async function Pedidos_Finalizados(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarPedidosRealizados()", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

async function Finalizar_Pedido(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call finalizarPedido("+req.id_pedido+")", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

async function Valorar_Pedido(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call valorarPedido("+req.id_pedido+","+req.valoracion+")", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}


async function Mostrar_Informacion_Pedido(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarInformacionPedido("+req.id_pedido+")", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

// metodo para mostrar todas las categorias que tiene un plato
async function Mostrar_Platos_Categorias(req, res) {

    return new Promise(function (resolve, reject) {
        getDbPool().query("call mostrarCategoriasPlato("+req.id_plato+")", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });
    })
}

