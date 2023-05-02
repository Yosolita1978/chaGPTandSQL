import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'


const Post = ({post}) => {

    return (
        <Card>
            <Card.Body>
            <Card.Title>{post.user_prompt}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Placeholder for the Author Name</Card.Subtitle>
            <Card.Text>
                {post.response.text}
            </Card.Text>
            <footer className="blockquote-footer">
            Created at: <cite title="Source Title">Placeholder for DateTime</cite>
          </footer>
            {/* <Button variant="outline-danger" onClick={()=>{onDelete(student)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdate(student)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button> */}
            </Card.Body>
        </Card>
    )

};

export default Post;