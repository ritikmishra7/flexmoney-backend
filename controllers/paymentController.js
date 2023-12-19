const dbPool = require('../_dbConnect');


async function completePayment(req, res) {
    try {
        const { PersonID } = req.body;
        const client = await dbPool.getConnection();
        const updatePaymentStatus = `UPDATE Enrollment SET PaymentStatus = 'Paid' WHERE PersonID = ${PersonID}`;
        await client.query(updatePaymentStatus);
        return res.send(
            {
                status: 'OK',
                statusCode: 200,
                message: 'Payment Successful',
            }
        )
    } catch (error) {
        return res.send(
            {
                status: 'ERROR',
                statusCode: 500,
                message: error.message,
            }
        )
    }
}

module.exports = { completePayment };
