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
                appendTo:'#blocks'
            },
            layerManager:{
                appendTo: '#layer-container'
            },
            styleManager:{
                appendTo:'#style-view'
            },
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
                                label:"Visibility", //label:"<i class="bi bi-border" ></i>"
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
                                label:"Laptop",     // label:"<i class="bi bi-laptop" ></i>
                                command:"set-device-desktop",
                                active:true,
                                togglable:false,
                            },
                            {
                                id:"device-mobile",
                                label:"Mobile",     // label:"<i class="bi bi-phone" ></i>
                                command:"set-device-mobile"
                            }
                        ]
                    }
                ],
                 
            },
          
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
                        <i className="bi bi-file-earmark-plus"></i>
                        Add Page
                    </button>
                    <ul className='list-group pages' >
                        <li className='list-group-item d-flex justify-content-between' >
                            Home
                            <div className='m-2'>
                                <i className='bi bi-pencil-fill' ></i>
                                <i className='bi bi-trash' ></i>
                            </div>
                        </li>
                        <li className='list-group-item d-flex justify-content-between' >
                            About US
                            <div className='m-2'>
                                <i className='bi bi-pencil-fill' ></i>
                                <i className='bi bi-trash' ></i>
                            </div>
                        </li>
                        <li className='list-group-item d-flex justify-content-between' >
                            Contact US
                            <div className='m-2'>
                                <i className='bi bi-pencil-fill' ></i>
                                <i className='bi bi-trash' ></i>
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
                                <i className='bi bi-grid-fill' ></i>
                            </button>
                        </li>
                        <li className='nav-item' role="presentation" >
                            <button
                                className='nav-link'
                                id="trait-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#trait"
                                aria-selected='true'
                                aria-controls='trait'
                            >
                                <i className='bi bi-layers-fill' ></i>
                            </button>
                        </li>
                        <li className='nav-item' role="presentation" >
                            <button
                                className='nav-link'
                                id="style-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#style"
                                aria-selected='true'
                                aria-controls='style'
                            >
                                <i className='bi bi-palette-fill' ></i>
                            </button>
                        </li>
                    </ul>
                    <div className='tab-content' >
                        <div
                            className='tab-pane fade show active'
                            id="block"
                            role="tabpanel"
                        >
                            <div id="blocks" ></div>
                        </div>
                        <div
                            className='tab-pane fade'
                            id="trait"
                            role="tabpanel"
                        >
                            <div id="layer-container" ></div>
                        </div>
                        <div
                            className='tab-pane fade'
                            id="style"
                            role="tabpanel"
                        >
                            <div id="style-view" ></div>
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

                </div>
            </div>
        </>

        // <div id="ejs" >

        // </div>
    )
}

export default Editor