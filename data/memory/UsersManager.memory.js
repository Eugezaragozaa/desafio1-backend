const crypto = require ("crypto")

class UserManager {
    static #users = [];
    create (data) {
        const user = {
            id: crypto.randomBytes(12).toString("hex"),
            photo: data.photo || "",
            email: data.email,
            password: data.password,
            role: data.role,
        };

        if (!data.email || !data.password || !data.role) {
        console.log ("El usuario no se ha creado, complete todos los campos obligatorios.")}
        else { 
            UserManager.#users.push(user);
        console.log ("Usuario creado correctamente");
        }
    }
    read() {
        try {
            if (UserManager.#users.length === 0) {
                throw new Error("No se encontraron usuarios.");
            }
            return UserManager.#users;
        } catch (error) {
            console.log("Error al leer usuarios:", error.message);
            return [];
        }
    }

    readOne(id) {
        try {
            const user = UserManager.#users.find(each => each.id === id);
            if (!user) {
                throw new Error("Usuario no encontrado.");
            }
            return user;
        } catch (error) {
            console.log("Error al leer usuario:", error.message);
            return null;
        }
    }

    destroy(id) {
        try {
            const filtered = UserManager.#users.filter(each => each.id !== id);
            if (filtered.length === UserManager.#users.length) {
                throw new Error("Usuario no encontrado.");
            }
            UserManager.#users = filtered;
            console.log(id + " eliminado");
        } catch (error) {
            console.log("Error al eliminar usuario:", error.message);
        }
    }
}

const usersManager = new UserManager ();
    usersManager.create ({
        photo: "photo.jpg",
        email:"florcita@gmail.com",
        password: "holamundo123",
        role: "admin", 
    });
    usersManager.create ({
        photo: "photo.jpg",
        email:"emma_dj@gmail.com",
        password: "callefalsa123",
        role: "admin", 
    });
    usersManager.create ({
        photo: "photo.jpg",
        email:"fede.mdma@gmail.com",
        password: "calleverdadera456",
        role: "admin", 
    });
    usersManager.create ({
        photo: "photo.jpg",
        email:"juana_reverbe@gmail.com",
        password: "Juanalomas123",
        role: "admin", 
    });
    usersManager.create ({
        photo: "photo.jpg",
        email:"esmeralda.gomez@gmail.com",
        password: "0303456Esme.",
        role: "admin", 
    });
    usersManager.create ({
        photo: "photo.jpg",
        email:"franny.nannis@gmail.com",
        password: "Contra1seña2",
        role: "admin", 
    });

    console.log(usersManager.read());
