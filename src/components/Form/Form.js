import React, { useState } from 'react';
import './_Form.scss';


function Form({ icon, label, className, children }) {
    const [hide, setHide] = useState(false);
    return (
        <section className={className}>
            <button className={`btn-accordion ${hide ? ' hide' : ''}`} onClick={() => setHide(hide => !hide)}>
                {icon}<label>{label}</label>
            </button>
            <div className="form">
                {children}
            </div>
        </section>
    );
}

export default Form;