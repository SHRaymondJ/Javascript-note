import React, { useState } from 'react'

interface ComponentType {
    name: string
    attr?: object
    style?: {
        width?: string
        height?: string
        marginBottom?: string
        backgroundColor?: string
    }
    children?: ComponentType[]
}

function App() {
    const [components, setComponents] = useState([
        {
            name: 'button',
            attr: {},
            style: { width: '60px', height: '20px', marginBottom: '5px' },
        },
        {
            name: 'div',
            expand: true,
            attr: {},
            style: {
                width: '100px',
                height: '20px',
                backgroundColor: 'gray',
            },
        },
    ])

    const onDragStart = (e:Event) => {
      console.log('start: ',e.target)
    }
    const onDragEnter = (e:Event) => {
      console.log('start: ',e.target)
    }

    const loop = (arr: ComponentType[], index: string | number) =>
        arr.map((item, i) => {
            const indexs = index === '' ? String(i) : `${index}-${i}`
            if (item.children) {
                return (
                    <div
                        {...item.attr}
                        style={item.style}
                        key={i}
                        draggable="true"
                        data-id={indexs}
                        onDragStart={onDragStart}
                        onDragOver={(e) => e.preventDefault}
                        onDragEnter={onDragEnter}
                    >
                        {loop(item.children, indexs)}
                    </div>
                )
            }
            switch (item.name) {
                case 'button':
                    return (
                        <button
                            {...item.attr}
                            style={item.style}
                            key={i}
                            draggable="true"
                            data-id={indexs}
                            onDragStart={onDragStart}
                            onDragOver={(e) => e.preventDefault}
                            onDragEnter={onDragEnter}
                        ></button>
                    )
                case 'div':
                    return (
                        <div
                            {...item.attr}
                            style={item.style}
                            key={i}
                            draggable="true"
                            data-id={indexs}
                            onDragStart={onDragStart}
                            onDragOver={(e) => e.preventDefault}
                            onDragEnter={onDragEnter}
                        ></div>
                    )
            }
        })
    return <div className="App">{loop(components, 0)}</div>
}

export default App
