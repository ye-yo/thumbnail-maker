import React, { useEffect, useState } from 'react';
import Form from './Form.js';
import './_RatioForm.scss';
import CheckBox from '../../elements/CheckBox.js';
import { RiAspectRatioLine } from "react-icons/ri";

function RatioForm(props) {
    function handleRatio(e, checked) {
        props.setRatio(checked ? props.ratioList[Number(e.target.id.substr(-1))] : null);
    }
    return (
        <Form icon={RiAspectRatioLine()} label="Ratio" className="section-form-ratio">
            <div className="ratio-list">{
                props.ratioList.map(({ id, width, height, text, subText, icon }, index) => (
                    <CheckBox id={id} isRadio={true} checkedEvent={handleRatio} parents=".ratio-list" key={index}>
                        {icon && <p className="icon">{icon}</p>}
                        <span>{text}{subText && <span>{subText}</span>}</span>
                    </CheckBox>
                ))
            }
            </div>
        </Form >
    );
}

export default RatioForm;