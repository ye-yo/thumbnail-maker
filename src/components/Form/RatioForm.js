import React, { useEffect, useState } from 'react';
import Form from './Form.js';
import './_RatioForm.scss';

import { RiAspectRatioLine } from "react-icons/ri";

function RatioForm(props) {

    function handleRatio(index) {
        props.setRatio(props.ratioList[index]);
    }
    return (
        <Form icon={RiAspectRatioLine()} label="Ratio" className="section-form-ratio">
            <ul className="ratio-list">{
                props.ratioList.map(({ width, height, text, subText, icon }, index) => (
                    <li onClick={() => handleRatio(index)} key={index}>
                        <div style={{ width: width, height: height }}>
                            {icon && <p className="icon">{icon}</p>}
                            <span>{text}{subText && <span>{subText}</span>}</span>
                        </div>
                    </li>
                ))
            }
            </ul>
        </Form >
    );
}

export default RatioForm;