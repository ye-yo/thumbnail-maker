import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import './_Asset.scss';

function Asset(props) {
    const sectionForm = document.querySelector(".section-form");
    const { newAsset, id, currentAsset, setCurrentAsset, onClick, assetStyle, setAssetStyle } = props;
    const assetBox = useRef(null);
    const [pointer, setPointer] = useState('none');
    const [currentStyle, setCurrentStyle] = useState(newAsset.style);
    const assetComponent = useRef(null);
    const [CustomTag, setCustomTag] = useState('div');
    let isDragging = useRef(false);
    let isClicked = useRef(false);
    const isCurrentAsset = currentAsset.id === id;

    useEffect(() => {
        getAssetSize();// 렌더링된 사이즈에 따라 초기 width,height 재조정
    }, [])

    useEffect(() => {
        function handleClickOutside(e) {
            if (assetComponent.current && (!assetComponent.current.contains(e.target) && !sectionForm.contains(e.target))) {
                isDragging.current = false;
                setCustomTag('div')
                setPointer('none');
                setCurrentAsset({ ...currentAsset, id: null })
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, [assetComponent])

    useEffect(() => {
        if (isCurrentAsset) {
            setAssetStyle({ ...currentStyle, ...currentAsset.style });
        }
    }, [currentAsset])

    useEffect(() => {
        if (isCurrentAsset) {
            assetBox.current.style.fontSize = assetStyle.fontSize;
            let assetSize = getAssetSize();
            setCurrentStyle({ ...assetStyle, ...assetSize });
        }
    }, [assetStyle])

    function handleDrag(e, data) {
        if (!isDragging.current) {
            isDragging.current = true;
            if (!isClicked.current) {
                handleAssetClick(e);
            }
            else {
                isClicked.current = false;
            }
        }
    };
    // useEffect(() => {
    //     if (isCurrentAsset) {
    //         // getAssetSize();
    //     }
    // }, [currentStyle])

    function handleTextInput(e) {
        if (e.type === 'keyup' && e.keyCode !== 13) {
            return;
        }
        setAssetStyle({ ...assetStyle, width: e.target.scrollWidth, height: e.target.scrollHeight });
    }

    function getAssetSize() {
        const assetElement = assetBox.current;
        assetElement.style.width = '100px';
        assetElement.style.height = '1px';
        assetElement.style.width = assetElement.scrollWidth + 'px';
        assetElement.style.height = assetElement.scrollHeight + 'px';
        return { width: assetElement.style.width, height: assetElement.style.height };
    }
    function handleAssetClick(e) {
        e.stopPropagation();
        isClicked.current = true;
        if (isCurrentAsset) {
            if (pointer === 'none') {
                if (CustomTag === 'div') {
                    let assetSize = getAssetSize();
                    setCurrentStyle({ ...currentStyle, ...assetSize, pointerEvents: 'inherit' })
                    setCustomTag('textarea')
                }
                setPointer('inherit');
            }
            return;
        }
        else {
            setCurrentAsset({
                ...currentAsset,
                id: id,
                type: newAsset.type,
                style: currentStyle
            });
        }
    }

    return (
        <Draggable
            onStart={handleAssetClick}
            onDrag={(e, data) => handleDrag(e, data)}
            nodeRef={assetComponent}
        >
            <div id={id} ref={assetComponent}
                className={`asset${isCurrentAsset ? ' current' : ''}`}
                style={{ top: newAsset.style.top, left: newAsset.style.left, transform: 'none' }}
            >
                {
                    newAsset.type == 'text' ?
                        <CustomTag ref={assetBox} row="1"
                            onKeyUp={handleTextInput}
                            onKeyDown={handleTextInput}
                            defaultValue={newAsset.name || ''}
                            style={currentStyle}
                        >{CustomTag === 'div' ? newAsset.name : null}</CustomTag>
                        :
                        <img style={currentStyle} ref={assetBox} src={newAsset.url} alt={newAsset.name}></img>
                }
            </div>
        </Draggable >
    );
}

export default Asset;