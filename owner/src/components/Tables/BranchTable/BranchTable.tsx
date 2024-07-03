import { FC, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import "./BranchTable.scss";

import useFetching from "#hooks/useFetching";

import { addToast } from "#store/toastSlice";

import BranchService from "#services/BranchService";

import Modal from "#components/UI/Modal/Modal";
import Loader from "#components/UI/Loader/Loader";
import EditBranchForm from "#components/Forms/EditBranchForm/EditBranchForm";

import IBranch from "#interfaces/IBranch";
import IBusiness from "#interfaces/IBusiness";


interface BranchTableProps {
    business: IBusiness;
    refetchBranches: (...args: any[]) => Promise<void>
}

const BranchTable: FC<BranchTableProps> = ({ business, refetchBranches }) => {
    const [isDeleting, setIsDeliting] = useState<boolean>(false)
    const [branchEditModal, setBranchEditModal] = useState<boolean>(false)
    const [targetBranch, setTargetBranch] = useState<IBranch | null>(null)

    const dispatch = useDispatch()

    const { data, loading, error, refetch } = useFetching<IBranch[]>(
        useCallback(() => BranchService.GetBranches(business.id), [business])
    );


    const handleEdit = (branch: IBranch) => {
        setTargetBranch(branch)
        setBranchEditModal(true)
    };

    const handleDelete = async (id: string) => {
        try {
            if (isDeleting) return
        
            if (!business) return
            
            if (confirm("Вы уверены, что хотите удалить филиал?")) {
                const response = await BranchService.DeleteBranch(business.id, id);

                if (response.status === 200) {
                    await refetchBranches()
                    dispatch(addToast("Филиал успешно удален"))
                }
            }
        } catch (error) {
            console.error('Ошибка при удалении ', error);
        } finally {
            setIsDeliting(false)
        }
    };

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Modal
                visible={branchEditModal}
                setVisible={setBranchEditModal}
            >
                <EditBranchForm 
                    business={business}
                    branch={targetBranch}
                    refetchBranches={refetchBranches}
                    setModalVisible={setBranchEditModal}
                />
            </Modal>
            {data?.length === 0 ? (
                <p className="message">Филалы отсутствуют</p>
            ) : (
                <section className="branch__table">
                    <table>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Город</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((branch) => (
                                <tr key={branch.id}>
                                    <td>
                                        <Link to={`/branches/${branch.id}`} className="branch__link">
                                            {branch.name}
                                        </Link>
                                    </td>
                                    <td>{branch.city_name} {branch.region !== "" && `(${branch.region})`}</td>
                                    <td className="actions">
                                        <button
                                            onClick={() => handleEdit(branch)}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            disabled={isDeleting}
                                            onClick={() => handleDelete(branch.id)}
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </>
    );
};

export default BranchTable;
