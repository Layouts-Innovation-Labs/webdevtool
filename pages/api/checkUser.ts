/**
 * Handles the request to check if a user already exists with the provided username or email address.
 * 
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} - A promise that resolves when the request is processed.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

/**
 * Handles the request to check if a user already exists.
 * 
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the request is handled.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, emailAddress } = req.body;

        try {
            const client = await clientPromise;
            const db = client.db('EduAmor');
            const collection = db.collection('institutions');

            const existingUser = await collection.findOne({
                $or: [
                    { username },
                    { emailAddress }
                ]
            });

            if (existingUser) {
                res.status(400).json({ message: 'User with this username or email already exists' });
            } else {
                res.status(200).json({ message: 'Username and email are available' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Unable to process request' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
