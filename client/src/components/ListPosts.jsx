import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
//import MyForm from './Form';
import Post from './Post';

const ListPosts = ({user}) => {

    // this is my original state with an array of students 
    // const [students, setStudents] = useState([]);
    const [posts, setPosts] = useState([]);

    //this is the state needed for the UpdateRequest
    //const [editingStudent, setEditingStudent] = useState(null)

    const loadPosts = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8080/api/get-sql-schemes")
            .then((response) => response.json())
            .then((posts) => {
                console.log("From the call in the fetch", posts)
                setPosts(posts);
            });
    }

    useEffect(() => {
        loadPosts();
    }, []);

    // const onSaveStudent = (newStudent) => {
    //     //console.log(newStudent, "From the parent - List of Students");
    //     setStudents((students) => [...students, newStudent]);
    // }


    //A function to control the update in the parent (student component)
    // const updateStudent = (savedStudent) => {
    //     // console.log("Line 29 savedStudent", savedStudent);
    //     // This function should update the whole list of students - 
    //     loadStudents();
    // }

    //A function to handle the Delete funtionality
    // const onDelete = (student) => {
    //     //console.log(student, "delete method")
    //     return fetch(`http://localhost:8080/api/students/${student.id}`, {
    //         method: "DELETE"
    //     }).then((response) => {
    //         //console.log(response);
    //         if (response.ok) {
    //             loadStudents();
    //         }
    //     })
    // }

    //A function to handle the Update functionality
    // const onUpdate = (toUpdateStudent) => {
    //     //console.log(toUpdateStudent);
    //     setEditingStudent(toUpdateStudent);

    // }



    return (
        <div className="mybody">
        <div className="list-posts">
            <h2>Welcome to Techtonica's SQL Archive</h2>
            <ul>
                {posts.map((post, index) => {
                    return <li key={index}> <Post post={post} user={user} /></li>
                })}
            </ul>
        </div>
       
        </div>
    );
}


export default ListPosts;