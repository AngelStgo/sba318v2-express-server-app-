import express from 'express';
import users from '../data/users.js';

const userRouter = express.Router();

// GET: Retrieve all users
userRouter.get('/', (req, res) => {
    res.json(users);
});

// POST: Create a new user
userRouter.post('/', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name, email: req.body.email };
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
});

// PATCH: Update user by ID
userRouter.patch('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json({ message: 'User updated successfully', user });
});

// DELETE: Remove user by ID
userRouter.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    users.splice(index, 1);
    res.json({ message: 'User deleted successfully' });
});

export default userRouter;
