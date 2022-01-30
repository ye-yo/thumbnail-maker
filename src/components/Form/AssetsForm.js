import React, { useState, useEffect } from 'react';
import Form from './Form.js';
import TextOptions from './TextOptions.js';
import './_AssetsForm.scss';
import { RiDragMove2Fill, RiAlignJustify } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter, } from "react-icons/ai";
import handleFileOnChange from '../commonFunction.js';
let count = 0;
const textLayoutList = [
    { name: 'Title', style: { fontSize: '54px', fontWeight: 'bold', left: '50%', top: '50%' } },
    { name: 'Sub title', style: { fontSize: '38px', fontWeight: '500', left: '50%', top: '50%' } },
    { name: 'Text', style: { fontSize: '24px', left: '50%', top: '50%' } },
];

function AssetsForm(props) {
    const { currentAsset, assetStyle, setAssetStyle } = props;
    const alignList = {
        'center': <AiOutlineAlignCenter />,
        'left': <AiOutlineAlignLeft />,
        'right': <AiOutlineAlignRight />,
        'justify': <RiAlignJustify />
    };
    const [currentTab, setCurrentTab] = useState(0);
    const [imageAssets, setImageAssets] = useState([]);
    const [selectValue, setSelectValue] = useState(0);

    useEffect(() => {
        if (selectValue) {
            props.setAssetStyle({ ...props.assetStyle, fontFamily: selectValue })
        }
    }, [selectValue])

    function handleTextCreate(item) {
        item.type = 'text';
        item.id = 'asset' + count++;
        props.setCanvasAssets([...props.assets, item])
    }

    function setFileInput(item) {
        setImageAssets([...imageAssets, item])
    }

    function handleImageAssetClick(item) {
        item.type = 'image';
        item.id = 'asset' + count++;
        item.style = {};
        props.setCanvasAssets([...props.assets, item])
    }

    const filterNumber = /^[+]?\d+(?:[.]\d+)?$/g;
    function handleAssetSize(e) {
        if (!filterNumber.test(e.target.value)) {
            e.preventDefault();
            return;
        };
        let { name, value } = e.target;
        setAssetStyle({ ...assetStyle, [name]: value });
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
                        <TextOptions currentAsset={currentAsset} assetStyle={assetStyle} setAssetStyle={setAssetStyle}></TextOptions>
                        <div className="text-button-wrap">
                            {textLayoutList.map((item, index) =>
                                <button onClick={() => handleTextCreate(item)} key={index}><IoIosAdd />{item.name}</button>
                            )}
                        </div>
                    </section>
                    :
                    <section className="section-image">
                        <div className={`image-option-wrap disabled-content${props.currentAsset.id === null || props.currentAsset.type !== 'image' ? ' disabled' : ''}`}>
                            <div>
                                <label>W</label>
                                <input onChange={handleAssetSize} name="width" type="text" defaultValue={assetStyle.width} value={assetStyle.width === 'auto' ? '' : assetStyle.width}></input>
                            </div>
                            <div>
                                <label>H</label>
                                <input onChange={handleAssetSize} name="height" type="text" defaultValue={assetStyle.height} value={assetStyle.height === 'auto' ? '' : assetStyle.height}></input>
                            </div>
                        </div>
                        <div className="image-list">
                            <input id="input_asset_image" type="file" accept='image/jpg,image/png,image/jpeg,image/gif'
                                onChange={(e) => {
                                    handleFileOnChange(e, setFileInput);
                                }}></input>
                            <label htmlFor="input_asset_image" className="btn-plus"><IoIosAdd /></label>
                            <ul>
                                {imageAssets.map((item, index) =>
                                    <li onClick={() => handleImageAssetClick(item)} key={'image' + index}>
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