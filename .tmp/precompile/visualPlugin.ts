import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api"
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];

var test7321E7C5C0B845E79EF4B87581346DED_DEBUG: IVisualPlugin = {
    name: 'test7321E7C5C0B845E79EF4B87581346DED_DEBUG',
    displayName: 'test',
    class: 'Visual',
    apiVersion: '2.6.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }

        throw 'Visual instance not found';
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["test7321E7C5C0B845E79EF4B87581346DED_DEBUG"] = test7321E7C5C0B845E79EF4B87581346DED_DEBUG;
}

export default test7321E7C5C0B845E79EF4B87581346DED_DEBUG;