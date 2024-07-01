import { FC, useState } from "react";
import "./BranchTable.scss";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import IBranch from "#interfaces/IBranch";
import IBusiness from "#interfaces/IBusiness";

import BranchService from "#services/BranchService";

import { Link } from "react-router-dom";

interface BranchTableProps {
    business?: IBusiness;
    branches?: IBranch[];
    refetchBranches: (...args: any[]) => Promise<void>
}

const BranchTable: FC<BranchTableProps> = ({ business, branches, refetchBranches }) => {
    const [isDeleting, setIsDeliting] = useState<boolean>(false)

    if (!branches) {
        return null;
    }

    const handleDelete = async (id: string) => {
        try {
            if (isDeleting) return
        
            if (!business) return
            
            if (confirm("Вы уверены, что хотите удалить филиал?")) {
                const response = await BranchService.DeleteBranch(business.id, id);

                if (response.status === 200) {
                    await refetchBranches()
                }
            }
        } catch (error) {
            console.error('Ошибка при удалении ', error);
        } finally {
            setIsDeliting(false)
        }
    };

    return (
        <>
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
                                        <Link to="/" className="branch__link">
                                            {branch.name}
                                        </Link>
                                    </td>
                                    <td>{branch.city_name} {branch.region !== "" && `(${branch.region})`}</td>
                                    <td className="actions">
                                        <button><FaEdit /></button>
                                        <button
                                            disabled={isDeleting}
                                            onClick={() => handleDelete(branch.id)}
                                        ><FaRegTrashAlt /></button>
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
