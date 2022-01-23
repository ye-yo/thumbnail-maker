import React from 'react';
import Form from './Form.js';
import './_LayoutForm.scss';

import { RiLayoutBottom2Line } from "react-icons/ri";


function LayoutForm() {
    return (
        <Form icon={RiLayoutBottom2Line()} label="Layout" className="section-form-layout">
            <ul className="template-list">
                <li><img></img></li>
                <li>템플릿1</li>
                <li>템플릿1</li>
                <li>템플릿1</li>
                <li>템플릿1</li>
            </ul>
        </Form >
    );
}

export default LayoutForm;