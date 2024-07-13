"use client";
import React, {useEffect, useState} from 'react';
import Loading from "@/app/components/Loading/Loading";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft, faUniversalAccess} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@/app/components/Tooltip";
import {useRouter} from "next/navigation";
import Button from "@/app/components/Button";

type Subject = {
    name: string;
    testScore: number;
    examScore: number;
};

type StudentData = {
    _id?: string;
    firstName?: string;
    otherNames?: string;
    DateOfBirth?: string;
    lastNames?: string;
    Gender?: string;
    nationality?: string;
    'province/LGA'?: string;
    state?: string;
    address?: string;
    guardianPhone?: string;
    guardianEmail?: string;
    currentClass?: string;
    dateAdmitted?: string;
    guardianName?: string;
    guardianRelationship?: string;
    Disabilities?: boolean;
    disabilityDescription?: string;
    school_id?: string;
    nin?: string;
    image?: string;
    subjects?: Subject[];
};


const StudentProfile: React.FC<{ student: StudentData }> = ({student}) => {
    const {back} = useRouter();
    return (
        <div className="mx-auto p-6 bg-white shadow-md rounded-md">
            <Tooltip content={'Back'}>
                <Button onClick={() => back()} color={'sec'} variant={'outline'} size={'sm'}>
                    <FontAwesomeIcon className='text-5xl'
                                     icon={faCircleLeft}/>
                </Button>
            </Tooltip>
            {student.image && (
                <div className="flex justify-center mb-4 shadow-sec-glow ring-inf border-2 border-amber-800 ring-2">
                    <Image src={student.image} alt={`${student.firstName} ${student.lastNames}`}
                         className="w-100 h-100 md:w-60 md:h-60 rounded-full"/>
                </div>
            )}
            <div className="flex justify-center mb-4 flex-col align-items-center">
                <Image src={'/graduating-student.png'} alt={`${student.firstName} ${student.lastNames}`}
                       className="w-[25%] rounded-full"
                       width={100} height={100}
                />
                <div className="mt-4 sm:text-sm md:text-md lg:text-lg xl:text-xl">
                    <p className='font-extrabold'>{student.nin}</p>
                </div>
                {student.Disabilities && (
                    <div className="my-4 text-red-500 capitalize sm:text-xl md:text-1xl lg:text-3xl xl:text-5xl">
                        <p><span className="font-extrabold sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl"><FontAwesomeIcon icon={faUniversalAccess} /></span> {student.disabilityDescription}</p>
                    </div>
                )}
            </div>
            <h2 className="text-5xl font-bold text-center my-5 text-capitalize">{`${student.firstName} ${student.otherNames} ${student.lastNames}`}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:text-md lg:text-lg xl:text-xl">
                <p><span className="font-bold">Gender:</span> {student.Gender}</p>
                <p><span className="font-bold">Date of Birth:</span> {student.DateOfBirth}</p>
                <p><span className="font-bold text-capitalize">Nationality:</span> {student.nationality}</p>
                <p><span className="font-bold text-capitalize">Province/LGA:</span> {student['province/LGA']}</p>
                <p><span className="font-bold text-capitalize">State:</span> {student.state}</p>
                <p className="font-bold"><span className="font-bold text-capitalize">Address:</span> {student.address}
                </p>
                <p className='text-capitalize font-semibold'><span
                    className="font-semibold">Guardian Name:</span> {student.guardianName}</p>
                <p><span
                    className="font-bold text-capitalize">Guardian Relationship:</span> {student.guardianRelationship}
                </p>
                <p><span className="font-bold">Guardian Phone:</span> {student.guardianPhone}</p>
                <p><span className="font-bold">Guardian Email:</span> {student.guardianEmail}</p>
                <p className='text-capitalize'><span
                    className="font-semibold text-capitalize">Current Class:</span> {student.currentClass}</p>
                <p><span className="font-bold">Date Admitted:</span> {student.dateAdmitted}</p>

            </div>

            {student.subjects && student.subjects.length > 0 && (
                <div className="mt-5 sm:text-sm md:text-md lg:text-lg xl:text-xl">
                    <h3 className="text-2xl md:tetx-4xl font-bold mb-2 text-center my-3">Subjects and Grades:</h3>
                    <table className="min-w-full table-header">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Subject</th>
                            <th className="py-2 px-4 border-b">Test Score</th>
                            <th className="py-2 px-4 border-b">Exam Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {student.subjects.map((subject, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="py-2 px-4 border-b">{subject.name}</td>
                                <td className="py-2 px-4 border-b">{subject.testScore}</td>
                                <td className="py-2 px-4 border-b">{subject.examScore}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const StudentPage = ({params}: { params: { student_id: string } }) => {
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/students/${params.student_id}`);
                const data = await response.json();
                console.log(data)
                setStudent(data);
            } catch (error) {
                console.error('Error fetching vacancies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [params]);

    return (
        <>
            {loading ? (
                <Loading/>
            ) : (
                <StudentProfile student={student}/>
            )}
        </>
    );
};

export default StudentPage;