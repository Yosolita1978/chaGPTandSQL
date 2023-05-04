import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'
import Prism from 'prismjs';

//props.post
const Post = ({post, user }) => {

    return (
        <Card border="secondary">
            <Card.Header>
            <Card.Title>{post.user_prompt}</Card.Title>
            </Card.Header>
            <Card.Body>
            <Card.Title className="mb-2 text-muted">Created for: {!user ? ("Anonymous") : (user.name)}</Card.Title>
            <pre>
            <code className="language-SQL">
            <Card.Text>
                {post.response.text}
            </Card.Text>
            </code>
            </pre>
            <footer className="blockquote-footer">
            Created at: <cite title="Datetime">Placeholder for DateTime</cite>
          </footer>
            {/* <Button variant="outline-danger" onClick={()=>{onDelete(student)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdate(student)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button> */}
            </Card.Body>
        </Card>
    )

};

export default Post;