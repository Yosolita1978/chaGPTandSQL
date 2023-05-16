import React, { useState, useEffect } from 'react';
import Post from './Post';

const ListFavorites = ({user}) => {

    const [favorites, setFavorites] = useState([]);

    const loadFavorites = (user) => {
        fetch(`/api/favorites/${user.sub}`)
            .then((response) => response.json())
            .then((favorites) => {
                //console.log("From the call in the fetch", favorites)
                setFavorites(favorites);
            });
    };

    useEffect(() => {
        loadFavorites(user);
    }, []);


    return (
        <div className="list-posts">
            <h2>{user.name}'s Favorites schemata</h2>
            <ul>
                {favorites.map((post, index) => {
                    return <li key={index}> <Post post={post} user={user} /></li>
                })}
            </ul>
        </div>
    )
};

export default ListFavorites;