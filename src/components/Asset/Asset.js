import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import './_Asset.scss';
import { RiCloseCircleFill } from "react-icons/ri";

function Asset(props) {
    const { newAsset, id, currentAsset, setCurrentAsset, onClick, assetStyle, setAssetStyle, removeAsset } = props;
    const sectionForm = document.querySelector(".section-form");
    const assetBox = useRef(null);
    // const [currentStyle, setCurrentStyle] = useState({});
    const [currentStyle, setCurrentStyle] = useState({ ...newAsset.style, visibility: 'hidden', top: 0, left: 0 });
    const assetComponent = useRef(null);
    let isDragging = useRef(false);
    let isClicked = useRef(false);
    const isCurrentAsset = currentAsset.id === id;
    const [editing, setEditing] = useState({ pointerEvents: 'none', cursor: 'inherit' })
    const canvasElement = document.querySelector('#canvas').getBoundingClientRect();

    useEffect(() => {
        const assetElement = assetComponent.current;
        let assetSize = assetElement.getBoundingClientRect();
        let topPercent = 0.5,
            leftPercent = 0.5;
        if (newAsset.type === 'text') {
            if (newAsset.style.top) {
                topPercent = Number(newAsset.style.top.replace("%", '')) * 0.01;
                leftPercent = Number(newAsset.style.left.replace("%", '')) * 0.01;
            }
        }
        let width = canvasElement.width * (newAsset.type === 'text' ? 0.9 : 0.4),
            height = newAsset.type === 'image' ? width * assetSize.height / assetSize.width : assetSize.height,
            left = canvasElement.width * leftPercent - width / 2,
            top = canvasElement.height * topPercent - height / 2;
        setCurrentStyle({
            ...currentStyle, visibility: 'visible', left, top, width, height
        })
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };

        function handleClickOutside(e) {
            if (assetComponent.current && (!assetComponent.current.contains(e.target) && !sectionForm.contains(e.target))) {
                isDragging.current = false;
                setEditing({ pointerEvents: 'none', cursor: 'inherit' })
                let obj = { ...currentStyle };
                obj.visibility = 'visible';
                setCurrentStyle(obj)
                setCurrentAsset({ ...currentAsset, id: null })
            }
        }
    }, [currentStyle]);

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
            setEditing({ cursor: 'default', pointerEvents: 'inherit' });
        }
    }

    useEffect(() => {
        if (isCurrentAsset) {
            let size = assetBox.current.getBoundingClientRect();
            let style = { ...currentStyle };
            if (style.height === 'auto')
                style.height = size.height;
            setAssetStyle(style);
        }
        else if (currentAsset.id === null) {
            setAssetStyle({ fontSize: '14px', height: 'auto', width: 'auto' })
        }
    }, [currentAsset])

    useEffect(() => {
        if (isCurrentAsset) {
            assetBox.current.style.fontSize = assetStyle.fontSize;
            setCurrentStyle({ ...currentStyle, ...assetStyle });
        }
    }, [assetStyle])

    function handleAssetResize(ref, position) {
        setAssetStyle({ ...currentStyle, width: Number(ref.style.width.replace('px', '')), height: Number(ref.style.height.replace('px', '')), ...position })
    }

    function handleAssetRemove() {
        removeAsset(id);
    }

    return (
        <Rnd
            size={{
                width: currentStyle.width,
                height: currentStyle.height
            }}
            position={{
                x: currentStyle.left,
                y: currentStyle.top,
            }}
            noderef={assetComponent}
            lockAspectRatio="true"
            onResizeStart={handleAssetClick}
            onDragStart={handleAssetClick}
            onResize={(e, direction, ref, delta, position) => { handleAssetResize(ref, position); }}
            onDragStop={(e, d) => { setAssetStyle({ ...assetStyle, left: d.x, top: d.y }); e.preventDefault(); }}
            onResizeStop={(e, direction, ref, delta, position) => { handleAssetResize(ref, position); }}
        >
            <div id={id} ref={assetComponent}
                className={`asset${isCurrentAsset ? ' current' : ''} asset-${newAsset.type}`}>
                <button className="btn-remove" onClick={handleAssetRemove}><RiCloseCircleFill /></button>
                {
                    newAsset.type == 'text' ?
                        <div ref={assetBox} style={{ ...currentStyle, width: '100%', height: '100%', ...editing }}
                            contentEditable="true" suppressContentEditableWarning="true"
                        ><div>{newAsset.name}</div></div>
                        :
                        <img ref={assetBox} crossOrigin='Anonymous' src={newAsset.url} alt={newAsset.name}></img>
                }
            </div>

        </Rnd >
    );
}

export default Asset