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
    '나눔바른고딕체',
    '고운바탕체',
    '상주곶감체',
    'KoPub돋움체',
    '빙그레 따옴체',
    '빙그레체',
    '강원교육모두체',
    '조선일보명조체',
    '조선굴림체',
    '여기어때 잘난체',
    'Noto Sans',
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
                    // moreObject = { height: assetStyle.height * newFontSize / prevTextSize, width: assetStyle.width * newFontSize / prevTextSize };
                    moreObject = { height: assetStyle.height * newFontSize / prevTextSize };
                } break;
                case 'fontWeight': objectValue = checked && 'bold'; break;
                case 'textDecoration': objectValue = checked && 'underline'; break;
                case 'color': checked ? openColorPicker(name) : focusout(e); break;
                case 'backgroundColor': checked ? openColorPicker(name) : setColorTarget(null); break;
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

    function focusout(e) {
        e.target.checked = false;
        setColorTarget(null);
    }

    return (
        <div className={`text-option-wrap disabled-content${props.currentAsset.id === null || props.currentAsset.type !== 'text' ? ' disabled' : ''}`} >
            <div className="text-input-wrap">
                <SelectBox setSelectValue={setSelectValue} assetStyle={props.assetStyle} options={fontList} defaultValue='0' value={assetStyle.fontFamily} className="select-font"></SelectBox>
                <input type="number" min="0" name="fontSize" onChange={(e) => handleAssetStyle(e, null)} value={assetStyle.fontSize === undefined ? 14 : Number(assetStyle.fontSize.replace('px', ''))}></input>
            </div>
            <div className="text-style-wrap">
                <CheckBox id="check_bold" name="fontWeight" checkedEvent={handleAssetStyle} checked={assetStyle.fontWeight}><RiBold /></CheckBox>
                <CheckBox id="check_underline" name="textDecoration" checkedEvent={handleAssetStyle} checked={assetStyle.textDecoration}><RiUnderline /></CheckBox>
                <CheckBox id="check_color" name="color" checkedEvent={handleAssetStyle} checked={colorTarget === 'color'}><IoMdColorPalette /><span className="color-preview" style={{ backgroundColor: assetStyle.color || 'initial' }}></span></CheckBox>
                <CheckBox id="check_backcolor" name="backgroundColor" checkedEvent={handleAssetStyle} checked={colorTarget === 'backgroundColor'} className="btn-back-color"><BiFont className="ic-top" /><span style={{ backgroundColor: assetStyle.backgroundColor || 'initial' }}></span></CheckBox>
                <button name="textAlign" onClick={(e) => { handleAssetStyle(e, assetStyle.textAlign) }}>{alignList[assetStyle.textAlign || 'center']}</button>
                <CheckBox id="check_shadow" name="textShadow" checkedEvent={handleAssetStyle} checked={assetStyle.textShadow}><BiFont className="shadow" /></CheckBox>
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