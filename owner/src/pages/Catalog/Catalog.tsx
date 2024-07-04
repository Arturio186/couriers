import { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import './Catalog.scss'

import useFetching from "#hooks/useFetching";

import BusinessService from "#services/BusinessService";

import Modal from "#components/UI/Modal/Modal";
import Loader from "#components/UI/Loader/Loader";
import CoolButton from "#components/UI/CoolButton/CoolButton";
import CategoriesTable from "#components/Tables/CategoriesTable/CategoriesTable";

import IBusiness from "#interfaces/IBusiness";
import Option from "#interfaces/Option";
import ICategory from "#interfaces/ICategory";
import IProduct from "#interfaces/IProduct";

import darkSelectConfig from "#utils/darkSelectConfig";
import CreateCategoryForm from "#components/Forms/CreateCategoryForm/CreateCategoryForm";
import ProductsTable from "#components/Tables/ProductsTable/ProductsTable";
import CreateProductForm from "#components/Forms/CreateProductForm/CreateProductForm";

const Catalog = () => {
    const {
        data: businesses,
        loading,
        error
    } = useFetching<IBusiness[]>(BusinessService.GetMyBusinesses);

    const [businessOptions, setBusinessOptions] = useState<Option[]>([])

    const [targetBusiness, setTargetBusiness] = useState<IBusiness | null>(null)
    const [targetCategory, setTargetCategory] = useState<ICategory | null>(null)
    const [categories, setCategories] = useState<ICategory[]>([])
    const [products, setProducts] = useState<IProduct[]>([])

    const [categoryCreateModal, setCategoryCreateModal] = useState<boolean>(false);
    const [productCreateModal, setProductCreateModal] = useState<boolean>(false);

    useEffect(() => {
        if (businesses) {
            const options = businesses.map(business => ({
                value: business.id,
                label: business.name
            }));
            setBusinessOptions(options);
        }
    }, [businesses]);

    useEffect(() => {
        setTargetCategory(null)
    }, [targetBusiness, categories])

    const handleBusinessChange = (option: SingleValue<Option>) => {
        if (option) {
            const business = businesses?.find(b => b.id === option.value)
            setTargetBusiness(business ? business : null);
        } else {
            setTargetBusiness(null);
            setTargetCategory(null);
        }
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {targetBusiness && <Modal
                visible={categoryCreateModal}
                setVisible={setCategoryCreateModal}
            >
                <CreateCategoryForm
                    business={targetBusiness}
                    setModalVisible={setCategoryCreateModal}
                    setCategories={setCategories}
                />
            </Modal>}

            <h2>Каталог</h2>

            <Select
                options={businessOptions}
                onChange={handleBusinessChange}
                placeholder="Выберите сеть..."
                styles={darkSelectConfig}
            />

            {targetBusiness && <>
                <h3>Категории</h3>

                <CoolButton onClick={() => setCategoryCreateModal(true)}>Добавить категорию</CoolButton>

                <CategoriesTable 
                    business={targetBusiness}
                    targetCategory={targetCategory}
                    setTargetCategory={setTargetCategory}
                    categories={categories}
                    setCategories={setCategories}
                />
            </>}

            {targetCategory && <>
                <Modal
                    visible={productCreateModal}
                    setVisible={setProductCreateModal}
                >
                    <CreateProductForm
                        category={targetCategory}
                        setModalVisible={setProductCreateModal}
                        setProducts={setProducts}
                    />
                </Modal>


                <h3>Товары категории {targetCategory.name}</h3>
                
                <CoolButton onClick={() => setProductCreateModal(true)}>Добавить товар</CoolButton>

                <ProductsTable
                    targetCategory={targetCategory}
                    products={products}
                    setProducts={setProducts}
                />

            </>}
        </>
    )   
    
};

export default Catalog;
