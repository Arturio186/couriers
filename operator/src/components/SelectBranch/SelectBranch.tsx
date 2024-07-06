import React, { FC, useEffect, useState } from "react";
import Select, { SingleValue } from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import './SelectBranch.scss'

import { setCurrentBranch } from "#store/userSlice";
import { RootState } from "#store/store";

import darkSelectConfig from "#utils/darkSelectConfig";

import useFetching from "#hooks/useFetching";
import BranchService from "#services/BranchService";

import Loader from "#components/UI/Loader/Loader";

import IBranchStaff from "#interfaces/IBranchStaff";
import Option from "#interfaces/Option";

interface SelectBranchProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectBranch: FC<SelectBranchProps> = ({ setModalVisible }) => {
    const {
        data,
        loading,
        error,
    } = useFetching<IBranchStaff[]>(BranchService.GetBranches);

    const dispatch = useDispatch()

    const [branchOptions, setBranchOptions] = useState<Option[]>([])
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (data) {
            const newOptions = data.map((branchStaff) => {
                return {
                    value: branchStaff.branch_id.toString(),
                    label: `${branchStaff.branch_name} (${branchStaff.business_name})`
                }
            })

            setBranchOptions(newOptions)
        }
    }, [data])

    useEffect(() => {
        if (user.currentBranch !== null) {
            const currentBranchOption = branchOptions.find(
                option => option.value === user.currentBranch?.id
            );

            setSelectedOption(currentBranchOption || null);
        }
    }, [user.currentBranch, branchOptions]);

    const handleChangeBranch = (option: SingleValue<Option>) => {
        const branchStaff = data?.find(b => b.branch_id === option?.value)

        if (branchStaff) {
            dispatch(setCurrentBranch({
                id: branchStaff.branch_id,
                name: branchStaff.branch_name,
                business_id: branchStaff.business_id,
                coords: branchStaff.city_coords
            }))

            setModalVisible(false)
        }
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="select-branch__container">
            <p>Выберите филиал</p>

            <Select
                value={selectedOption}
                options={branchOptions}
                onChange={(selectedOption) => handleChangeBranch(selectedOption)}
                placeholder="Выберите филиал..."
                styles={darkSelectConfig}
            />
        </div>
    )
};

export default SelectBranch;
