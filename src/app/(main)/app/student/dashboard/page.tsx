"use client";
import { useEffect, useState } from 'react';
import AddStudentForm from './AddStudent';
import { toast } from "sonner";
import Loading from "@/app/components/Loading/Loading";
import Input from '@/app/components/Input/Input';
import Dropdown from "@/app/components/Input/Dropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function StudentDashboard() {
    const [addStudent, setAddStudent] = useState<boolean>(false);
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleFields, setVisibleFields] = useState<string[]>([
        'firstName', 'lastNames', 'otherNames', 'currentClass', 'Gender'
    ]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchField, setSearchField] = useState<string>('firstName');
    const [sortField, setSortField] = useState<string>('firstName');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const { push } = useRouter();

    const addStudentHandler = () => {
        setAddStudent(!addStudent);
    }

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/students/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setStudents(result.students);
                } else if (response.status === 401) {
                    const error = await response.json();
                    toast.warning('Session Expired:', { description: error.error });
                    push('/auth/login');
                    console.error('Session Expired:', error);
                } else {
                    const error = await response.json();
                    toast.error('Error:', { description: error.message });
                    console.error('Error fetching students:', error);
                }
            } catch (error) {
                toast.error('Unexpected error');
                console.error('Unexpected error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const toggleField = (field: string) => {
        setVisibleFields(prevFields =>
            prevFields.includes(field) ? prevFields.filter(f => f !== field) : [...prevFields, field]
        );
    };

    const handleSort = (field: string) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortField(field);
        setSortOrder(isAsc ? 'desc' : 'asc');
    };

    const sortedStudents = [...students].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredStudents = sortedStudents.filter(student =>
        student[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const HandleRowClick = (event: { currentTarget: { id: any; }; }) => {
        const studentId = event.currentTarget.id;
        // console.log('Student ID:', studentId);
        push(`/app/student/${studentId}`)
    };
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
            <div
                className="bg-white p-4 rounded shadow flex flex-col gap-10 lg:grid lg:grid-cols-3 justify-content-center align-items-center">
                <Button icon={<FontAwesomeIcon icon={faUserPlus} />} onClick={addStudentHandler} size={'md'} color={'pri'}>New
                </Button>
                {!addStudent && <Input
                    type="text"
                    className="border px-5 w-full rounded-5"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    name={'search'}
                    id={'search'}
                    label={'Search...'}
                />}
                {!addStudent && <Dropdown
                    label="Search Field"
                    options={['firstName', 'lastNames', 'currentClass', 'Gender', 'guardianName']}
                    selectedOption={searchField}
                    onOptionSelect={(option) => setSearchField(option)}
                />}
            </div>

            {addStudent ? <AddStudentForm /> : <div className="animate-slidInLeft mt-6">
                <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { field: 'firstName', label: 'First Name' },
                            { field: 'otherNames', label: 'Other Names' },
                            { field: 'lastNames', label: 'Last Name' },
                            { field: 'Gender', label: 'Gender' },
                            { field: 'currentClass', label: 'Current Class' },
                            { field: 'nationality', label: 'Nationality' },
                            { field: 'state', label: 'State' },
                            { field: 'province/LGA', label: 'LGA' },
                            { field: 'address', label: 'Address' },
                            { field: 'guardianPhone', label: 'Guardian Phone' },
                            { field: 'guardianEmail', label: 'Guardian Email' },
                            { field: 'guardianName', label: 'Guardian Name' },
                            // {field: 'guardianRelationship', label: 'Guardian Relationship'},
                            // {field: 'Disabilities', label: 'Disabilities'},
                            // {field: 'disabilityDescription', label: 'Disability Description'}
                            // { field: 'DateOfBirth', label: 'Date of Birth' },
                            // { field: 'dateAdmitted', label: 'Date Admitted' },
                        ].map(option => (
                            <Button size={'sm'} key={option.field} onClick={() => toggleField(option.field)}
                                color={visibleFields.includes(option.field) ? 'pri' : 'sec'}>{option.label}</Button>
                        ))}
                    </div>
                </div>

                {loading
                    ? (<Loading />)
                    : (<div className="mt-6 overflow-auto">
                        {students.length === 0 ? (
                            <div className='flex flex-col justify-content-center align-items-center my-5'>
                                <h2 className='m-5 text-center'>No students found.</h2>
                                <Image src='/empty-folder.png' alt='empty-filder-ing' width={100} height={100} />
                            </div>
                        ) : (
                            <table className="min-w-full bg-white border border-gray-200 overflow-x-scroll table-auto">

                                <thead>
                                    <tr>
                                        {visibleFields.map(field => (
                                            <th key={field}
                                                className="py-2 bg-pri px-4 border-b cursor-pointer font-extrabold text-2xl capitalize"
                                                onClick={() => handleSort(field)}>
                                                {field} {sortField === field ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student, index) => (
                                        <tr key={index} id={student._id} onClick={HandleRowClick}
                                            className={`hover:cursor-pointer hover:border border-sec-100 shadow-lg ${index % 2 !== 0 ? 'bg-inf-100' : 'bg-suc-300'}`}>
                                            {visibleFields.map(field => (
                                                <td key={field}
                                                    className="py-2 px-4 capitalize">{student[field]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>)}
            </div>}
        </div>
    );
}
