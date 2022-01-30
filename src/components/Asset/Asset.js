import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import './_Asset.scss';

function Asset(props) {
    const sectionForm = document.querySelector(".section-form");
    const { newAsset, id, currentAsset, setCurrentAsset, onClick, assetStyle, setAssetStyle } = props;
    const assetBox = useRef(null);
    const [currentStyle, setCurrentStyle] = useState({ ...newAsset.style, visibility: 'hidden' });
    const assetComponent = useRef(null);
    let isDragging = useRef(false);
    let isClicked = useRef(false);
    const isCurrentAsset = currentAsset.id === id;
    useEffect(() => {
        const assetElement = assetComponent.current;
        let size = assetElement.getBoundingClientRect();
        assetElement.style.top = `calc(${assetElement.style.top} - ${size.height}px / 2)`;
        assetElement.style.left = `calc(${assetElement.style.left} - ${size.width}px / 2)`;
        setCurrentStyle({ ...currentStyle, visibility: 'visible' });
    }, [])

    useEffect(() => {
        function handleClickOutside(e) {
            if (assetComponent.current && (!assetComponent.current.contains(e.target) && !sectionForm.contains(e.target))) {
                isDragging.current = false;
                setCurrentStyle({ ...currentStyle, pointerEvents: 'none', cursor: 'inherit', visibility: 'visible' })
                setCurrentAsset({ ...currentAsset, id: null })
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, [])

    useEffect(() => {
        if (isCurrentAsset) {
            setAssetStyle({ ...currentStyle, ...currentAsset.style });
        }
    }, [currentAsset])

    useEffect(() => {
        if (isCurrentAsset) {
            assetBox.current.style.fontSize = assetStyle.fontSize;
            setCurrentStyle({ ...currentStyle, ...assetStyle });
        }
    }, [assetStyle])

    function handleDrag(e, data) {
        if (!isDragging.current) {
            isDragging.current = true;
            if (!isClicked.current) {
                assetBox.current.focus()
                handleAssetClick(e);
            }
            else {
                isClicked.current = false;
            }
        }
    };

    function handleAssetClick(e) {
        e.stopPropagation();
        isClicked.current = true;
        if (!isCurrentAsset) {
            setCurrentAsset({
                ...currentAsset,
                id: id,
                type: newAsset.type,
                style: currentStyle
            });
            setCurrentStyle({ ...currentStyle, cursor: 'default', pointerEvents: 'inherit' })
        }
    }
    // function handleAssetBlur(e) {
    //     if (!sectionForm.contains(e.target)) {
    //         isDragging.current = false;
    //         setCurrentStyle({ ...currentStyle, pointerEvents: 'none', cursor: 'move' })
    //         setCurrentAsset({ ...currentAsset, id: null })
    //     }
    // }
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
                        <div ref={assetBox} row="1"
                            // onBlur={handleAssetBlur}
                            style={currentStyle} contentEditable="true"
                            suppressContentEditableWarning="true"
                        ><div>{newAsset.name}</div></div>
                        :
                        <img style={currentStyle} ref={assetBox} src={newAsset.url} alt={newAsset.name}></img>
                }
            </div>
        </Draggable >
    );
}

export default Asset;