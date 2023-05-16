import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {IoHeartOutline} from 'react-icons/io5'
import {IoHeart} from 'react-icons/io5'
import Prism from 'prismjs';
import moment from "moment";

//props.post
const Post = ({post, user }) => {

    const [isClicked, setIsClicked] = useState(false);

    const handleFavorite = (post, user) =>{
        setIsClicked(true);
        fetch("/api/favorites", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postid: post.id, user: user.sub})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))

    }

    return (
        <Card className='card' border="secondary">
            <Card.Header>
            <Card.Title>{post.title}</Card.Title>
            </Card.Header>
            <Card.Body>
            <Card.Title className="mb-2 text-muted">Created for: {!user ? ("Anonymous") : (user.name)}</Card.Title>
            <pre>
            <code className="language-SQL">
            <Card.Text>
                {post.content}
            </Card.Text>
            </code>
            </pre>
            <footer className="blockquote-footer">
            Created at: <cite title="Datetime">{moment(post.create_at).utc().format('YYYY-MM-DD')}</cite>
            {!user ? null : <a onClick={()=>{handleFavorite(post, user)}}> {!isClicked ? <IoHeartOutline size={25} style={{marginLeft: "23em"}}/> : <IoHeart size={25} style={{marginLeft: "23em"}}/>  } </a>}
          </footer>
            </Card.Body>
        </Card>
    )

};

export default Post;