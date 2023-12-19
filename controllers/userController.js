const dbPool = require('../_dbConnect');
const addUserToDataBase = require('../utils/addUserToDB');

async function addUserData(req, res) {
    try {
        const { name, email, phone, DOB, address, batch_timing, start_date } = req.body;
        if (age < 18 || age > 65) {
            throw new Error('Age should be between 18 and 65');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email address');
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error('Invalid phone number');
        }

        const personID = await addUserToDataBase({ name, email, phone, DOB, address, batch_timing, start_date });
        return res.send(
            {
                status: 'OK',
                statusCode: 201,
                PersonID: personID,
                message: 'User data created successfully',
            }
        )
    } catch (e) {
        return res.send(
            {
                status: 'ERROR',
                statusCode: 500,
                message: e.message,
            }
        )
    }
}

module.exports = { addUserData };
