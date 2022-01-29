import React, { useState, useEffect } from 'react';
import SelectBox from '../../elements/SelectBox.js';
import CheckBox from '../../elements/CheckBox.js';
import './_TextOptions.scss';
import { BiFont } from "react-icons/bi";
import { IoMdColorPalette, } from "react-icons/io";
import { RiUnderline, RiBold, RiAlignJustify } from "react-icons/ri";
import { AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter, } from "react-icons/ai";
import { SketchPicker } from 'react-color';
import { getRgba } from '../commonFunction.js';


const fontList = [
    'Noto Sans',
    'Nanum Gothic',
    'Nanum Myeongjo',
    'Noto Serif KR',
    'Dongle',
    'Roboto',
    'Montserrat',
    'Open Sans',
    'Playfair Display',
    'Poppins',
    'Raleway',
]

function TextOptions(props) {
    const { currentAsset, assetStyle, setAssetStyle } = props;
    const alignList = {
        'center': <AiOutlineAlignCenter />,
        'left': <AiOutlineAlignLeft />,
        'right': <AiOutlineAlignRight />,
        'justify': <RiAlignJustify />
    };
    const [selectValue, setSelectValue] = useState(0);
    const [color, setColor] = useState();
    const [colorTarget, setColorTarget] = useState(null);

    useEffect(() => {
        if (selectValue) {
            props.setAssetStyle({ ...assetStyle, fontFamily: selectValue })
        }
    }, [selectValue])

    function openColorPicker(colorTarget) {
        setColorTarget(colorTarget);
    }
    function handleUnderline(e) {
        setAssetStyle({ ...assetStyle, textDecoration: e.target.checked && 'underline' });
    }
    function handleTextBold(e) {
        setAssetStyle({ ...assetStyle, fontWeight: e.target.checked && 'bold' });
    }

    function handleChange(color) {
        setColor(color);
        let currentassetStyle = assetStyle;
        currentassetStyle[colorTarget] = getRgba(color.rgb);
        setAssetStyle({ ...assetStyle, currentassetStyle });
    }

    function handleAssetStyle(e, checked) {
        const { name, value } = e.target;
        let objectValue = null;
        let moreObject = {};
        if (name) {
            switch (name) {
                case 'fontSize': {
                    let prevTextSize = assetStyle.fontSize;
                    prevTextSize = Number(prevTextSize.replace('px', ''));
                    objectValue = value + 'px';
                    const newFontSize = Number(value);
                    moreObject = { height: assetStyle.height * newFontSize / prevTextSize, width: assetStyle.width * newFontSize / prevTextSize };
                } break;
                case 'bold': objectValue = checked && 'bold'; break;
                case 'fontDecolation': objectValue = checked && 'underline'; break;
                case 'color': checked ? openColorPicker(name) : focusout(e); break;
                case 'backgroundColor': checked ? openColorPicker(name) : setColorTarget(null); break;
                case 'textAlign': {
                    objectValue = (checked === 'center' || !checked) ? 'left' : checked === 'left' ? 'right' : checked === 'right' ? 'justify' : 'center';
                } break;
                default: break;
            }
            if (objectValue != null) {
                const newassetStyle = { ...assetStyle, [name]: objectValue, ...moreObject };
                setColorTarget(null);
                setAssetStyle(newassetStyle);
            }
        }
    }

    function focusout(e) {
        e.target.checked = false;
        setColorTarget(null);
    }
    return (
        <div className={`text-option-wrap disabled-content${props.currentAsset.id === null || props.currentAsset.type !== 'text' ? ' disabled' : ''}`} >
            <div className="text-input-wrap">
                <SelectBox setSelectValue={setSelectValue} assetStyle={props.assetStyle} options={fontList} defaultValue='0' value={assetStyle.fontFamily} className="select-font"></SelectBox>
                <input type="number" min="0" name="fontSize" onChange={(e) => handleAssetStyle(e, null)} value={Number(assetStyle.fontSize.replace('px', ''))}></input>
            </div>
            <div className="text-style-wrap">
                <CheckBox id="check_bold" name="fontWeight" checkedEvent={handleTextBold} checked={assetStyle.fontWeight}><RiBold /></CheckBox>
                <CheckBox id="check_underline" name="fontDecolation" checkedEvent={handleUnderline} checked={assetStyle.textDecoration}><RiUnderline /></CheckBox>
                <CheckBox id="check_color" name="color" checkedEvent={handleAssetStyle} checked={colorTarget === 'color'}><IoMdColorPalette /><span className="color-preview" style={{ backgroundColor: assetStyle.color || 'initial' }}></span></CheckBox>
                <CheckBox id="check_backcolor" name="backgroundColor" checkedEvent={handleAssetStyle} checked={colorTarget === 'backgroundColor'} className="btn-back-color"><BiFont className="ic-top" /><span style={{ backgroundColor: assetStyle.backgroundColor || 'initial' }}></span></CheckBox>
                <button name="textAlign" onClick={(e) => { handleAssetStyle(e, assetStyle.textAlign) }}>{alignList[assetStyle.textAlign || 'center']}</button>
            </div>
            {
                colorTarget != null &&
                <div className="color-picker-wrap" tabIndex="0">
                    <SketchPicker color={color} onChangeComplete={handleChange} />
                </div>
            }
        </div >
    );
}

export default TextOptions;