import './CheckBox.scss';

function CheckBox(props) {
    const { id, className, name, isRadio, parents, children, checkedEvent, checked, onBlur } = props;
    function toggleChecked(e) {
        if (e.target.checked && isRadio) {
            console.log(e.target.checked)
            let checkBoxes = document.querySelectorAll(parents + ` input[type=checkbox]:not(#${e.target.id}`);
            checkBoxes.forEach(box => box.checked = false)
            checkBoxes.checked = false;
        }
        checkedEvent && checkedEvent(e, e.target.checked);
    }
    return (
        <div className={`checkbox-wrap${" " + (className || '')}`}>
            <input id={id} type="checkbox" name={name} checked={checked ? true : false} onChange={toggleChecked} />
            <label htmlFor={id} className="check-style"  >
                {children}
            </label>
        </div>
    );
};
export default CheckBox;