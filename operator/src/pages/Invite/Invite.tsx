import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { addToast } from "#store/toastSlice";

import BranchService from "#services/BranchService";

import useFetching from "#hooks/useFetching";

import Loader from "#components/UI/Loader/Loader";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import IBranch from "#interfaces/IBranch";

const Invite = () => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>();
    const [isClicked, setIsClicked] = useState<boolean>(false)

    const { data, loading, error } = useFetching<IBranch>(
        useCallback(() => {
            if (id) {
                return BranchService.GetBranchInfo(id);
            } else {
                throw new Error("Branch ID is undefined");
            }
        }, [id])
    );

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    const handleInviteClick = async () => {
        if (isClicked) return

        if (!data) return

        setIsClicked(true)

        try {
            const response = await BranchService.JoinBranch(data?.id)

            if (response.status === 200) {
                dispatch(addToast(`Вы присоеднились к филиалу ${data.name}`));
            }
        }
        catch (error: any) {
            dispatch(addToast(error.response?.data?.message || "Произошла ошибка при присоединении к филиалу"));
            console.log(error)
        }
        finally {
            setIsClicked(false)
        }
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <h2>Предложение присоединиться к филиалу</h2>
            <p>{data?.owner_first_name} {data?.owner_last_name} предлагает Вам присоединиться к {data?.business_name}, филиал: {data?.name}</p>
            <CoolButton 
                onClick={handleInviteClick}
                disabled={isClicked}
            >
                Присоединиться
            </CoolButton>
        </>
    )
};

export default Invite;
