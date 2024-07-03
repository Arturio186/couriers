import { FC, useCallback, useEffect, useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import './CategoriesTable.scss'

import useFetching from "#hooks/useFetching";

import CategoryService from "#services/CategoryService";

import Loader from "#components/UI/Loader/Loader";

import IBusiness from "#interfaces/IBusiness";
import ICategory from "#interfaces/ICategory";

interface CategoriesTableProps {
    business: IBusiness;
    targetCategory: ICategory | null;
    setTargetCategory: React.Dispatch<React.SetStateAction<ICategory | null>>
    categories: ICategory[];
    setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
}

const CategoriesTable: FC<CategoriesTableProps> = ({ 
    business, 
    targetCategory, 
    setTargetCategory,
    categories,
    setCategories
}) => {
    const { data, loading, error, refetch } = useFetching<ICategory[]>(
        useCallback(() => CategoryService.GetCategories(business), [business])
    );

    useEffect(() => {
        if (data) {
            setCategories(data)
        }
    }, [data])

    useEffect(() => {
        setTargetCategory(null)
    }, [business])

    const handleSelectCategory = (category: ICategory) => {
        setTargetCategory(prev => prev?.id === category.id ? null : category)
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, category: ICategory) => {
        event.stopPropagation()
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, category: ICategory) => {
        event.stopPropagation()
    }

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
                </section>
            )}
        </>
    );
};

export default CategoriesTable;
