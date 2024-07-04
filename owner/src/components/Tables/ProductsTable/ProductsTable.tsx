import { FC, useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import './ProductsTable.scss'

import { addToast } from "#store/toastSlice";

import useFetching from "#hooks/useFetching";

import ProductService from "#services/ProductService";

import Loader from "#components/UI/Loader/Loader";
import Modal from "#components/UI/Modal/Modal";

import ICategory from "#interfaces/ICategory";
import IProduct from "#interfaces/IProduct";
import EditProductForm from "#components/Forms/EditProductForm/EditProductForm";

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
    const [productEditModal, setProductEditModal] = useState<boolean>(false);
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        if (data) {
            setProducts(data)
            console.log(data)
        }
    }, [data])

    const handleDelete = async (product: IProduct) => {
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

    const handleEdit = (product: IProduct) => {
        setEditingProduct(product);
        setProductEditModal(true);
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            {editingProduct && <Modal
                visible={productEditModal}
                setVisible={setProductEditModal}
            >
                <EditProductForm 
                    product={editingProduct}
                    setProducts={setProducts}
                    setModalVisible={setProductEditModal}
                />
            </Modal>}

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

                                    <td>{product.price} ₽</td>

                                    <td className="actions">
                                        <button
                                            onClick={() => handleEdit(product)}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(product)}
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
