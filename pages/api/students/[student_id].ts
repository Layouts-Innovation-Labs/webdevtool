import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || '';

if (JWT_SECRET === '') {
    throw new Error("JWT_SECRET is not defined");
}

/**
 * Retrieves a student's information based on the provided student ID and school ID.
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the outgoing response.
 * @returns A JSON response containing the student's information if successful, or an error message if unsuccessful.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const db = client.db('EduAmor');
            const collection = db.collection('students');

            // Parse the cookie
            const cookies = parse(req.headers.cookie || '');
            const token = cookies.COOK;

            if (!token) {
                return res.status(401).json({ error: 'No token found' });
            }

            // Verify and decode the token
            const decoded: any = jwt.verify(token, JWT_SECRET);
            const userData = decoded.userData;

            if (!userData) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const schoolId = userData._id;

            // Extract student_id from the query
            const { student_id } = req.query;

            if (!ObjectId.isValid(student_id as string)) {
                return res.status(400).json({ error: 'Invalid student ID' });
            }

            // Fetch the student with the given student_id and school_id
            const student = await collection.findOne({ _id: new ObjectId(student_id as string), school_id: schoolId });

            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }

            res.status(200).json(student);
        } catch (error) {
            console.error('Error fetching student:', error);
            res.status(500).json({ error: 'Unable to process request' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
