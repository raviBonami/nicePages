import React, { useEffect, useState } from 'react'
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './editor.scss'
import preset from 'grapesjs-preset-webpage';
import basic from 'grapesjs-blocks-basic'
import navbar from 'grapesjs-navbar'
import countdown from 'grapesjs-component-countdown'
import forms from 'grapesjs-plugin-forms'
import tabs from 'grapesjs-tabs'
import customcode from 'grapesjs-custom-code'
import tooltip from 'grapesjs-tooltip'
import typed from 'grapesjs-typed'
import table from 'grapesjs-table'
import grape_bootstrap from 'grapesjs-blocks-bootstrap4'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Button } from 'bootstrap'
// import {AiFillFileAdd} from 'react-bootstrap-icons'
// import { AiFillFileAdd } from 'react-icons/fa';

function Editor() {
    const [editor, setEditor] = useState(null);
    useEffect(() => {
        const editor = grapesjs.init({
            container: '#ejs',
            fromElement: true,
            height: '800px',
            width: 'auto',
            storageManager: false,
            plugins: [basic, navbar, countdown, forms, tabs, customcode, tooltip, typed],
            pluginsOpts: {
                // 'grapesjs-preset-webpage' : {}     
            },
            blockManager:{
                appendTo:'#block-container'
            },
            layerManager:{
                appendTo: '#layer-container'
            },
            traitManager:{
                appendTo: "#trait-container"
            },
            selectorManager:{
                appendTo: "#style-container"
            },
            styleManager:{
                appendTo:'#style-container',
                // sectors: [{
                //     name: "Dimension",
                //     open: false,
                //     buildProps: ["width", "min-height", "padding"],
                //     properties: [{
                //         type: "integer",
                //         name: "The Width",
                //         property: "width",
                //         units: ["px", "%", "rem"],
                //         defaults: 'auto',
                //         min: 0,

                //     }]
                // }]
            },

            // Device types
            deviceManager:{
                devices: [
                    {
                        name:"Desktop",
                        width:""
                    },
                    {
                        name:"Mobile",
                        width:'320px',
                        widthMedia:"480px"
                    }
            ]
            },

            // top taskbar
            panels:{
                defaults:[
                    {
                        id:"basic-actions",
                        el: ".panel_basic-actions",
                        buttons:[
                            {
                                id:"visibility",
                                active:true,
                                className:"btn-toggle-borders",
                                label:"<i class ='fa fa-clone' ></i>", //label:"<i class="bi bi-border" ></i>"
                                command: "sw-visibility"
                            }
                        ]
                    },
                    {
                        id: "panel-devices",
                        el: ".panel_devices",
                        buttons:[
                            {
                                id:"device-desktop",
                                label:"<i class='fa fa-television' ></i>",     // label:"<i class="bi bi-laptop" ></i>
                                command:"set-device-desktop",
                                active:true,
                                togglable:false,
                            },
                            {
                                id:"device-mobile",
                                label:"<i class='fa fa-mobile'></i>",     // label:"<i class="bi bi-phone" ></i>
                                command:"set-device-mobile"
                            }
                        ]
                    }
                ],
                 
            },
          
        })

        // Desktop command 
        editor.Commands.add("set-device-desktop", {
            run: (editor) => editor.setDevice("Desktop")
        })


        // Mobile command
        editor.Commands.add("set-device-mobile", {
            run: (editor) => editor.setDevice("Mobile")
        })

        setEditor(editor)
    }, [])

    return (
        <>
            <div id="navbar" className='sidenav d-flex flex-column overflow-scroll'>
                <nav className='navbar navbar-light' >
                    <div className='container-fluid' >
                        <span className='navbar-brand mb-8 h3 logo mx-5' >
                            NicePages
                        </span>
                    </div>
                </nav>
                <div className='my-2 d-flex flex-column' >
                    <button className="btn btn-outline-secondary mx-5 btn-sm " >
                        <i className="fa fa-plus"></i>
                        Add Page
                    </button>
                    <ul className='list-group pages' >
                        <li className='list-group-item d-flex justify-content-between align-items-center ' >
                            Home
                            <div className='m-2'>
                                <button className='btn btn-sm btn-outline-primary' >
                                    <i className='fa fa-pencil' ></i>
                                </button>
                                <button className='btn btn-sm btn-outline-primary' >
                                    <i className='fa fa-trash' ></i>
                                </button>
                                
                                
                            </div>
                        </li>
                        <li className='list-group-item d-flex justify-content-between align-items-center' >
                            About
                            <div className='m-2'>
                            <button className='btn btn-sm btn-outline-primary' >
                                    <i className='fa fa-pencil' ></i>
                                </button>
                                <button className='btn btn-sm btn-outline-primary' >
                                    <i className='fa fa-trash' ></i>
                                </button>
                            </div>
                        </li>
                        <li className='list-group-item d-flex justify-content-between align-items-center' >
                            Contact Us
                            <div className='m-2'>
                            <button className='btn btn-sm btn-outline-primary' >
                                    <i className='fa fa-pencil' ></i>
                                </button>
                                <button className='btn btn-sm btn-outline-primary' >
                                    <i className='fa fa-trash' ></i>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className='nav nav-tabs' role='tablist' >
                        <li className='nav-item' role="presentation" >
                            <button
                                className='nav-link active'
                                id="block-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#block"
                                aria-selected='true'
                                aria-controls='block'
                            >
                                <i className='fa fa-cubes' ></i>
                            </button>
                        </li>
                        <li className='nav-item' role="presentation" >
                            <button
                                className='nav-link'
                                id="layer-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#layer"
                                aria-selected='false'
                                aria-controls='layer'
                            >
                                <i className='fa fa-tasks' ></i>
                            </button>
                        </li>
                        <li className='nav-item' role="presentation" >
                            <button
                                className='nav-link'
                                id="style-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#style"
                                aria-selected='false'
                                aria-controls='style'
                            >
                                <i className='fa fa-paint-brush' ></i>
                            </button>
                        </li>
                        <li className='nav-item' role="presentation" >
                            <button
                                className='nav-link'
                                id="trait-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#trait"
                                aria-selected='false'
                                aria-controls='trait'
                            >
                                <i className='fa fa-cog' ></i>
                            </button>
                        </li>
                    </ul>
                    <div className='tab-content' >
                        <div
                            className='tab-pane fade show active'
                            id="block"
                            role="tabpanel"
                        >
                            <div id="block-container" ></div>
                        </div>
                        <div
                            className='tab-pane fade'
                            id="layer"
                            role="tabpanel"
                        >
                            <div id="layer-container" ></div>
                        </div>
                        <div
                            className='tab-pane fade'
                            id="style"
                            role="tabpanel"
                        >
                            <div id="style-container" ></div>
                        </div>
                        <div
                            className='tab-pane fade'
                            id="trait"
                            role="tabpanel"
                        >
                            <div id="trait-container" ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main-content' >
                <nav className='navbar navbar-light' >
                    <div className='container-fluid' >
                        <div className='panel_devices' ></div>
                        <div className='panel_basic-actions' ></div>
                    </div>
                </nav>
                <div id="ejs" >
                    {/* <div 
                        className='modal fade' 
                        id='addPageModal' 
                        tabIndex="-1" 
                        aria-hidden="true" 
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        >
                            <div className='modal-dialog' >
                                <div className='modal-content' >
                                    <div className='modal-header' >
                                        <h5 className='modal-title' >Create Page</h5>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                </div>
            </div>
        </>

        // <div id="ejs" >

        // </div>
    )
}

export default Editor