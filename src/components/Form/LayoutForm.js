import React from 'react';
import Form from './Form.js';
import './_LayoutForm.scss';
import Asset from '../Asset/Asset.js';
import { RiLayoutBottom2Line } from "react-icons/ri";
import { BiLeftArrow } from 'react-icons/bi';

const defaultAssetSize = {
    width: 100, height: 22
};

const defaultHalfSize = { width: defaultAssetSize.width / 2, height: defaultAssetSize.height / 2 }

let count = 0;
const layoutList = [
    {
        name: 'Layout1',
        layout: [
            {
                type: 'text',
                name: 'Title',
                style: { fontSize: '24px', fontWeight: 'bold', top: `calc(50% - ${defaultHalfSize.height}px)`, left: `calc(50% - ${defaultHalfSize.width}px)` }
            },
        ],
    },
    {
        name: 'Layout2',
        layout: [
            {
                type: 'text',
                name: 'Title',
                style: { fontSize: '24px', fontWeight: 'bold', top: `calc(38% - ${defaultHalfSize.height}px)`, left: `calc(50% - ${defaultHalfSize.width}px)` }
            },
            {
                type: 'text',
                name: 'Sub Title',
                style: { fontSize: '16px', fontWeight: '500', top: `calc(68% - ${defaultHalfSize.height}px)`, left: `calc(50% - ${defaultHalfSize.width}px)` }
            },
        ],
    },
    {
        name: 'Layout3',
        layout: [
            {
                type: 'text',
                name: 'Title',
                style: { fontSize: '24px', fontWeight: 'bold', top: `calc(42% - ${defaultHalfSize.height}px)`, left: `calc(50% - ${defaultHalfSize.width}px)` }
            },
            {
                type: 'text',
                name: 'small text',
                style: { fontSize: '14px', fontWeight: '300', top: `calc(60% - ${defaultHalfSize.height}px)`, left: `calc(50% - ${defaultHalfSize.width}px)` }
            },
        ],
    },
]

function LayoutForm(props) {
    const { canvasAssets, setCanvasAssets } = props;

    function handleTemplateChange(index) {
        const layout = (layoutList[index].layout).map(layout => { layout.id = 'layout' + count++; return layout; });
        // console.log(layout[0].id)
        setCanvasAssets(layout);
    }
    return (
        <Form icon={RiLayoutBottom2Line()} label="Layout" className="section-form-layout">
            <ul className="template-list">
                {layoutList.map((layout, index) =>
                    <li key={index} onClick={() => handleTemplateChange(index)}>
                        <div className="asset-group">
                            {
                                layout.layout.map((element, elementIndex) =>
                                    <p style={{ ...element.style, top: `calc(${element.style.top} + ${defaultHalfSize.height}px)`, left: `calc(${element.style.left} + ${defaultHalfSize.width}px)`, transform: 'translate(-50%, -50%) scale(0.5)' }}>{element.name}</p>
                                )
                            }
                        </div>
                    </li>
                )}
            </ul>
        </Form >
    );
}

export default LayoutForm;