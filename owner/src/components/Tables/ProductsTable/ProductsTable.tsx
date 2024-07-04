import { FC, useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import './ProductsTable.scss'

import { addToast } from "#store/toastSlice";

import useFetching from "#hooks/useFetching";

import ProductService from "#services/ProductService";

import Loader from "#components/UI/Loader/Loader";

import ICategory from "#interfaces/ICategory";
import IProduct from "#interfaces/IProduct";

interface ProductsTableProps {
    targetCategory: ICategory;
    products: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const ProductsTable: FC<ProductsTableProps> = ({ targetCategory, products, setProducts }) => {
    const dispatch = useDispatch();

    const { data, loading, error } = useFetching<IProduct[]>(
        useCallback(() => ProductService.GetProducts(targetCategory), [targetCategory])
    );

    const [isDeleting, setIsDeliting] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            setProducts(data)
            console.log(data)
        }
    }, [data])

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IProduct) => {
        event.stopPropagation()

        try {
            if (isDeleting) return
            
            if (confirm(`Вы уверены, что хотите удалить товар ${product.name}?`)) {
                const response = await ProductService.DeleteProduct(product.id);

                if (response.status === 200) {
                    setProducts(prev => prev.filter(p => p.id !== product.id))
                    dispatch(addToast("Товар успешно удален"))
                }
            }
        } catch (error) {
            console.error('Ошибка при удалении ', error);
            dispatch(addToast("Ошибка при удалении товара"))
        } finally {
            setIsDeliting(false)
        }
        
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IProduct) => {
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
            {products.length === 0 ? (
                <p className="message">Товары отсутствуют</p>
            ) : (       
                <section className="products__table">
                    <table>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Стоимость</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>

                                    <td>{Math.floor(product.price)} ₽</td>

                                    <td className="actions">
                                        <button
                                            onClick={(event) => handleEdit(event, product)}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={(event) => handleDelete(event, product)}
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

export default ProductsTable;
