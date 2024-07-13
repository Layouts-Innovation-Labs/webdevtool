import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

const validateForm = (formData: any) => {
  const errors: any = {};
  const requiredFields = [
    'institutionName',
    'address',
    'phoneNumber',
    'emailAddress',
    'username',
    'password',
  ];

  requiredFields.forEach(field => {
    if (!formData[field]) {
      errors[field] = `${field} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Handles the registration of a new institution.
 * 
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the outgoing response.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { isValid, errors } = validateForm(req.body);
      if (isValid) {
        const client = await clientPromise;
        const db = client.db('EduAmor');
        const collection = db.collection('institutions');

        const { username, emailAddress } = req.body;

        // Check if the user already exists
        const existingUser = await collection.findOne({
          $or: [
            { username },
            { emailAddress }
          ]
        });

        if (existingUser) {
          res.status(400).json({ message: 'username or email already exists' });
          return;
        }
        try {
          const result = await collection.insertOne(req.body);
          res.status(200).json({ message: 'Institution created successfully', result });
        } catch (error) {
          res.status(500).json({ error: 'Institution creation failed' });
        }
      } else {
        res.status(400).json({ message: 'Validation failed', errors });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to process request' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
