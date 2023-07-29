import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";

const Auth = (props) => {      
    return (
        <Card>
            <h1>{props.children}</h1>
            <Button onClick={props.onClick}>
                {!props.isLoggedIn ? 'Login' : 'Logout'}
            </Button>
            <br /><br />
        </Card>
    )
}

export default Auth;