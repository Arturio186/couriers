import React from "react";
import './Dashboard.scss'
import ProfileForm from "#components/Forms/ProfileForm/ProfileForm";

const Dashboard = () => {
    

    return (
        <>
            <h2>Личный кабинет</h2>

            <ProfileForm />

            <h3>Обновить пароль</h3>
            <p>Убедитесь, что ваш аккаунт использует длинный, случайный пароль для обеспечения безопасности.</p>

            <h3>Удалить аккаунт</h3>
            <p>После удаления вашего аккаунта все его ресурсы и данные будут безвозвратно удалены. Перед удалением аккаунта, загрузите любые данные или информацию, которые вы хотите сохранить.</p>
        </>
    )
};

export default Dashboard;
