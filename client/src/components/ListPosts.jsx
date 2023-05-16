import React, { useState, useEffect } from 'react'
import MyForm from './Form';
import Post from './Post';
import Announcement from './Announcement';
import { useAuth0 } from "@auth0/auth0-react";

const ListPosts = () => {

    const { user, getAccessTokenSilently } = useAuth0();


    // this is my original state with an array of students 
    // const [students, setStudents] = useState([]);
    const [posts, setPosts] = useState([]);

    //this is the state needed for the UpdateRequest
    //const [editingStudent, setEditingStudent] = useState(null)

    const loadPosts = () => {
        // A function to fetch the list of students that will be load anytime that list change
        // const accessToken = await getAccessTokenSilently();
        // console.log(accessToken);
        // {headers: {Authorization: `Bearer ${accessToken}`}}
        fetch("/api/get-sql-schemes")
            .then((response) => response.json())
            .then((posts) => {
                //console.log("From the call in the fetch", posts)
                setPosts(posts);
            });
    }

    const onSearching = async (newSearch) => {
        const accessToken = await getAccessTokenSilently();
        // {headers: {Authorization: `Bearer ${accessToken}`}}
        fetch("/api/post-sql-schemes",
            {
                headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ search: newSearch })
            })
            .then((response) => response.json())
            .then((data) => {
                //console.log("From the call in the post", data)
                setPosts((posts) => [...posts, data]);
            });

    }

    useEffect(() => {
        loadPosts();
    }, []);


    return (
        <div className="mybody">
            <section>
                {!user ? <Announcement /> : <MyForm user={user} onSearching={onSearching} />}

            </section>
            <div className="list-posts">
                <h2>Techtonica's SQL Archive</h2>
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