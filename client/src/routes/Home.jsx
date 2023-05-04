import ListPost from "../components/ListPosts";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
    const { user } = useAuth0();
    return (
        <div>
         <ListPost user={user}/>
        </div>
    )};

    export default Home;