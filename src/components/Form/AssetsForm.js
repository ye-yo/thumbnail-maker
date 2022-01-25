import React, { useReducer, useState, useRef } from 'react';
import Form from './Form.js';
import SelectBox from '../../elements/SelectBox.js';
import './_AssetsForm.scss';
import { RiDragMove2Fill, RiText, RiUnderline, RiPaintFill, RiBold, RiAlignJustify } from "react-icons/ri";
import { ImImage } from "react-icons/im";
import { BiFont } from "react-icons/bi";
import { IoMdColorPalette, IoIosAdd } from "react-icons/io";
import { AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter, } from "react-icons/ai";
import handleFileOnChange from '../commonFunction.js';


const textLayoutList = [
    { name: 'Title', style: { fontSize: 'large', fontWeight: '500' } },
    { name: 'Sub title', style: {} },
    { name: 'Text', steyl: { fontSize: 14 } },
];

const optionList = [
    { value: '0', name: 'font0' },
    { value: '1', name: 'font1' },
    { value: '2', name: 'font2' },
    { value: '3', name: 'font3' },
];


function AssetsForm(props) {

    const alignList = [<AiOutlineAlignCenter />, <AiOutlineAlignLeft />, <AiOutlineAlignRight />, <RiAlignJustify />];
    const [currentAlignIndex, setCurrentAlignIndex] = useState(0)
    const [currentTab, setCurrentTab] = useState(0);
    const fontSize = useRef(0);
    const [currentAssetSize, setCurrentAssetSize] = useState({ width: 0, height: 0 });
    const [imageAssets, setImageAssets] = useState([]);
    function handleCurrentAlignIndex() {
        setCurrentAlignIndex(currentAlignIndex => currentAlignIndex === 3 ? 0 : currentAlignIndex + 1)
    }

    function handleTextCreate(item) {
        item.type = 'text';
        props.setCanvasAssets([...props.assets, item])
    }

    function setFileInput(item) {
        setImageAssets([...imageAssets, item])
    }

    function handleImageAssetClick(item) {
        console.log(item)
        item.type = 'image';
        props.setCanvasAssets([...props.assets, item])
    }
    return (
        <Form icon={RiDragMove2Fill({ color: "white" })} label="Assets" className="section-form-assets">
            <div className="tab-button-wrap">
                <label className={!currentTab ? 'clicked' : {}} onClick={() => setCurrentTab(0)}>Text</label>
                <label className={currentTab ? 'clicked' : ''} onClick={() => setCurrentTab(1)}>Image</label>
            </div>
            <div className="tab-content">
                {!currentTab ?
                    <section className="section-text">
                        <div className="text-option-wrap">
                            <div className="text-input-wrap">
                                <SelectBox options={optionList} defaultValue='0' className="select-font"></SelectBox>
                                <input type="number" min="0" defaultValue={fontSize.current}></input>
                            </div>
                            <div className="text-style-wrap">
                                <button><RiBold /></button>
                                <button><RiUnderline /></button>
                                <button><IoMdColorPalette /><span className="color-preview" style={{ backgroundColor: "red" }}></span></button>
                                <button className="btn-back-color"><BiFont className="ic-top" /><span style={{ backgroundColor: "red" }}></span></button>
                                <button onClick={handleCurrentAlignIndex}>{alignList[currentAlignIndex]}</button>
                            </div>
                        </div>
                        <div className="text-button-wrap">
                            {textLayoutList.map((item, index) =>
                                <button onClick={() => handleTextCreate(item)} key={index}><IoIosAdd />{item.name}</button>
                            )}
                        </div>
                    </section>
                    :
                    <section className="section-image">
                        <div className="image-option-wrap">
                            <div>
                                <label>W</label>
                                <input type="number" min="0" defaultValue={currentAssetSize.width}></input>
                            </div>
                            <div>
                                <label>H</label>
                                <input type="number" min="0" defaultValue={currentAssetSize.height}></input>
                            </div>
                        </div>
                        <div className="image-list">
                            <input id="input_asset_image" type="file" accept='image/jpg,impge/png,image/jpeg,image/gif'
                                onChange={(e) => {
                                    handleFileOnChange(e, setFileInput);
                                }}></input>
                            <label htmlFor="input_asset_image" className="btn-plus"><IoIosAdd /></label>
                            <ul>
                                {imageAssets.map((item, index) =>
                                    <li onClick={() => handleImageAssetClick(item)} key={index}>
                                        <img src={item.url}></img>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </section>
                }
            </div>

        </Form >
    );
}

export default AssetsForm;