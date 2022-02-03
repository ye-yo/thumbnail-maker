import React from 'react';
import Form from './Form.js';
import './_LayoutForm.scss';
import { RiLayoutBottom2Line } from "react-icons/ri";

let count = 0;
const layoutList = [
    {
        name: 'Layout1',
        layout: [
            {
                type: 'text',
                name: 'Title',
                style: { fontSize: '48px', fontWeight: 'bold', y: '50%', x: '50%', textShadow: '2px 2px 2px rgba(0,0,0,.5)' }
            },
        ],
    },
    {
        name: 'Layout2',
        layout: [
            {
                type: 'text',
                name: 'Title',
                style: { fontSize: '48px', fontWeight: 'bold', y: '42%', x: '50%', textShadow: '2px 2px 2px rgba(0,0,0,.5)' }
            },
            {
                type: 'text',
                name: 'Sub Title',
                style: { fontSize: '34px', y: '62%', x: '50%', textShadow: '2px 2px 2px rgba(0,0,0,.5)' }
            },
        ],
    },
    {
        name: 'Layout3',
        layout: [
            {
                type: 'text',
                name: 'Title',
                style: { fontSize: '48px', fontWeight: 'bold', y: '46%', x: '50%', textShadow: '2px 2px 2px rgba(0,0,0,.5)' }
            },
            {
                type: 'text',
                name: 'small text',
                style: { fontSize: '20px', y: '62%', x: '50%', textShadow: '2px 2px 2px rgba(0,0,0,.5)' }
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
                                        transform: `translate(-50%, calc(-50%${getDownScaleHalfFontSize(element.style.y)})`
                                    }
                                    return <p key={elementIndex} style={{ ...element.style, left: element.style.x, top: element.style.y, ...downScaleStyle }}>{element.name}</p>
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