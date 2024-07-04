import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import './CategoriesTable.scss'

import { addToast } from "#store/toastSlice";

import useFetching from "#hooks/useFetching";

import CategoryService from "#services/CategoryService";

import Loader from "#components/UI/Loader/Loader";

import IBusiness from "#interfaces/IBusiness";
import ICategory from "#interfaces/ICategory";
import Modal from "#components/UI/Modal/Modal";
import EditCategoryForm from "#components/Forms/EditCategoryForm/EditCategoryForm";


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
    const dispatch = useDispatch()

    const { data, loading, error } = useFetching<ICategory[]>(
        useCallback(() => CategoryService.GetCategories(business), [business])
    );

    const [isDeleting, setIsDeliting] = useState<boolean>(false);
    const [categoryEditModal, setCategoryEditModal] = useState<boolean>(false);
    const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)

    useEffect(() => {
        if (data) {
            setCategories(data)
        }
    }, [data])

    const handleSelectCategory = (category: ICategory) => {
        setTargetCategory(prev => prev?.id === category.id ? null : category)
    }

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, category: ICategory) => {
        event.stopPropagation()

        try {
            if (isDeleting) return
            
            if (confirm("Вы уверены, что хотите удалить категорию?")) {
                const response = await CategoryService.DeleteCategory(category.id);

                if (response.status === 200) {
                    setCategories(prev => prev.filter(c => c.id !== category.id))
                    dispatch(addToast("Категория успешно удалена"))
                }
            }
        } catch (error) {
            console.error('Ошибка при удалении ', error);
            dispatch(addToast("Ошибка при удалении категории"))
        } finally {
            setIsDeliting(false)
        }
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, category: ICategory) => {
        event.stopPropagation()
        setEditingCategory(category)
        setCategoryEditModal(true)
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>

            {editingCategory && <Modal
                visible={categoryEditModal}
                setVisible={setCategoryEditModal}
            >
                <EditCategoryForm 
                    category={editingCategory}
                    setCategories={setCategories}
                    setModalVisible={setCategoryEditModal}
                />
            </Modal>}
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
