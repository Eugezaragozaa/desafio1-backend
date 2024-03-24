const fs = require ("fs")
const crypto = require ("crypto")

class UserManager{
    constructor () {
        this.path = process.cwd () + "/data/fs/files/users.json";
        this.init ()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log ("Archivo creado")
        } else {
            console.log ("Archivo existente")
        }
    }

    async create (data) {
        try {
        const user = {
            id: crypto.randomBytes(12).toString("hex"),
            photo: data.photo || "https://ar.pinterest.com/pin/11610911526479727/",
            email: data.email,
            password: data.password,
            role: data.role,
        };

        if (!data.email || !data.password || !data.role) {
            throw new Error ("El usuario no se ha creado, complete todos los campos obligatorios.");
        }
            let users = await fs.promises.readFile(this.path, "utf-8");
            users = JSON.parse(users);

            if (!Array.isArray(users)){
                users = [];
            }
            
            users.push(user);
            console.log ("Usuario creado correctamente");
            //users = JSON.stringify(users, null, 2);
            await fs.promises.writeFile (this.path, JSON.stringify(users, null, 2));
        }catch (error) {
            console.log("Error al crear el usuario", error.message);
        }
    }

    async read() {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8");
            users = JSON.parse(users);
        return users; 
        } catch (error){
            console.log("error al intentar leer el usuario", error.message)
            return [];
        }
    }


    async readOne(id) {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8");
            users = JSON.parse(users);
            const user = users.find(each => each.id === id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            return user;
        } catch (error) {
            console.log("Error al leer usuario:", error.message);
            return null;
        }
    }
    async destroy(id) {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8");
            users = JSON.parse(users);
            const filtered = users.filter(each => each.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));
            console.log(id + " eliminado");
        } catch (error) {
            console.log("Error al eliminar usuario:", error.message);
        }
    }
}

async function test (){
    const usersManager = new UserManager ();
    await usersManager.create ({
        photo: "photo.jpg",
        email:"florcita@gmail.com",
        password: "holamundo123",
        role: "admin", 
    });
    await usersManager.create ({
        photo: "photo.jpg",
        email:"emma_dj@gmail.com",
        password: "callefalsa123",
        role: "admin", 
    });
    await usersManager.create ({
        photo: "photo.jpg",
        email:"fede.mdma@gmail.com",
        password: "calleverdadera456",
        role: "admin", 
    });
    await usersManager.create ({
        photo: "photo.jpg",
        email:"juana_reverbe@gmail.com",
        password: "Juanalomas123",
        role: "admin", 
    });
    await usersManager.create ({
        photo: "photo.jpg",
        email:"esmeralda.gomez@gmail.com",
        password: "0303456Esme.",
        role: "admin", 
    });
    await usersManager.create ({
        photo: "photo.jpg",
        email:"franny.nannis@gmail.com",
        password: "Contra1seña2",
        role: "admin", 
    });
    console.log (await usersManager.read())
    console.log (await usersManager.readOne("0c00ce086b62f93563c0cc2f"))
}

test () 