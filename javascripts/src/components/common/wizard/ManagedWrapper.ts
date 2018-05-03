

import * as React from 'react'
import * as RAT from "react-aria-tabpanel";
import {TabManager} from "./manager";
var PropTypes = require('prop-types');

var innerCreateManager = require('react-aria-tabpanel/lib/createManager');
var specialAssign = require('react-aria-tabpanel/lib/specialAssign');

interface AddManagerInterface {
    manager?: TabManager
}

// export interface TabManager{
//     activateTab(nextTabId:string):void
//     destroy():void
//     activate():void
// }
interface ManagerOptions{
 onChange?: Function
 activeTabId?: string
 letterNavigation?:boolean
}


var checkedProps = {
    children: PropTypes.node.isRequired,
    activeTabId: PropTypes.string,
    letterNavigation: PropTypes.bool,
    onChange: PropTypes.func,
    tag: PropTypes.string,
};
export class ManagedWrapper extends RAT.Wrapper<AddManagerInterface>
{


     manager: TabManager
    constructor(props:RAT.WrapperProps & AddManagerInterface){
        super(props)

        if (props.manager)
            this.manager = this.props.manager
    }

    componentWillMount(){

         console.log('seomte')

    }

    //
    //
    // displayName:string = 'AriaTabPanel-Wrapper'
    //
    // propTypes: = checkedProps
    //
    // getDefaultProps() {
    // return { tag: 'div' };
    // }
    //
    //
    // getChildContext() {
    // return { atpManager: this.manager };
    // }
    //
    //
    //
    //
    // componentWillUnmount() {
    //     this.manager.destroy();
    // }
    //
    // componentDidMount() {
    //     this.manager.activate();
    // }

    render() {
        var props = this.props;
        var elProps = {};
        specialAssign(elProps, props, checkedProps);
        return React.createElement(props.tag, elProps, props.children);
    }



}


