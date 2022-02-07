import React, { useState, useEffect } from 'react';
import SelectBox from '../../elements/SelectBox.js';
import CheckBox from '../../elements/CheckBox.js';
import './_TextOptions.scss';
import { BiFont } from "react-icons/bi";
import { IoMdColorPalette, } from "react-icons/io";
import { RiUnderline, RiBold, RiAlignJustify, RiPaintFill } from "react-icons/ri";
import { AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter, } from "react-icons/ai";
import { SketchPicker } from 'react-color';
import { getRgba } from '../utils.js';

const fontList = [
    '기본서체',
    '고운바탕체',
    '상주곶감체',
    '빙그레 따옴체',
    '빙그레체',
    '강원교육모두체',
    '조선굴림체',
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
    const [colorTarget, setColorTarget] = useState(null);
    useEffect(() => {
        if (selectValue) {
            setAssetStyle({ ...assetStyle, fontFamily: selectValue })
        }
    }, [selectValue])

    useEffect(() => {
        setColorTarget(null);
    }, [currentAsset])

    function openColorPicker(colorTarget) {
        setColorTarget(colorTarget);
    }

    function handleChange(color) {
        let currentAssetStyle = assetStyle;
        currentAssetStyle[colorTarget] = getRgba(color.rgb);
        setAssetStyle({ ...assetStyle, currentAssetStyle });
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
                    moreObject = { height: assetStyle.height * newFontSize / prevTextSize };
                } break;
                case 'fontWeight': objectValue = checked && 'bold'; break;
                case 'textDecoration': objectValue = checked && 'underline'; break;
                case 'color': checked ? openColorPicker(currentAsset.type === 'figure' ? 'borderColor' : name) : setColorTarget(null); break;
                case 'background': checked ? openColorPicker(name) : setColorTarget(null); break;
                case 'textAlign': {
                    objectValue = (checked === 'center' || !checked) ? 'left' : checked === 'left' ? 'right' : checked === 'right' ? 'justify' : 'center';
                } break;
                case 'textShadow': objectValue = checked && '2px 2px 2px rgba(0, 0, 0, .5)'; break;
                default: break;
            }
            if (objectValue != null) {
                const newassetStyle = { ...assetStyle, [name]: objectValue, ...moreObject };
                setColorTarget(null);
                setAssetStyle(newassetStyle);
            }
        }
    }
    return (
        <div className={`text-option-wrap disabled-content${(currentAsset.id === null || currentAsset.type === 'image') ? ' disabled' : currentAsset.type === 'figure' ? ' disabled-text-option' : ''}`} >
            <div className="text-input-wrap">
                <SelectBox setSelectValue={setSelectValue} assetStyle={assetStyle} options={fontList} defaultValue='0' value={assetStyle.fontFamily} className="select-font text-option"></SelectBox>
                <input type="number" min="0" name="fontSize" onChange={(e) => handleAssetStyle(e, null)} value={assetStyle.fontSize === undefined ? 14 : Number(assetStyle.fontSize.replace('px', ''))} className="text-option"></input>
            </div>
            <div className="text-style-wrap">
                <CheckBox id="check_bold" name="fontWeight" checkedEvent={handleAssetStyle} checked={assetStyle.fontWeight} className="text-option"><RiBold /></CheckBox>
                <CheckBox id="check_underline" name="textDecoration" checkedEvent={handleAssetStyle} checked={assetStyle.textDecoration} className="text-option"><RiUnderline /></CheckBox>
                <CheckBox id="check_color" name="color" checkedEvent={handleAssetStyle} checked={colorTarget === 'color' || colorTarget === 'borderColor'}><IoMdColorPalette /><span className="color-preview" style={{ background: currentAsset.type === 'text' ? (assetStyle.color || 'initial') : (assetStyle.borderColor || 'initial') }}></span></CheckBox>
                <CheckBox id="check_backcolor" name="background" checkedEvent={handleAssetStyle} checked={colorTarget === 'background'} className="btn-back-color"><RiPaintFill className="ic-top" style={{ color: assetStyle.background || 'initial' }} /></CheckBox>
                <button name="textAlign" onClick={(e) => { handleAssetStyle(e, assetStyle.textAlign) }} className="text-option">{alignList[assetStyle.textAlign || 'center']}</button>
                <CheckBox id="check_shadow" name="textShadow" checkedEvent={handleAssetStyle} checked={assetStyle.textShadow} className="text-option"><BiFont className="shadow" /></CheckBox>
            </div>
            {
                (colorTarget != null && currentAsset.id && currentAsset.type !== 'image') &&
                <div className="color-picker-wrap" tabIndex="0">
                    <SketchPicker color={assetStyle[colorTarget]} onChangeComplete={handleChange} />
                </div>
            }
        </div >
    );
}

export default TextOptions;