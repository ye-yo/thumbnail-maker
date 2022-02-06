import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import './_Asset.scss';
import { RiCloseCircleFill } from "react-icons/ri";

function Asset(props) {
    const { newAsset, id, currentAsset, setCurrentAsset, canvasSize, assetStyle, setAssetStyle, removeAsset } = props;
    const sectionForm = document.querySelector(".section-form");
    const assetBox = useRef(null);
    const [currentStyle, setCurrentStyle] = useState({ ...newAsset.style, visibility: 'hidden', y: 0, x: 0 });
    const assetComponent = useRef(null);
    let isDragging = useRef(false);
    let isClicked = useRef(false);
    const isCurrentAsset = currentAsset.id === id;
    const [editing, setEditing] = useState({ pointerEvents: 'none', cursor: 'inherit' })
    const canvasElement = document.querySelector('#canvas').getBoundingClientRect();
    const [prevCanvasSize, setPrevCanvasSize] = useState({ width: null, height: null });

    useEffect(() => {
        setPrevCanvasSize({ ...prevCanvasSize, width: canvasElement.width, height: canvasElement.height });
        const assetElement = assetComponent.current;
        let assetSize = assetElement.getBoundingClientRect();
        let topPercent = 0.5,
            leftPercent = 0.5;
        if (newAsset.type !== 'image') {
            if (newAsset.style.y) {
                topPercent = Number(newAsset.style.y.replace("%", '')) * 0.01;
                leftPercent = Number(newAsset.style.x.replace("%", '')) * 0.01;
            }
        }
        let width = newAsset.style.width || canvasElement.width * 0.9,
            height = newAsset.type === 'image' ? width * assetSize.height / assetSize.width : assetSize.height,
            x = canvasElement.width * leftPercent - width / 2,
            y = canvasElement.height * topPercent - height / 2;
        setCurrentStyle({ ...currentStyle, visibility: 'visible', x, y, width, height })
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

    useEffect(() => {
        if (prevCanvasSize.width) {
            const newX = (currentStyle.x + currentStyle.width / 2) * canvasSize.width / prevCanvasSize.width;
            const newY = (currentStyle.y + currentStyle.height / 2) * canvasSize.height / prevCanvasSize.height;
            setCurrentStyle({ ...currentStyle, x: newX - currentStyle.width / 2, y: newY - currentStyle.height / 2 });
            setPrevCanvasSize({ ...prevCanvasSize, ...canvasSize })
        }
    }, [canvasSize])

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
                x: currentStyle.x,
                y: currentStyle.y,
            }}
            noderef={assetComponent}
            lockAspectRatio={newAsset.shape === 'circle' || newAsset.type === 'image'}
            onResizeStart={handleAssetClick}
            onDragStart={handleAssetClick}
            onResize={(e, direction, ref, delta, position) => { handleAssetResize(ref, position); }}
            onDragStop={(e, d) => { setAssetStyle({ ...assetStyle, x: d.x, y: d.y }); e.preventDefault(); }}
            onResizeStop={(e, direction, ref, delta, position) => {
                handleAssetResize(ref, position);
            }}
        >
            <div id={id} ref={assetComponent}
                className={`asset${isCurrentAsset ? ' current' : ''} asset-${newAsset.type}`}>
                <button className="btn-remove" onClick={handleAssetRemove}><RiCloseCircleFill /></button>
                {
                    newAsset.type === 'text' ?
                        <div ref={assetBox} style={{ ...currentStyle, width: '100%', height: '100%', ...editing }}
                            contentEditable="true" suppressContentEditableWarning="true" spellCheck="false"
                        ><div>{newAsset.name}</div></div>
                        : newAsset.type === 'figure' ?
                            <div ref={assetBox} style={{ ...currentStyle, background: newAsset.shape === 'line' ? 'none' : currentStyle.background }}>
                                {newAsset.shape === 'line' ? <p className="line" style={{ background: currentStyle.background }}></p> : ''}
                            </div>
                            : <img ref={assetBox} crossOrigin='Anonymous' src={newAsset.url} alt={newAsset.name}></img>
                }
            </div>

        </Rnd >
    );
}

export default Asset