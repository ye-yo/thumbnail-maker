import React, { useEffect, useRef, useState } from 'react';
import Form from './Form.js';
import { SketchPicker } from 'react-color';
import './_BackgroundForm.scss';
import { RiPaintFill, RiRecordCircleLine } from "react-icons/ri";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp, HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import handleFileOnChange, { getRgba } from '../commonFunction.js';

const gradientDirectionList = [
    { direction: 'top', icon: <HiOutlineArrowSmUp /> },
    { direction: 'right', icon: <HiOutlineArrowSmRight /> },
    { direction: 'bottom', icon: <HiOutlineArrowSmDown /> },
    { direction: 'left', icon: <HiOutlineArrowSmLeft /> }
];
const defaultColorList = [
    { "r": 205, "g": 106, "b": 131, "a": 1 },
    { "r": 45, "g": 134, "b": 123, "a": 1 },
    { "r": 46, "g": 191, "b": 145, "a": 1 },
    { "r": 255, "g": 221, "b": 108, "a": 1 },
    { "r": 123, "g": 121, "b": 210, "a": 1 },
    { "r": 198, "g": 210, "b": 236, "a": 1 },
    { "r": 154, "g": 189, "b": 210, "a": 1 },
    { "r": 51, "g": 93, "b": 153, "a": 1 },
    { from: { "r": 101, "g": 78, "b": 163, "a": 1 }, to: { "r": 234, "g": 175, "b": 200, "a": 1 }, type: 'linear', direction: 'right', directionIndex: 1 },
    { from: { "r": 218, "g": 68, "b": 83, "a": 1 }, to: { "r": 137, "g": 33, "b": 107, "a": 1 }, type: 'linear', direction: 'left', directionIndex: 0 },
    { from: { "r": 0, "g": 90, "b": 167, "a": 1 }, to: { "r": 255, "g": 253, "b": 228, "a": 1 }, type: 'linear', direction: 'top', directionIndex: 3 },
    { from: { "r": 168, "g": 192, "b": 255, "a": 1 }, to: { "r": 63, "g": 43, "b": 150, "a": 1 }, type: 'radial', direction: 'right', directionIndex: 1 },
];

function LayoutForm(props) {
    const { setBackground, background } = props;
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
            let newBackground = { ...background, index: currentColorItem.index };
            if (currentIsColorItem) {
                const currentColor = colorList[currentColorItem.index];
                setColor(currentColor);
                newBackground.type = "color";
                newBackground.background = getRgba(currentColor);
            }
            else {
                const currentGradient = colorList[currentColorItem.index];
                setColor(currentGradient[currentColorItem.isFrom ? 'from' : 'to']);
                const newGradientStyle = { ...gradientStyle, ...currentGradient };
                setGradientStyle(newGradientStyle);
                newBackground.type = "gradient";
                newBackground.background = getGradient(newGradientStyle);
            }
            setBackground(newBackground);
        }
    }, [currentColorItem, colorList])

    function handleGradientOneColor(e) {
        let name = e.target.getAttribute("name");
        setCurrentColorItem({ ...currentColorItem, isFrom: name === 'from' });
    }

    const handleChange = color => {
        let currentColorList = [...colorList];
        if (currentColorItem.index != null) {
            if (currentIsColorItem) {
                currentColorList[currentColorItem.index] = color.rgb;
            }
            else {
                const key = currentColorItem.isFrom ? 'from' : 'to';
                currentColorList[currentColorItem.index][key] = color.rgb;
            }
            setColorList(currentColorList);
        }
    };

    function handleGradient(e) {
        const type = e.target.name;
        let newObject = { ...gradientStyle, type: type };
        if (type === "linear" && gradientStyle.type === type) {
            const newIndex = gradientStyle.directionIndex === gradientDirectionList.length - 1 ? 0 : gradientStyle.directionIndex + 1;
            newObject.directionIndex = newIndex;
            newObject.direction = gradientDirectionList[newIndex].direction;
        }
        let currentColorList = [...colorList];
        currentColorList[currentColorItem.index].type = type;
        setGradientStyle(newObject);
        setBackground({ ...background, type: 'gradient', background: getGradient(newObject) });
    }
    function getGradient(gradientItem = gradientStyle) {
        return `${gradientItem.type}-gradient(${gradientItem.type == "linear" ? `to ${gradientItem.direction},` : ''} ${getRgba(gradientItem.from)}, ${getRgba(gradientItem.to)})`
    }

    function handleTab(index) {
        setCurrentTab(index);
    }

    function handleBackground(index, url) {
        setCurrentColorItem(null);
        setBackground({ ...background, type: "image", background: url, index: `image${index}` });
    }

    const currentIsColorItem = currentColorItem.index < gradientItemStartIndex;

    function setFileInput(url, name) {
        setUploadedImages([...uploadedImages, { url, name }])
    }
    return (
        <Form icon={RiPaintFill({ color: "white" })} label="Background" className="section-form-background">
            <div className="tab-button-wrap">
                <label className={currentTab === 0 ? 'clicked' : ''} onClick={() => handleTab(0)}>Color</label>
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
                                        onClick={() => { setCurrentColorItem({ index, isFrom: true }) }}></li>);
                                })}
                            </ul>
                            <div className={"tab-gradient" + (currentIsColorItem ? '' : ' open')}>
                                <div className="gradient-preview"
                                    style={{
                                        background: getGradient()
                                    }}>
                                </div>
                                <div className="gradient-right">
                                    <div className="gradient-selector">
                                        <p onClick={handleGradientOneColor} name="from" className={currentColorItem.isFrom ? 'clicked' : ''}
                                            style={{ backgroundColor: getRgba(gradientStyle.from) }}>
                                        </p>
                                        <span></span>
                                        <p onClick={handleGradientOneColor} name="to" className={!currentColorItem.isFrom ? 'clicked' : ''}
                                            style={{ backgroundColor: getRgba(gradientStyle.to) }}>
                                        </p>
                                    </div>
                                    <div className="option-wrap">
                                        <div className="gradient-type">
                                            <button className={gradientStyle.type === "linear" ? 'clicked' : ''} name="linear" onClick={handleGradient}>{gradientDirectionList[gradientStyle.directionIndex].icon}Linear</button>
                                            <button className={gradientStyle.type === "radial" ? 'clicked' : ''} name="radial" onClick={handleGradient}><RiRecordCircleLine />Radial</button>
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