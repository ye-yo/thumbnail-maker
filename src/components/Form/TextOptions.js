import React, { useReducer, useState, useRef, useEffect } from 'react';
import Form from './Form.js';
import SelectBox from '../../elements/SelectBox.js';
import CheckBox from '../../elements/CheckBox.js';
import './_TextOptions.scss';
import { BiFont } from "react-icons/bi";
import { IoMdColorPalette, IoIosAdd } from "react-icons/io";
import { RiDragMove2Fill, RiText, RiUnderline, RiPaintFill, RiBold, RiAlignJustify } from "react-icons/ri";
import { AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter, } from "react-icons/ai";
import getFontList from './FontList.js';
import axios from 'axios';
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
    const [currentAlign, setCurrentAlign] = useState(0)
    const fontSize = useRef(0);
    const [currentAssetSize, setCurrentAssetSize] = useState({ width: 0, height: 0 });
    const [imageAssets, setImageAssets] = useState([]);
    const [selectValue, setSelectValue] = useState(0);

    useEffect(() => {
        if (selectValue) {
            props.setAssetStyle({ ...assetStyle, fontFamily: selectValue })
        }
    }, [selectValue])

    function handleCurrentAlign() {
        setCurrentAlign(currentAlign => currentAlign === 3 ? 0 : currentAlign + 1)
    }

    function openColorPicker(colorTarget) {
        setColorTarget(colorTarget);
    }
    function handleUnderline(checked) {
        setAssetStyle({ ...assetStyle, textDecoration: checked && 'underline' });
    }
    function handleTextBold(checked) {
        setAssetStyle({ ...assetStyle, fontWeight: checked && 'bold' });
    }

    const [color, setColor] = useState();
    const [colorTarget, setColorTarget] = useState(null);

    function handleChange(color) {
        setColor(color);
        let currentassetStyle = assetStyle;
        currentassetStyle[colorTarget] = getRgba(color.rgb);
        setAssetStyle({ ...assetStyle, currentassetStyle });
    }

    function handleAssetStyle(e, checked) {
        const { name, value } = e.target;
        let objectValue = '';
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
                case 'color': checked ? openColorPicker(name) : setColorTarget(null); break;
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
    return (
        <div className={`text-option-wrap disabled-content${props.currentAsset.index === null || props.currentAsset.type !== 'text' ? ' disabled' : ''}`} >
            <div className="text-input-wrap">
                <SelectBox setSelectValue={setSelectValue} assetStyle={props.assetStyle} options={fontList} defaultValue='0' value={assetStyle.fontFamily} className="select-font"></SelectBox>
                <input type="number" min="0" name="fontSize" onChange={(e) => handleAssetStyle(e, null)} defaultValue={14} value={Number(assetStyle.fontSize.replace('px', ''))}></input>
            </div>
            <div className="text-style-wrap">
                <CheckBox id={'check_bold'} name="fontWeight" checkedEvent={handleTextBold}><RiBold /></CheckBox>
                <CheckBox id={'check_underline'} name="fontDecolation" checkedEvent={handleUnderline}><RiUnderline /></CheckBox>
                <CheckBox id={'check_color'} name="color" checkedEvent={handleAssetStyle}><IoMdColorPalette /><span className="color-preview" style={{ backgroundColor: assetStyle.color || 'initial' }}></span></CheckBox>
                <CheckBox id={'check_backcolor'} name="backgroundColor" checkedEvent={handleAssetStyle} className="btn-back-color"><BiFont className="ic-top" /><span style={{ backgroundColor: assetStyle.backgroundColor || 'initial' }}></span></CheckBox>
                <button name="textAlign" onClick={(e) => { console.log("--"); handleAssetStyle(e, assetStyle.textAlign) }}>{alignList[assetStyle.textAlign || 'center']}</button>
            </div>
            {
                colorTarget != null &&
                <div className="color-picker-wrap">
                    <SketchPicker color={color} onChangeComplete={handleChange} />
                </div>
            }
        </div >
    );
}

export default TextOptions;