import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'
import Prism from 'prismjs';
import moment from "moment";

//props.post
const Post = ({post, user }) => {

    return (
        <Card border="secondary">
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
          </footer>
            </Card.Body>
        </Card>
    )

};

export default Post;