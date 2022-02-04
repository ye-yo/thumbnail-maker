import React, { useEffect, useRef, useState } from 'react';
import Form from './Form.js';
import { SketchPicker } from 'react-color';
import './_BackgroundForm.scss';
import { RiPaintFill, RiRecordCircleLine, RiUploadLine } from "react-icons/ri";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp, HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { handleFileOnChange, getRgba, getGradient } from '../utils.js';
import defaultColorList from '../../data/defaultColorList.json'

const gradientDirectionList = [
    { direction: 'top', icon: <HiOutlineArrowSmUp /> },
    { direction: 'right', icon: <HiOutlineArrowSmRight /> },
    { direction: 'bottom', icon: <HiOutlineArrowSmDown /> },
    { direction: 'left', icon: <HiOutlineArrowSmLeft /> }
];

const randomColorIndex = defaultColorList.length - 2;
const randomGradientIndex = defaultColorList.length - 1;

function LayoutForm(props) {
    const { setBackground, background } = props;
    const gradientItemStartIndex = 8;
    const [currentTab, setCurrentTab] = useState(0);
    const [colorList, setColorList] = useState(defaultColorList);
    const [currentColorItem, setCurrentColorItem] = useState({ index: gradientItemStartIndex, isFrom: true, type: 'gradient', isRand: false });
    const [gradientStyle, setGradientStyle] = useState(defaultColorList[gradientItemStartIndex]);
    const [color, setColor] = useState(defaultColorList[0].rgb);
    const [uploadedImages, setUploadedImages] = useState([]);

    useEffect(() => {
        if (currentColorItem.index !== null) {
            const current = colorList[currentColorItem.index];
            const newColor = current.type === 'color' ? current.rgb : currentColorItem.isFrom ? current.from : current.to;
            setColor({ ...color, ...newColor });
            if (current.type === 'gradient') {
                setGradientStyle(current);
            }
        }
    }, [currentColorItem])

    useEffect(() => {
        setBackground({ type: currentColorItem.type, background: getBackgroundStyle(colorList[currentColorItem.index]) })
    }, [color])


    function getBackgroundStyle(colorItem) {
        return colorItem.type === 'color' ? getRgba(colorItem.rgb) : getGradient(colorItem);
    }

    function handleGradientOneColor(e) {
        let name = e.target.getAttribute("name");
        setCurrentColorItem({ ...currentColorItem, isFrom: name === 'from', type: 'gradient' });
    }

    const handleChange = selectedColor => {
        let currentColorList = [...colorList];
        const newColor = selectedColor.rgb;
        if (currentColorItem.type === 'color') {
            currentColorList[currentColorItem.index].rgb = newColor;
        }
        else {
            const keyword = currentColorItem.isFrom ? 'from' : 'to';
            currentColorList[currentColorItem.index][keyword] = newColor;
        }
        setColor({ ...color, ...newColor });
        setColorList(currentColorList);
    };

    function handleGradient(e) {
        const form = e.target.name;
        let newObject = { ...gradientStyle, form };
        if (form === "linear" && gradientStyle.form === form) {
            const newIndex = gradientStyle.directionIndex === gradientDirectionList.length - 1 ? 0 : gradientStyle.directionIndex + 1;
            newObject.directionIndex = newIndex;
            newObject.direction = gradientDirectionList[newIndex].direction;
        }
        if (currentColorItem.index) {
            let currentColorList = [...colorList];
            currentColorList[currentColorItem.index].form = form;
        }
        setGradientStyle(newObject);
        setBackground({ ...background, type: 'gradient', background: getGradient(newObject) });
    }


    function handleTab(index) {
        setCurrentTab(index);
    }

    function handleBackground(index, url) {
        setCurrentColorItem({ index: null });
        setBackground({ ...background, type: "image", background: url, index: `image${index}` });
    }


    function setFileInput({ url, name }) {
        setUploadedImages([...uploadedImages, { url, name }])
    }

    function getRandNumber(prevNum) {
        const max = 240;
        const min = 80;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomRgba() {
        let randomColor = {
            r: getRandNumber(),
            g: getRandNumber(),
            b: getRandNumber(),
            a: 1,
        }
        return randomColor;
    }
    function getRandomColor() {
        const newRandomColor = getRandomRgba();
        let currentColorList = [...colorList];
        currentColorList[randomColorIndex].rgb = newRandomColor;
        setCurrentColorItem({ index: randomColorIndex, type: 'color', isRand: true })
        setColorList(currentColorList);
    }

    function getRandomGradient() {
        const from = getRandomRgba();
        const to = getRandomRgba();
        let currentColorList = [...colorList];
        currentColorList[randomGradientIndex] = { ...currentColorList[randomGradientIndex], from, to };
        setCurrentColorItem({ index: randomGradientIndex, type: 'gradient', isFrom: true, isRand: true })
        setColorList(currentColorList);
    }

    return (
        <Form icon={RiPaintFill()} label="Background" className="section-form-background">
            <div className="tab-button-wrap">
                <label className={currentTab === 0 ? 'clicked' : ''} onClick={() => handleTab(0)}>Color</label>
                <label className={currentTab === 1 ? 'clicked' : ''} onClick={() => setCurrentTab(1)}>Image</label>
            </div>
            <div className="tab-content">
                {currentTab === 0 ?
                    <div className="tab-color">
                        <div className="btn-random-color-wrap">
                            <p onClick={() => setCurrentColorItem({ index: randomColorIndex, isRand: true, type: 'color' })} className='color' style={{ background: getRgba(colorList[randomColorIndex].rgb) }}></p>
                            <button onClick={getRandomColor} className="btn-random-color">Random Color</button>
                            <p onClick={() => setCurrentColorItem({ index: randomGradientIndex, isFrom: true, isRand: true, type: 'gradient' })} name="to" className='color' style={{ background: getGradient(colorList[randomGradientIndex]) }}></p>
                            <button onClick={getRandomGradient} className="btn-random-gradient">Random Gradient</button>
                        </div>
                        <div className="color-picker-wrap">
                            <SketchPicker color={color} onChangeComplete={handleChange} />
                        </div>
                        <div className="tab-color-right">
                            <ul className="color-list">
                                {colorList.map((color, index) => {
                                    if (!color.isRand)
                                        return (<li key={index} className="color" style={{ background: getBackgroundStyle(color) }}
                                            onClick={() => { setCurrentColorItem({ index, isFrom: true, type: color.type }) }}></li>);
                                })}
                            </ul>
                            <div className={"tab-gradient" + (currentColorItem.type === 'gradient' ? ' open' : '')}>
                                <div className="gradient-preview"
                                    style={{
                                        background: getGradient(gradientStyle)
                                    }}>
                                </div>
                                <div className="gradient-right">
                                    <div className="gradient-selector">
                                        <p onClick={handleGradientOneColor} name="from" className="color"
                                            style={{ backgroundColor: getRgba(gradientStyle.from) }}>
                                        </p>
                                        <span></span>
                                        <p onClick={handleGradientOneColor} name="to" className="color"
                                            style={{ backgroundColor: getRgba(gradientStyle.to) }}>
                                        </p>
                                    </div>
                                    <div className="option-wrap">
                                        <div className="gradient-type">
                                            <button className={gradientStyle.form === "linear" ? 'clicked' : ''} name="linear" onClick={handleGradient}>{gradientDirectionList[gradientStyle.directionIndex].icon}Linear</button>
                                            <button className={gradientStyle.form === "radial" ? 'clicked' : ''} name="radial" onClick={handleGradient}><RiRecordCircleLine />Radial</button>
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
                        <input id="input_file" type="file" accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={(e) => {
                                handleFileOnChange(e, setFileInput);
                            }}></input>
                        <label className="btn-upload-image btn btn-main" htmlFor="input_file">Upload<RiUploadLine /></label>
                    </div>
                }
            </div>
        </Form >
    );
}

export default LayoutForm;