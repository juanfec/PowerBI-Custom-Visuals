/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import {} from 'jquery';




import { VisualSettings } from "./settings";

export interface User {
    id: string;
    name: string;
    number: number;
    email: string;
}
export class Visual implements IVisual {
    private target: HTMLElement;
    private settings: VisualSettings;
    private apiUrl: String;
    private listOfData;
    private $table: JQuery;
    

    

    constructor(options: VisualConstructorOptions) {
        //console.log('Visual constructor', options);
        this.target = options.element;
        if (document) {
            
            //new_p.appendChild(document.createTextNode("Update count:"));
            //const new_em: HTMLElement = document.createElement("em");
            //let row = table.insertRow(0);
            //let cell = row.insertCell(0);
            let requestParam: RequestInit  = {
                method: 'GET',
                redirect: 'follow'
            };
            fetch("https://5ef7d86db3a11b0016d2ecfc.mockapi.io/api/v1/users", requestParam)
            .then(response => response.json())
            .then(data => {
                this.listOfData = data;
                this.drawTable(this.target);
            });
            $(document).ready(function(){
                $("p").click(function(){
                  $(this).hide();
                });
                console.log("jquery");
            });
            $(options.element)
                //Display jquery version in visual
                .append(`<p>JQuery Version: </p>`)
                //Display lodash version in visual
                .append(`<p>Lodash Version: <em>test</em></p>`)
        }
    }

    public update(options: VisualUpdateOptions) {
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        console.log(options.dataViews[0].single.value);

    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }


    public drawTable(target: HTMLElement){
        //let table: HTMLTableElement = <HTMLTableElement>document.getElementById("table");
        let table: HTMLTableElement = <HTMLTableElement>document.createElement("table");
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of Object.keys(this.listOfData[0])) {
            if(key!="id"){
                let th = document.createElement("th");
                let text = document.createTextNode(key);
                th.appendChild(text);
                row.appendChild(th);
            }
        }
        for (let element of this.listOfData) {
            let row = table.insertRow();
            for (let key in element) {
            if(key!="id"){
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
            }
        }
        
        target.appendChild(table);
    }
    

}

