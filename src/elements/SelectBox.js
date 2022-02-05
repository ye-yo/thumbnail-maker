import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import './SelectBox.scss';


function SelectBox(props) {
    const selectRef = useRef(null);
    const [selected, setSelected] = useState("");
    function handleChange(e) {
        setSelected(e.target.value);
        props.setSelectValue(e.target.value);
    };

    useEffect(() => {
        if (props.assetStyle) {
            setSelected(props.assetStyle.fontFamily);
        }
    }, [props.assetStyle])

    return (
        <div className={`select-wrap${" " + (props.className || '')}`}>
            <select onChange={handleChange} ref={selectRef} value={selected || props.options[0]}>
                {props.options.map((option, index) => (
                    <option
                        key={index}
                        value={option[props.valueKey] || option}
                        defaultValue={props.defaultValue === (option[props.valueKey] || index)}
                    >
                        {props.nameKey ? option[props.nameKey] : option}
                    </option>
                ))}
            </select>
            <RiArrowDownSLine onClick={() => selectRef.current.click()}></RiArrowDownSLine>
        </div >
    );
};
export default SelectBox;