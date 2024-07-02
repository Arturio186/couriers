import { StylesConfig, GroupBase } from "react-select";
import Option from "#interfaces/Option";

const darkSelectConfig: StylesConfig<Option, false, GroupBase<Option>> = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#2b2b2b", // Background color
        borderColor: "#555555", // Border color
        minHeight: "40px", // Control height
        boxShadow: "none", // Remove default box shadow
        "&:hover": {
            borderColor: "#555555", // Hover border color
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#444" : "#2b2b2b", // Selected and default background color
        "&:hover": {
            backgroundColor: "#555", // Hover background color
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#ffffff", // Text color
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#999999", // Placeholder color
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#2b2b2b",
    }),
    input: (provided) => ({
        ...provided,
        color: "#fff",
        minWidth: "20rem"
    }),
};

export default darkSelectConfig;
