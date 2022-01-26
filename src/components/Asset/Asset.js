import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Draggable from 'react-draggable';
import './_Asset.scss';


function checkOutside(ref) {

}
const sectionForm = document.querySelector(".section-form");
function Asset(props) {
    const { asset, index, currentAsset, setCurrentAsset, onClick, assetStyle, setAssetStyle } = props;
    const assetBox = useRef(null);
    const [pointer, setPointer] = useState('none');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [currentStyle, setCurrentStyle] = useState({});
    const assetComponent = useRef(null);
    useEffect(() => {
        function handleClickOutside(e) {
            if (assetComponent.current && (!assetComponent.current.contains(e.target) && !sectionForm.contains(e.target))) {
                setCurrentAsset({ ...currentAsset, index: null })
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, [assetComponent])


    useEffect(() => {

        let newAsset = {
            width: assetBox.current.clientWidth,
            height: assetBox.current.clientHeight,
        }
        if (asset.type === "text") {
            newAsset.fontSize = assetBox.current.style.fontSize;
        }
        else {
            newAsset.fontSize = '14px';
        }
        setCurrentStyle({ ...newAsset });
    }, [])
    let isDragging = useRef(false);
    function handleTextInput(e) {
        e.target.style.width = '100px';
        e.target.style.height = '1px';
        e.target.style.width = e.target.scrollWidth + 'px';
        e.target.style.height = e.target.scrollHeight + 'px';
        setAssetStyle({ ...assetStyle, width: e.target.scrollWidth, height: e.target.scrollHeight });
    }
    function handleAssetClick(e) {
        e.stopPropagation();
        if (isCurrentAsset()) {
            if (pointer === 'none') {
                setPointer('inherit');
            }
            return;
        }
        setCurrentAsset({
            ...currentAsset,
            index: index,
            type: asset.type,
            style: currentStyle
        });
    }

    function handleAssetState() {
        isDragging.current = false;
        setPointer('none');
        setCurrentAsset({ ...currentAsset, index: null });
    }
    function handleDrag(e, data) {
        if (!isDragging.current) {
            isDragging.current = true;
            handleAssetClick(e);
        }
        setPosition({ x: data.x, y: data.y });
    };

    useEffect(() => {
        if (isCurrentAsset())
            setCurrentStyle({ ...assetStyle });
    }, [assetStyle])

    function start() {

    }

    const isCurrentAsset = () => { return currentAsset.index === index; }
    return (
        <Draggable
            onStart={handleAssetClick}
            onDrag={(e, data) => handleDrag(e, data)}
            tabIndex={index}
            onFocus={() => { console.log("---") }}
            onBlur={handleAssetState}
        // onStop={handleAssetState}
        >
            <div ref={assetComponent} className={`asset${isCurrentAsset() ? ' current' : ''} `}>
                {asset.type == 'text' ?
                    <textarea ref={assetBox} row="1"
                        onKeyUp={handleTextInput}
                        onKeyDown={handleTextInput}
                        defaultValue={asset.name}
                        style={{ ...asset.style, ...currentStyle, pointerEvents: pointer }}
                    ></textarea>
                    :
                    <img style={{ ...asset.style, ...currentStyle }} ref={assetBox} src={asset.url} alt={asset.name}></img>
                }
            </div>
        </Draggable >
    );
}

export default Asset;