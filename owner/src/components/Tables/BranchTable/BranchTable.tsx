import { FC } from "react";
import "./BranchTable.scss";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import IBranch from "#interfaces/IBranch";
import { Link } from "react-router-dom";

interface BranchTableProps {
    branches?: IBranch[];
}

const BranchTable: FC<BranchTableProps> = ({ branches }) => {
    if (!branches) {
        return null;
    }

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
                                    <td>{branch.city_name}</td>
                                    <td className="actions">
                                        <button><FaEdit /></button>
                                        <button><FaRegTrashAlt /></button>
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
