import React, { useReducer, useState, useRef } from 'react';
import Form from './Form.js';
import SelectBox from '../../elements/SelectBox.js';
import './_AssetsForm.scss';
import { RiDragMove2Fill, RiText, RiUnderline, RiPaintFill, RiBold, RiAlignJustify } from "react-icons/ri";
import { ImImage } from "react-icons/im";
import { BiFont } from "react-icons/bi";
import { IoMdColorPalette, IoIosAdd } from "react-icons/io";
import { AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter, } from "react-icons/ai";



function AssetsForm() {
    const optionList = [
        { value: '0', name: 'font0' },
        { value: '1', name: 'font1' },
        { value: '2', name: 'font2' },
        { value: '3', name: 'font3' },
    ]
    const alignList = [<AiOutlineAlignCenter />, <AiOutlineAlignLeft />, <AiOutlineAlignRight />, <RiAlignJustify />];
    const [currentAlignIndex, setCurrentAlignIndex] = useState(0)
    const [currentTab, setCurrentTab] = useState(0);
    const fontSize = useRef(0);
    const [currentAssetSize, setCurrentAssetSize] = useState({ width: 0, height: 0 });
    function handleCurrentAlignIndex() {
        setCurrentAlignIndex(currentAlignIndex => currentAlignIndex === 3 ? 0 : currentAlignIndex + 1)
    }
    return (
        <Form icon={RiDragMove2Fill({ color: "white" })} label="Assets" className="section-form-assets">
            <div className="tab-button-wrap">
                <label className={!currentTab && 'clicked'} onClick={() => setCurrentTab(0)}>Text</label>
                <label className={currentTab && 'clicked'} onClick={() => setCurrentTab(1)}>Image</label>
            </div>
            <div className="tab-content">
                {!currentTab ?
                    <section className="section-text">
                        <div className="text-option-wrap">
                            <div className="text-input-wrap">
                                <SelectBox options={optionList} defaultValue='0' className="select-font"></SelectBox>
                                <input type="number" min="0" value={fontSize.current}></input>
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
                            <button><IoIosAdd />Title</button>
                            <button><IoIosAdd />Sub title</button>
                            <button><IoIosAdd />Text</button>
                        </div>
                    </section>
                    :
                    <section className="section-image">
                        <div className="image-option-wrap">
                            <div>
                                <label>W</label>
                                <input type="number" min="0" value={currentAssetSize.width}></input>
                            </div>
                            <div>
                                <label>H</label>
                                <input type="number" min="0" value={currentAssetSize.height}></input>
                            </div>
                        </div>
                        <div className="image-list">
                            <button className="btn-plus"><IoIosAdd /></button>
                            <ul>
                                {/* <li></li> */}
                            </ul>
                        </div>
                    </section>
                }
            </div>

        </Form >
    );
}

export default AssetsForm;