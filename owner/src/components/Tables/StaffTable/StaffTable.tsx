import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import './StaffTable.scss'

import Loader from "#components/UI/Loader/Loader";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import useFetching from "#hooks/useFetching";
import BranchService from "#services/BranchService";

import { addToast } from "#store/toastSlice";

import IStaff from "#interfaces/IStaff";
import StaffResponse from "#interfaces/response/StaffResponse";

interface StaffTableProps {
    branchID: string;
}

const limit = 10;

const translation: Record<string, string> = {
    "operator": "Оператор",
    "courier": "Курьер"
};

const StaffTable: FC<StaffTableProps> = ({ branchID }) => {
    const dispatch = useDispatch()
    const [staff, setStaff] = useState<IStaff[]>([]);
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const { data, loading, error } = useFetching<StaffResponse>(
        useCallback(() => BranchService.GetBranchStaff(branchID, page, limit), [branchID, page])
    );

    useEffect(() => {
        if (data) {
            setStaff(data.staff);
            setMaxPage(data.maxPage);
        }
    }, [data]);

    const handleDelete = async (member: IStaff) => {
        try {
            if (isDeleting) return
            
            if (confirm(`Вы уверены, что хотите удалить сотрудника ${member.user_first_name}?`)) {
                console.log(branchID, member.user_id)
                const response = await BranchService.RemoveFromStaff(member.user_id, branchID);

                if (response.status === 200) {
                    setStaff(prev => prev.filter(m => m.user_id !== member.user_id))
                    dispatch(addToast("Сотрудник успешно удален"))
                }
            }
        } catch (error) {
            console.log(error)
            console.error('Ошибка при удалении ', error);
            dispatch(addToast("Ошибка при удалении сотрудника"))
        } finally {
            setIsDeleting(false)
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= maxPage) {
            setPage(newPage);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {staff.length === 0 ? (
                <p className="message">Сотрудники отсутствуют</p>
            ) : (
                <section className="staff__table">
                    <table>
                        <thead>
                            <tr>
                                <th>Сотрудник</th>
                                <th>E-Mail</th>
                                <th>Должность</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map((member) => (
                                <tr key={member.user_id}>
                                    <td>
                                        {member.user_first_name}{" "}
                                        {member.user_last_name}
                                    </td>

                                    <td>{member.user_email}</td>

                                    <td>{translation[member.user_role]}</td>

                                    <td className="actions">
                                        <button
                                            onClick={() => handleDelete(member)}
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <CoolButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Назад</CoolButton>
                        <span>Страница {page} из {maxPage}</span>
                        <CoolButton onClick={() => handlePageChange(page + 1)} disabled={page === maxPage}>Вперед</CoolButton>
                    </div>
                </section>
            )}
        </>
    );
};

export default StaffTable;
