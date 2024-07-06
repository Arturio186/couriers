import './Dashboard.scss'
import ProfileForm from "#components/Forms/ProfileForm/ProfileForm";
import UpdatePasswordForm from "#components/Forms/UpdatePasswordForm/UpdatePasswordForm";
import DeleteAccountForm from "#components/Forms/DeleteAccountForm/DeleteAccountForm";

const Dashboard = () => {
    

    return (
        <>
            <h2>Личный кабинет</h2>

            <ProfileForm />
            <UpdatePasswordForm />
            <DeleteAccountForm />
        </>
    )
};

export default Dashboard;
