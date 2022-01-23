import React, { useEffect, useRef, useState } from 'react';
import Form from './Form.js';
import './_BackgroundForm.scss';
import { RiPaintFill, RiRecordCircleLine } from "react-icons/ri";
import { MdBlurLinear, } from "react-icons/md";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp, HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";

function LayoutForm() {
    const defaultColorList = ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'];
    const [currentTab, setCurrentTab] = useState(0);
    const [colorList, setColorList] = useState([]);
    const [currentColorItem, setCurrentColorItem] = useState(0);
    const [gradientDirection, setGradientDirection] = useState(0);
    const [gradientStyle, setGradientStyle] = useState({ first: 'green', second: 'yellow', type: 'linear', direction: 'right' });
    const defaultGradientDirection = [<HiOutlineArrowSmUp />, <HiOutlineArrowSmRight />, <HiOutlineArrowSmDown />, <HiOutlineArrowSmLeft />];
    const [gradientIndex, setGradientIndex] = useState(0);

    useEffect(() => {
        setColorList(defaultColorList);
        setGradientDirection(defaultGradientDirection)
    }, [])
    function handleSetColor(index) {

    }

    function handleGradientIndex() {
        setGradientIndex(gradientIndex => gradientIndex === defaultGradientDirection.length - 1 ? 0 : gradientIndex + 1)
    }

    return (
        <Form icon={RiPaintFill({ color: "white" })} label="Background" className="section-form-background">
            <div className="tab-button-wrap">
                <label className={!currentTab && 'clicked'} onClick={() => setCurrentTab(0)}>Color</label>
                <label className={currentTab && 'clicked'} onClick={() => setCurrentTab(1)}>Image</label>
            </div>
            <div className="tab-content">
                {!currentTab ?
                    <div className="tab-color">
                        <div className="color-picker-box"></div>
                        <div className="tab-color-right">
                            <ul className="color-list">
                                {colorList.map((color, index) => (
                                    <li key={index} style={{ backgroundColor: color }
                                    } onClick={() => setCurrentColorItem(index)}></li>
                                ))}
                            </ul>
                            <div className="gradient-wrap">
                                <div className="gradient-preview"
                                    style={{
                                        background: `${gradientStyle.type}-gradient(to ${gradientStyle.direction}, ${gradientStyle.first}, r${gradientStyle.second}); }`
                                    }}>
                                </div>
                                <div className="gradient-right">
                                    <div className="gradient-selector">
                                        <p onClick={() => handleSetColor(0)}></p>
                                        <span></span>
                                        <p onClick={() => handleSetColor(1)}></p>
                                    </div>
                                    <div className="option-wrap">
                                        <div className="gradient-type">
                                            <button onClick={handleGradientIndex}>{gradientDirection[gradientIndex]}Linear</button>
                                            <button><RiRecordCircleLine />Radial</button>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="tab-image">
                        <ul>
                            <li></li>
                            <li></li>
                        </ul>
                        <button className="btn-upload-image btn-main">Upload</button>
                    </div>
                }
            </div>
        </Form >
    );
}

export default LayoutForm;