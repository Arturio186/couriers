import { FC, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import "./BranchTable.scss";

import { addToast } from "#store/toastSlice";

import BranchService from "#services/BranchService";

import useFetching from "#hooks/useFetching";

import Modal from "#components/UI/Modal/Modal";
import Loader from "#components/UI/Loader/Loader";
import EditBranchForm from "#components/Forms/EditBranchForm/EditBranchForm";

import IBranch from "#interfaces/IBranch";
import IBusiness from "#interfaces/IBusiness";

interface BranchTableProps {
    business: IBusiness;
    branches: IBranch[];
    setBranches: React.Dispatch<React.SetStateAction<IBranch[]>>;
}

const BranchTable: FC<BranchTableProps> = ({ 
    business,
    branches,
    setBranches 
}) => {
    const [isDeleting, setIsDeliting] = useState<boolean>(false)
    const [branchEditModal, setBranchEditModal] = useState<boolean>(false)
    const [targetBranch, setTargetBranch] = useState<IBranch | null>(null)

    const dispatch = useDispatch()

    const { data, loading, error } = useFetching<IBranch[]>(
        useCallback(() => BranchService.GetBranches(business.id), [business])
    );

    useEffect(() => {
        if (data) {
            setBranches(data)
        }
    }, [data])


    const handleEdit = (branch: IBranch) => {
        setTargetBranch(branch)
        setBranchEditModal(true)
    };

    const handleDelete = async (branch: IBranch) => {
        try {
            if (isDeleting) return
            
            if (confirm("Вы уверены, что хотите удалить филиал?")) {
                const response = await BranchService.DeleteBranch(branch.id);

                if (response.status === 200) {
                    setBranches(prev => prev.filter(b => b.id !== branch.id))
                    dispatch(addToast("Филиал успешно удален"))
                }
            }
        } catch (error) {
            console.error('Ошибка при удалении ', error);
            dispatch(addToast("Ошибка при удалении филиала"))
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
                {targetBranch && <EditBranchForm 
                    branch={targetBranch}
                    setBranches={setBranches}
                    setModalVisible={setBranchEditModal}
                />}
            </Modal>
            {branches.length === 0 ? (
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
                            {branches.map((branch) => (
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
                                            onClick={() => handleDelete(branch)}
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
