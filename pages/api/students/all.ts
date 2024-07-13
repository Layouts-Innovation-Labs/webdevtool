import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || '';

if (JWT_SECRET === '') {
    throw new Error("JWT_SECRET is not defined");
}

/**
 * Retrieves all students associated with a school.
 * 
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} - A Promise that resolves when the students are retrieved and the response is sent.
 * @throws {Error} - If JWT_SECRET is not defined.
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

            // console.log('schoolId:', schoolId, 'userData:', userData);
            // Fetch students with the school ID
            const students = await collection.find({ school_id: schoolId }).toArray();

            res.status(200).json({ students });
        } catch (error) {
            res.status(500).json({ error: 'Unable to process request' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
