import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

const validateStudentData = (data: any) => {
  const errors: any = {};
  const requiredFields = [
    "firstName",
    "lastNames",
    "DateOfBirth",
    "Gender",
    "nationality",
    "state",
    "address",
    "guardianPhone",
    "guardianEmail",
    "currentClass",
    "dateAdmitted",
    "nin",
    "guardianName",
    "guardianRelationship",
  ];

  requiredFields.forEach((field) => {
    if (!data[field]) {
      errors[field] = `${field} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { isValid, errors } = validateStudentData(req.body);
      if (isValid) {
        const client = await clientPromise;
        const db = client.db("EduAmor");
        const collection = db.collection("students");

        const { nin } = req.body;

        const existingStudent = await collection.findOne({ nin });

        if (existingStudent) {
          res
            .status(400)
            .json({ message: "Student with this NIN already exists" });
          return;
        }

        try {
          const result = await collection.insertOne(req.body);
          res
            .status(200)
            .json({ message: "Student created successfully", result });
        } catch (error) {
          res.status(500).json({ error: "Student creation failed" });
        }
      } else {
        res.status(400).json({ message: "Validation failed", errors });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to process request" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
