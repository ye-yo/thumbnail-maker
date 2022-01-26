import { useEffect, useRef, useState } from "react";
import './CheckBox.scss';

function CheckBox(props) {
    const [checked, setChecked] = useState(false);
    function toggleChecked(e) {
        const currentChecked = checked;
        setChecked(checked => !currentChecked);
        props.checkedEvent(e, !currentChecked);
    }
    return (
        <div className={`checkbox-wrap${" " + (props.className || '')}`}>
            <input id={props.id} type="checkbox" defaultChecked={checked} />
            <label htmlFor={props.id} name={props.name} className="check-style" onClick={toggleChecked} >
                {props.children}
            </label>
        </div>
    );
};
export default CheckBox;