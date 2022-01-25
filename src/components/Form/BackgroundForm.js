import React, { useEffect, useRef, useState } from 'react';
import Form from './Form.js';
import { CirclePicker, SketchPicker } from 'react-color';
// import InputColor from 'react-input-color';
import './_BackgroundForm.scss';
import { RiPaintFill, RiRecordCircleLine } from "react-icons/ri";
import { MdBlurLinear, } from "react-icons/md";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp, HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import handleFileOnChange from '../commonFunction.js';

const gradientDirectionList = [
    { direction: 'top', icon: <HiOutlineArrowSmUp /> },
    { direction: 'right', icon: <HiOutlineArrowSmRight /> },
    { direction: 'bottom', icon: <HiOutlineArrowSmDown /> },
    { direction: 'left', icon: <HiOutlineArrowSmLeft /> }
];

function hexToRgba(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return { r: (c >> 16) & 255, g: (c >> 8) & 255, b: c & 255, a: 1 };
        // return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
    }
    throw new Error('Bad Hex');
}

function getRgba({ r, g, b, a }) {
    return `rgba(${r},${g},${b},${a})`;
}

function LayoutForm(props) {
    const defaultColorList = [
        { "r": 44, "g": 92, "b": 95, "a": 1 },
        { "r": 144, "g": 192, "b": 195, "a": 1 },
        { "r": 100, "g": 142, "b": 51, "a": 1 },
        { "r": 44, "g": 92, "b": 95, "a": 1 },
        { "r": 44, "g": 92, "b": 95, "a": 1 },
        { "r": 44, "g": 92, "b": 95, "a": 1 },
        { "r": 44, "g": 92, "b": 95, "a": 1 },
        { "r": 44, "g": 92, "b": 95, "a": 1 },
        { from: { "r": 44, "g": 92, "b": 95, "a": 1 }, to: { "r": 144, "g": 192, "b": 195, "a": 1 }, type: 'linear', direction: 'right', directionIndex: 1 },
        { from: { "r": 100, "g": 142, "b": 51, "a": 1 }, to: { "r": 144, "g": 192, "b": 195, "a": 1 }, type: 'linear', direction: 'left', directionIndex: 3 },
        { from: { "r": 100, "g": 142, "b": 51, "a": 1 }, to: { "r": 44, "g": 92, "b": 95, "a": 1 }, type: 'linear', direction: 'top', directionIndex: 0 },
        { from: { "r": 44, "g": 92, "b": 95, "a": 1 }, to: { "r": 255, "g": 255, "b": 255, "a": 1 }, type: 'radial', direction: 'right', directionIndex: 1 },
    ];
    const gradientItemStartIndex = 8;
    const [currentTab, setCurrentTab] = useState(0);
    const [colorList, setColorList] = useState(defaultColorList);
    const [currentColorItem, setCurrentColorItem] = useState({ index: 0, isFrom: true });
    const [gradientStyle, setGradientStyle] = useState(defaultColorList[gradientItemStartIndex]);
    const [color, setColor] = useState(defaultColorList[0]);
    const [uploadedImages, setUploadedImages] = useState([]);

    useEffect(() => {
        setColorList(defaultColorList);
    }, [])

    useEffect(() => {
        if (currentColorItem.index != null) {
            let newBackground = { ...props.background, index: currentColorItem.index };
            if (currentIsColorItem()) {
                const currentColor = colorList[currentColorItem.index];
                setColor(currentColor);
                newBackground.type = "color";
                newBackground.background = getRgba(currentColor);
            }
            else {
                const currentGradient = colorList[currentColorItem.index];
                setColor(currentGradient.from);
                const newGradientStyle = { ...gradientStyle, ...currentGradient };
                setGradientStyle(newGradientStyle);
                newBackground.type = "gradient";
                newBackground.background = getGradient(newGradientStyle);
            }
            props.setBackground(newBackground);
        }
    }, [currentColorItem, colorList])

    function handleGradientOneColor(index) {
        const key = !index ? 'from' : 'to';
        setCurrentColorItem({ ...currentColorItem, isFrom: !index });
        setColor(gradientStyle[key]);
    }



    const handleChange = color => {
        let currentColorList = [...colorList];
        if (currentColorItem.index != null) {
            if (currentIsColorItem()) {
                currentColorList[currentColorItem.index] = color.rgb;
            }
            else {
                const key = currentColorItem.isFrom ? 'from' : 'to';
                currentColorList[currentColorItem.index][key] = color.rgb;
            }
            setColorList(currentColorList);
        }
    };

    function handleGradient(type) {
        let newObject = { type: type };
        if (type === "linear" && gradientStyle.type === type) {
            const newIndex = gradientStyle.directionIndex === gradientDirectionList.length - 1 ? 0 : gradientStyle.directionIndex + 1;
            newObject.directionIndex = newIndex;
            newObject.direction = gradientDirectionList[newIndex].direction;
        }
        let currentColorList = [...colorList];
        currentColorList[currentColorItem.index].type = type;
        const newGradientStyle = { ...gradientStyle, ...newObject };
        setGradientStyle(newGradientStyle);
        props.setBackground({ ...props.background, type: 'gradient', background: getGradient(newGradientStyle) });
    }

    function getGradient(gradientItem = gradientStyle) {
        return `${gradientItem.type}-gradient(${gradientItem.type == "linear" ? `to ${gradientItem.direction},` : ''} ${getRgba(gradientItem.from)}, ${getRgba(gradientItem.to)})`
    }

    function handleTab(index) {
        setCurrentTab(index);
    }

    function handleBackground(index, url) {
        setCurrentColorItem(null);
        props.setBackground({ ...props.background, type: "image", background: url, index: `image${index}` });
    }

    const currentIsColorItem = () => { return currentColorItem.index < gradientItemStartIndex };

    function setFileInput(url, name) {
        setUploadedImages([...uploadedImages, { url, name }])
    }

    return (
        <Form icon={RiPaintFill({ color: "white" })} label="Background" className="section-form-background">
            <div className="tab-button-wrap">
                <label className={currentTab === 0 ? 'clicked' : ''} onClick={() => handleTab(0)}>Color</label>
                {/* <label className={currentTab === 1 ? 'clicked' : ''} onClick={() => { handleTab(1); setInitColorPicker(); }}>Gradient</label> */}
                <label className={currentTab === 1 ? 'clicked' : ''} onClick={() => setCurrentTab(1)}>Image</label>
            </div>
            <div className="tab-content">
                {currentTab === 0 ?
                    <div className="tab-color">
                        <div className="color-picker-wrap">
                            <SketchPicker color={color} onChangeComplete={handleChange} />
                        </div>
                        <div className="tab-color-right">
                            <ul className="color-list">
                                {colorList.map((color, index) => {
                                    return (<li key={index} style={{ background: index < gradientItemStartIndex ? getRgba(color) : getGradient(color) }}
                                        onClick={() => { setCurrentColorItem({ ...currentColorItem, index, isFrom: true }) }}></li>);
                                })}
                            </ul>
                            <div className="tab-gradient">
                                <div className="gradient-preview"
                                    style={{
                                        background: getGradient()
                                    }}>
                                </div>
                                <div className="gradient-right">
                                    <div className="gradient-selector">
                                        <p onClick={() => handleGradientOneColor(0)} className={currentColorItem.isFrom && !currentIsColorItem() === "gradient" ? 'clicked' : ''}
                                            style={{ backgroundColor: gradientStyle.from }}>
                                        </p>
                                        <span></span>
                                        <p onClick={() => handleGradientOneColor(1)} className={!currentColorItem.isFrom && !currentIsColorItem() === "gradient" ? 'clicked' : ''}
                                            style={{ backgroundColor: gradientStyle.to }}>
                                        </p>
                                    </div>
                                    <div className="option-wrap">
                                        <div className="gradient-type">
                                            <button className={gradientStyle.type === "linear" ? 'clicked' : ''} onClick={() => { handleGradient("linear") }}>{gradientDirectionList[gradientStyle.directionIndex].icon}Linear</button>
                                            <button className={gradientStyle.type === "radial" ? 'clicked' : ''} onClick={() => { handleGradient("radial") }}><RiRecordCircleLine />Radial</button>
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
                            {uploadedImages.map(({ url, name }, index) =>
                                <li key={index} onClick={() => handleBackground(index, url)}><img src={url} alt={name}></img></li>
                            )}
                        </ul>
                        <input id="input_file" type="file" accept='image/jpg,impge/png,image/jpeg,image/gif'
                            onChange={(e) => {
                                handleFileOnChange(e, setFileInput);
                            }}></input>
                        <label className="btn-upload-image btn btn-main" htmlFor="input_file">Upload</label>
                    </div>
                }
            </div>
        </Form >
    );
}

export default LayoutForm;