import React, { useEffect } from 'react';
import Form from './Form.js';
import './_LayoutForm.scss';
import { RiLayoutBottom2Line } from "react-icons/ri";
import layoutList from '../../data/layoutList';
let count = 0;

function LayoutForm(props) {
    const { canvasAssets, setCanvasAssets } = props;

    useEffect(() => {
        handleTemplateChange(0);
    }, [])

    function handleTemplateChange(index) {
        const layout = (layoutList[index].layout).map(layout => { layout.id = 'layout' + count++; return layout; });
        setCanvasAssets(layout);
    }
    return (
        <Form icon={RiLayoutBottom2Line()} label="Layout" className="section-form-layout">
            <ul className="template-list">
                {layoutList.map((layout, index) =>
                    <li key={index} onClick={() => handleTemplateChange(index)}>
                        <img src={require(`../../assets/images/${layout.name}.png`)} alt={layout.name}></img>
                    </li>
                )}
            </ul>
        </Form >
    );
}

export default LayoutForm;