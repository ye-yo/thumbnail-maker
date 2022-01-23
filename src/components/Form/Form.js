import React from 'react';
import './_Form.scss';


function Form({ icon, label, className, children }) {
    return (
        <section className={className}>
            <button className="btn-accordion">
                {icon}<label>{label}</label>
            </button>
            <div className="form">
                {children}
            </div>
        </section>
    );
}

export default Form;