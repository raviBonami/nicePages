import React, { useEffect, useState } from 'react'
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './editor.css'
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
            }
        })
        setEditor(editor)
    }, [])

    return (
        // <div id="navbar" >

        // </div>

        <div id="ejs" >

        </div>
    )
}

export default Editor