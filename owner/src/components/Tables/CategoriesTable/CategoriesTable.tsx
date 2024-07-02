import { FC, useCallback, useEffect, useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import './CategoriesTable.scss'

import useFetching from "#hooks/useFetching";

import CategoryService from "#services/CategoryService";

import Loader from "#components/UI/Loader/Loader";

import IBusiness from "#interfaces/IBusiness";
import CategoriesResponse from "#interfaces/response/CategoriesResponse";
import ICategory from "#interfaces/ICategory";
import CoolButton from "#components/UI/CoolButton/CoolButton";

interface CategoriesTableProps {
    business: IBusiness;
    targetCategory: ICategory | null;
    setTargetCategory: React.Dispatch<React.SetStateAction<ICategory | null>>
}

const CategoriesTable: FC<CategoriesTableProps> = ({ business, targetCategory, setTargetCategory }) => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [categories, setCategories] = useState<ICategory[]>([])
    const [maxPage, setMaxPage] = useState<number>(1);

    const { data, loading, error, refetch } = useFetching<CategoriesResponse>(
        useCallback(() => CategoryService.GetCategories(business, limit, page), [business, page, limit])
    );

    useEffect(() => {
        if (data) {
            setCategories(data.categories)
            setMaxPage(data.maxPage);
        }
    }, [data])

    const handleSelectCategory = (category: ICategory) => {
        setTargetCategory(prev => prev?.id === category.id ? null : category)
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, category: ICategory) => {
        event.stopPropagation()
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, category: ICategory) => {
        event.stopPropagation()
    }

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
            {categories.length === 0 ? (
                <p className="message">Категории отсутствуют</p>
            ) : (       
                <section className="categories__table">
                    <table>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr 
                                    key={category.id}
                                    className={category.id === targetCategory?.id ? "selected" : ""}
                                    onClick={() => handleSelectCategory(category)}
                                >
                                    <td 
                                        
                                    >
                                        {category.name}
                                    </td>
                                    <td className="actions">
                                        <button
                                            onClick={(event) => handleEdit(event, category)}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={(event) => handleDelete(event, category)}
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

export default CategoriesTable;
