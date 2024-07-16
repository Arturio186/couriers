import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimePicker.scss";

interface DateTimePickerProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
}

const DateTimePicker: FC<DateTimePickerProps> = ({
    selectedDate,
    onChange,
}) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            dateFormat="dd.MM.yyyy HH:mm"
            className="dark-theme-datepicker"
        />
    );
};

export default DateTimePicker;
