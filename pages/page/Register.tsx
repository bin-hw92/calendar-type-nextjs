import RegisterForm from "../../containers/auth/RegisterForm";
import AuthTemplate from "../../components/auth/AuthTemplate";

const Register = () => {
    return (
        <>
        <AuthTemplate>
            <RegisterForm />
        </AuthTemplate>
        </>
    )
};

export default Register;