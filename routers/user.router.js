const { Router } = require("express");
const { createUser, getUser, updateUser, deleteUser, userLogin } = require("../controllers/user.Controller");

const U_router = Router();

U_router.post('/', createUser);
U_router.post('/login', userLogin);
U_router.get('/data', getUser);
U_router.patch('/update/:id', updateUser);
U_router.delete('/delete/:id', deleteUser);

module.exports = U_router;
