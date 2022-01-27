import { useEffect, useRef, useState } from "react";
import './CheckBox.scss';

function CheckBox(props) {
    const { id, className, name, isRadio, parents, children, checkedEvent } = props;
    function toggleChecked(e) {
        if (e.target.checked && isRadio) {
            let checkBoxes = document.querySelectorAll(parents + ` input[type=checkbox]:not(#${e.target.id}`);
            checkBoxes.forEach(box => box.checked = false)
            checkBoxes.checked = false;
        }
        checkedEvent && checkedEvent(e, e.target.checked);
    }
    return (
        <div className={`checkbox-wrap${" " + (className || '')}`}>
            <input id={id} type="checkbox" onChange={toggleChecked} />
            <label htmlFor={id} name={name} className="check-style"  >
                {children}
            </label>
        </div>
    );
};
export default CheckBox;