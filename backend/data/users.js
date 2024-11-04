import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Victor Andrew',
        email: 'victor@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Hannatu Dikko',
        email: 'hannatu@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
]
export default users