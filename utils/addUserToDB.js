const dbPool = require('../_dbConnect');



async function addUserToDataBase(userDetails) {
    try {
        const client = await dbPool.getConnection();
        await client.query('BEGIN');

        const addToPersonTable = `INSERT INTO Person (Name, EmailAddress, PhoneNumber, DateOfBirth, Address)
        VALUES ('${userDetails.name}', '${userDetails.email}', '${userDetails.phone}', '${userDetails.DOB}', '${userDetails.address}')`;
        const personResult = await client.query(addToPersonTable);
        const personID = personResult.rows[0].PersonID;

        const addToYogaClassMonthTable = `INSERT INTO YogaClassMonth (Month) VALUES ('${userDetails.start_date}')`;
        const classMonthResult = await client.query(addToYogaClassMonthTable);
        const classMonthID = classMonthResult.rows[0].ClassMonthID;

        const YogaClassBatchTable = `INSERT INTO YogaClassBatch (BatchTime, Capacity) VALUES ('${userDetails.batch_timing}', '60')`;
        const batchResult = await client.query(YogaClassBatchTable);
        const batchID = batchResult.rows[0].BatchID;

        const addToEnrollmentTable = `INSERT INTO Enrollment (PersonID, ClassMonthID, BatchID)
        VALUES (${personID}, ${classMonthID}, ${batchID})`;

        await client.query(addToEnrollmentTable);
        await client.query('COMMIT');
        return personID;
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error('Error in adding user to database');
    }
    finally {
        client.release();
    }

}

module.exports = { addUserToDataBase };