import React from 'react';
import Form from './Form.js';
import './_LayoutForm.scss';
import { RiLayoutBottom2Line } from "react-icons/ri";

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
                style: { fontSize: '54px', fontWeight: 'bold', top: '50%', left: '50%' }
            },
        ],
    },
    {
        name: 'Layout2',
        layout: [
            {
                type: 'text',
                name: 'Title',
                style: { fontSize: '54px', fontWeight: 'bold', top: '40%', left: '50%' }
            },
            {
                type: 'text',
                name: 'Sub Title',
                style: { fontSize: '38px', fontWeight: '500', top: 'calc(40% + 74px)', left: '50%' }
            },
        ],
    },
    {
        name: 'Layout3',
        layout: [
            {
                type: 'text',
                name: 'Title',
                style: { fontSize: '54px', fontWeight: 'bold', top: '46%', left: '50%' }
            },
            {
                type: 'text',
                name: 'small text',
                style: { fontSize: '24px', fontWeight: '300', top: 'calc(46% + 54px)', left: '50%' }
            },
        ],
    },
]
function getDownScaleHalfFontSize(top) {
    if (top.includes("+")) {
        let fontSize = Number(top.substring(top.indexOf("+ ") + 1, top.indexOf("px)")));
        return ` - ${fontSize}px + ${fontSize * 0.36}px`;
    } else return '';
}

function LayoutForm(props) {
    const { canvasAssets, setCanvasAssets } = props;

    function handleTemplateChange(index) {
        const layout = (layoutList[index].layout).map(layout => { layout.id = 'layout' + count++; return layout; });
        setCanvasAssets(layout);
    }
    return (
        <Form icon={RiLayoutBottom2Line()} label="Layout" className="section-form-layout">
            <ul className="template-list">
                {layoutList.map((layout, index) =>
                    <li key={index} onClick={() => handleTemplateChange(index)}>
                        <div className="asset-group">
                            {
                                layout.layout.map((element, elementIndex) => {
                                    let downScaleStyle = {
                                        fontSize: Number(element.style.fontSize.replace("px", '')) * 0.36 + 'px',
                                        transform: `translate(-50%, calc(-50%${getDownScaleHalfFontSize(element.style.top)})`
                                    }
                                    return <p key={elementIndex} style={{ ...element.style, ...downScaleStyle }}>{element.name}</p>
                                }
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