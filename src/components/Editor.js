import React, { useEffect, useState, useLayoutEffect } from 'react'
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
import projectManager from 'grapesjs-project-manager'
// import { pages } from '../pages/pages'
// import {AiFillFileAdd} from 'react-bootstrap-icons'
// import { AiFillFileAdd } from 'react-icons/fa';

function Editor() {
    const [editor, setEditor] = useState(null);
    const [pageManager, setPageManager] = useState(null)
    const [myPages, setMyPages] = useState([{
        id: 1,
        styles: "",
        components: "<h1>Hello from page 1</h1>",
        title:"Page 1"
    }])
    const [currentPage, setCurrentPage] = useState(1)

    // useLayoutEffect(() => {
    //     setMyPages(pages)
    // })

    useEffect(() => {
        // setMyPages(pages);
        const editor = grapesjs.init({
            container: '#ejs',
            fromElement: true,
            height: '800px',
            width: 'auto',
            plugins: [basic, navbar, countdown, forms, tabs, customcode, tooltip, typed, projectManager],
            pluginsOpts: {
                // 'grapesjs-preset-webpage' : {}     
            },
            blockManager: {
                appendTo: '#block-container'
            },
            storageManager: {
                type: 'local',
                autosave: false,
                autoload: true,
                stepsBeforeSave: 5,
                id: "my-",
                contentTypeJson: true,
                storeComponents: true,
                storeStyles: true,
                storeHtml: true,
                storeCss: true,


                // type:'remote',
                // stepsBeforeSave: 5,
                // contentTypeJson: true,
                // storeComponents: true,
                // storeStyles: true,
                // storeHtml: true,
                // storeCss: true,
                // id: "my-",
                // urlStore: ''
            },
            layerManager: {
                appendTo: '#layer-container'
            },
            traitManager: {
                appendTo: "#trait-container"
            },
            selectorManager: {
                appendTo: "#style-container"
            },
            styleManager: {
                appendTo: '#style-container',
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
            deviceManager: {
                devices: [
                    {
                        name: "Desktop",
                        width: ""
                    },
                    {
                        name: "Mobile",
                        width: '320px',
                        widthMedia: "480px"
                    }
                ]
            },

            pageManager: {
                pages: myPages
            },

            // top taskbar
            panels: {
                defaults: [
                    {
                        id: "basic-actions",
                        el: ".panel_basic-actions",
                        buttons: [
                            {
                                id: "visibility",
                                active: true,
                                className: "btn-toggle-borders",
                                label: "<i class ='fa fa-clone' ></i>", //label:"<i class="bi bi-border" ></i>"
                                command: "sw-visibility"
                            },
                            {
                                id: "clear",
                                // active: true,
                                classList: "btn-toggle-borders",
                                label: "<i class='fa fa-trash'></i>",
                                command: "clear-page"
                            },
                            {
                                id: 'undo',
                                classList: "btn-toggle-borders",
                                label: '<i class="fa fa-rotate-left"></i>',
                                command: "undo"
                            },
                            {
                                id: 'redo',
                                classList: "btn-toggle-borders",
                                label: '<i class="fa fa-rotate-right"></i>',
                                command: "redo"
                            },
                            {
                                id: 'save',
                                classList: "btn-toggle-borders",
                                label: '<i class="fa fa-save" ></i>',
                                command: "save"
                            },
                            {
                                id: "load",
                                classList: "btn-toggle-borders",
                                label: '<i class="fa fa-upload" ></i>',
                                command: "load"
                            },
                            {
                                id: 'open-templates',
                                className: 'fa fa-folder-o',
                                attributes: {
                                    title: 'Open projects and templates'
                                },
                                command: 'open-templates'
                            }

                        ]
                    },
                    {
                        id: "panel-devices",
                        el: ".panel_devices",
                        buttons: [
                            {
                                id: "device-desktop",
                                label: "<i class='fa fa-television' ></i>",     // label:"<i class="bi bi-laptop" ></i>
                                command: "set-device-desktop",
                                active: true,
                                togglable: false,
                            },
                            {
                                id: "device-mobile",
                                label: "<i class='fa fa-mobile'></i>",     // label:"<i class="bi bi-phone" ></i>
                                command: "set-device-mobile"
                            },

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

        editor.Commands.add("clear-page", {
            run: (editor) => {
                editor.DomComponents.clear();
                editor.CssComposer.clear();
            }
        })

        editor.Commands.add("undo", {
            run: (editor) => {
                editor.UndoManager.undo()
            }
        })

        editor.Commands.add("redo", {
            run: (editor) => {
                editor.UndoManager.redo()
            }
        })

        // editor.Commands.add("save", {
        //     run: (editor) => {
        //         // const data = editor.getProjectData()
        //         // const dataa = JSON.stringify(data)
        //         let html = JSON.stringify(editor.getHtml());
        //         let css = JSON.stringify(editor.getCss());
        //         const data = JSON.stringify([html,css]);

        //         localStorage.setItem("page1", data);
        //         console.log(data);
        //     }
        // })

        editor.Commands.add("save", {
            run: (editor) => {
                const data = JSON.stringify([editor.getHtml(), editor.getCss()]);
                localStorage.setItem("page1", data);
            },
        });

        editor.Commands.add("load", {
            run: async (editor) => {
                var newData = localStorage.getItem("page1");
                newData = JSON.parse(newData);
                console.log(
                    JSON.parse(localStorage.getItem("page1"))[0],
                    "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
                );
                console.log(
                    JSON.parse(localStorage.getItem("page1"))[1],
                    "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
                );
                editor.setComponents(JSON.parse(localStorage.getItem("page1"))[0]);
                // editor.setStyle("h1{color:'red'}");
                editor.setStyle(JSON.parse(localStorage.getItem("page1"))[1]);
            },
        });

        editor.DomComponents.addType('select',{
            isComponent: () => false,
        })

        setEditor(editor)
        setPageManager(editor.Pages);
        // console.log(myPages);    empty array
        setMyPages(myPages)
        // console.log(myPages);    empty array
    }, [])


    const renderPage = (page) => {
        localStorage.setItem(currentPage,JSON.stringify([editor.getHtml(), editor.getCss()]));
        setCurrentPage(page.id);
        // console.log(page);
        const pageComponents = localStorage.getItem(page.id)
        console.log(JSON.parse(pageComponents)[0], "==========++++++++++++++");
        editor.setComponents(JSON.parse(pageComponents)[0]);
        editor.setStyle(JSON.parse(pageComponents)[1]);
        // editor.setComponents(JSON.parse(pageComponents[0]));
        // if (pageComponents !== undefined) {
        //     editor.setComponents(JSON.parse(pageComponents[0]));
        // } else {
        //     editor.setComponents("");
        // }


        // myPages.forEach((page) => {
        //     if (page.id === currentPage) {

        //         localStorage.setItem(currentPage , JSON.stringify([editor.getHtml(), editor.getCss()]))
        //     }
        // })

       
    }

    const deletePage = (pageid) => {
        pageManager.removePage(pageid);
    }

    const addPage = () => {
        localStorage.setItem(currentPage,JSON.stringify([editor.getHtml(), editor.getCss()]))
        const newId = myPages.length + 1;
        const newPage = {
            id: newId,
            styles: "",
            components: `<h1>New Page added ${myPages.length + 1}</h1>`,
            title: `Page ${myPages.length + 1}`
        }
        // console.log(newPage, "-----------------")   
        // console.log(newArray, "before -----------")
        const newArray = [...myPages, newPage]
        setMyPages(newArray);

        // Setting page id as current page when one page is added
        setCurrentPage(newId);
        
        // console.log(newArray, "after -----------")
        editor.setComponents(newPage.components);
        editor.setStyle(newPage.styles);
    }


    const validateForm = (event) => {
        "use strict"
        event.preventDefault();
        const form = document.getElementById("create-page");
        if (!form.checkValidity) {
            // Form is not valid
            event.stopPropagation()
            form.classList.add("was-validated");
            return false;
        }
    }

    const clearForm = () => {
        const nameField = document.getElementById("name");
        nameField.value = "";

        const form = document.getElementById("create-page");
        form.classList.remove("was-validated")
    }

    const submitForm = () => {
        console.log("Got form content");
        const nameField = document.getElementById("name");
        const nameValue = nameField.value;
        console.log("Name value ", nameValue);
        clearForm();
        return true;
    }

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
                <div className='my-2 d-flex flex-column' id='page-manager' >
                    <button className="btn btn-outline-secondary mx-5 btn-sm " onClick={addPage} >
                        <i className="fa fa-plus"></i>
                        Add Page
                    </button>
                    <ul className='list-group pages' >
                        {myPages.length > 0 && myPages.map((page) => {
                            return (
                                <li className='list-group-item d-flex justify-content-between align-items-center ' >
                                    {page.title}
                                    <div className='m-2'>
                                        <button className='btn btn-sm btn-outline-primary' onClick={() => renderPage(page)} >
                                            <i className='fa fa-pencil' ></i>
                                        </button>
                                        <button className='btn btn-sm btn-outline-primary' onClick={() => deletePage(page.id)} >
                                            <i className='fa fa-trash' ></i>
                                        </button>


                                    </div>
                                </li>
                            )
                        })}
                        {/* <li className='list-group-item d-flex justify-content-between align-items-center ' >
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
                        </li> */}
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
                        {/* <div className='panel_clear' ></div> */}
                    </div>
                </nav>
                <div id="ejs" >
                    {/* <div 
                        className='modal fade' 
                        id='addPageModal' 
                        tabIndex="-1" 
                        aria-hidden="true" 
                        aria-labelledby='addPageModalLabel'
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        >
                            <div className='modal-dialog' >
                                <div className='modal-content' >
                                <form id='create-page' noValidate onSubmit={(e) => validateForm(e)} >
                                    <div className='modal-header' >
                                        <h5 className='modal-title' id="addPageModalLabel" >Create Page</h5>
                                        <button 
                                            type='button' 
                                            className='btn-close' 
                                            data-bs-dismiss='modal' 
                                            aria-label='close'
                                            ></button>
                                            <div className='modal-body' >
                                                <div className='col-auto' >
                                                    <label className='form-label' for="name" >Name</label>
                                                    <input 
                                                        type='text' 
                                                        name='name' 
                                                        id='name' 
                                                        className='form-control form-control-sm'
                                                        placeholder='Name of Page'
                                                        required
                                                        ></input>
                                                        <div className='invalid-feedback' >
                                                            Please provide a valid name
                                                        </div>
                                                </div>
                                            </div>
                                            <div className='modal-footer' >
                                                <button 
                                                type='button'
                                                className='btn btn-sm btn-secondary'
                                                data-bs-dismiss='modal'
                                                onClick={() => clearForm()}
                                                >Close</button>
                                                <button 
                                                    type='submit'
                                                    className='btn btn-primary btn-sm'
                                                    >Save</button>
                                            </div>
                                    </div>
                                    </form>
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