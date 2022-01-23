import { useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import './SelectBox.scss';


function SelectBox(props) {
    const selectRef = useRef(null);
    function handleChange(e) {
    };

    return (
        <div className={`select-wrap${" " + (props.className || '')}`}>
            <select onChange={handleChange} ref={selectRef}>
                {props.options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        defaultValue={props.defaultValue === option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
            <RiArrowDownSLine onClick={() => selectRef.current.click()}></RiArrowDownSLine>
        </div >
    );
};
export default SelectBox;