import React, { useState, useEffect } from 'react';
import Form from './Form.js';
import TextOptions from './TextOptions.js';
import './_AssetsForm.scss';
import { RiDragMove2Fill, RiAlignJustify } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter, } from "react-icons/ai";
import handleFileOnChange from '../commonFunction.js';
const textLayoutList = [
    { name: 'Title', style: { fontSize: '54px', fontWeight: 'bold', left: '50%', top: '50%', textShadow: '2px 2px 2px rgba(0,0,0,.5)' } },
    { name: 'Sub title', style: { fontSize: '38px', fontWeight: '500', left: '50%', top: '50%', textShadow: '2px 2px 2px rgba(0,0,0,.5)' } },
    { name: 'Text', style: { fontSize: '24px', left: '50%', top: '50%', textShadow: '2px 2px 2px rgba(0,0,0,.5)' } },
];

let count = 0;
function AssetsForm(props) {
    const { currentAsset, assetStyle, setAssetStyle, assets, setCanvasAssets } = props;
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
        let newItem = { ...item };
        newItem.type = 'text';
        newItem.id = 'asset' + count++;
        setCanvasAssets([...assets, newItem])
    }

    function setFileInput(item) {
        setImageAssets([...imageAssets, item])
    }

    function handleImageAssetClick(item) {
        let newItem = { ...item };
        newItem.type = 'image';
        newItem.id = 'asset' + count++;
        newItem.style = {};
        setCanvasAssets([...assets, newItem])
    }

    const filterNumber = /^[+]?\d+(?:[.]\d+)?$/g;
    function handleAssetSize(e) {
        if (!filterNumber.test(e.target.value)) {
            e.preventDefault();
            return;
        };
        let { name, value } = e.target;
        setAssetStyle({ ...assetStyle, [name]: Number(value) });
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
                        <div className={`image-option-wrap disabled-content${currentAsset.id === null || currentAsset.type !== 'image' ? ' disabled' : ''}`}>
                            <div>
                                <label>W</label>
                                <input onChange={handleAssetSize} name="width" type="text" value={assetStyle.width === 'auto' ? '' : assetStyle.width || ''}></input>
                            </div>
                            <div>
                                <label>H</label>
                                <input onChange={handleAssetSize} name="height" type="text" value={assetStyle.height === 'auto' ? '' : assetStyle.height || ''}></input>
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