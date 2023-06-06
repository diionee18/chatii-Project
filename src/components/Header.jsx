import { Link } from "react-router-dom"


const Header = () =>{
    return(
        <header>
	<h1> Chappy </h1>
	<div class="user-status">
        <Link to="/signin">
		<button> Logga in </button> 
        </Link>
        <Link to="/signup">
		<button> Skapa konto </button> 
        </Link>
	</div>
</header>
    )
}

export default Header