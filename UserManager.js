class UserManager {
    static #users = [];
    create(data) {
    const user = {
        id:
        UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1,
        photo: data.photo,
        Email: data.email,
        password: data.password,
        role: 0,
    };
    UserManager.#users.push(user);
    console.log("usercreate");
    }
    read(){
        return UserManager.#users
    }
}

const users = new UserManager ();
users.create({
    photo: "photo.png",
    email: "holamundo@gmail.com",
    password: "callefalsa123"
})//crear un nuevo usuario 
console.log (users.read())
