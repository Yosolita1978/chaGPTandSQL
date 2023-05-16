import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"

const MyForm = ({onSearching}) => {

    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    const handlePromptChange = (e) =>{
        let newPrompt = e.target.value;
        //console.log(newPrompt);
        setSearch(newPrompt);
    }

    //A function to handle the submit that does validation for SQL
    const handleSubmit = (e) => {
        e.preventDefault();
        let sqlSearch = "sql";
        let userPrompt = search.toLowerCase();
        if(userPrompt.includes(sqlSearch)){
            onSearching(userPrompt);
            console.log(userPrompt);
            setMessage("Searching...");
            //to clean the form;
            setSearch("");
        } else{
            setMessage(`I'm sorry you didn't search for something with: ${sqlSearch}. I cannot search for random things...yet`);
            //to clean the form;
            setSearch("");
        }
    }

    return (
        <Form className="form" onSubmit={handleSubmit}>
                <label>Ask a SQL scheme to ChatGPT</label>
                <input
                    type="text"
                    id="add-prompt"
                    placeholder="A SQL scheme for a web app for a theater"
                    required
                    value={search}
                    onChange={handlePromptChange}
                />
            <Button id="button-form" type="submit"  variant="outline-success">Ask ChatGPT</Button>
            <div>
                {!message ? null : <p>{message}</p>}
            </div>
        </Form>
    );
};


export default MyForm