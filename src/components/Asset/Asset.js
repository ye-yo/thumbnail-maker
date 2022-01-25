import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Draggable from 'react-draggable';
import './_Asset.scss';

function Asset(props) {
    const { asset, index, currentAsset, setCurrentAsset, onClick } = props;
    const text = useRef('');
    const assetBox = useRef(null);
    const [pointer, setPointer] = useState('none');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    let isDragging = useRef(false);
    function handleAsset() {

    }
    function handleTextInput(e) {
        e.target.style.width = '100px';
        e.target.style.height = '28px';
        e.target.style.width = e.target.scrollWidth + 'px';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    function handleAssetClick(e) {
        e.stopPropagation();
        if (currentAsset === index) {
            if (pointer === 'none') {
                setPointer('inherit');
            }
            return;
        }
        setCurrentAsset(index);
    }

    function handleAssetState() {
        console.log("blur")
        isDragging.current = false;
        setPointer('none');
        setCurrentAsset(null);
    }
    function handleDrag(e, data) {
        if (!isDragging.current) {
            isDragging.current = true;
            handleAssetClick(e);
        }
        setPosition({ x: data.x, y: data.y });
    };
    return (
        <Draggable nodeRef={assetBox}
            onStart={handleAssetClick}
            onDrag={(e, data) => handleDrag(e, data)}
            onBlur={handleAssetState}
        // onStop={handleAssetState}
        >
            <div ref={assetBox}
                // style={{ width: size.width, height: size.height }}
                className={`asset${currentAsset === index ? ' current' : ''}`}>
                {asset.type == 'text' ?
                    <textarea ref={text} row="1"
                        onKeyUp={handleTextInput}
                        onKeyDown={handleTextInput}
                        defaultValue={asset.name}
                        style={{ ...asset.style, pointerEvents: pointer }}></textarea>
                    :
                    <img src={asset.url} alt={asset.name}></img>
                }
            </div>
        </Draggable >
    );
}

export default Asset;