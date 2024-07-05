import React from "react";
import './Dashboard.scss'
import ProfileForm from "#components/Forms/ProfileForm/ProfileForm";
import UpdatePasswordForm from "#components/Forms/UpdatePasswordForm/UpdatePasswordForm";

const Dashboard = () => {
    

    return (
        <>
            <h2>Личный кабинет</h2>

            <ProfileForm />

            <UpdatePasswordForm />

            <h3>Удалить аккаунт</h3>
            <p>После удаления вашего аккаунта все его ресурсы и данные будут безвозвратно удалены. Перед удалением аккаунта, загрузите любые данные или информацию, которые вы хотите сохранить.</p>
        </>
    )
};

export default Dashboard;
