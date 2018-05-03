// License: LGPL-3.0-or-later
import * as React from 'react';
import Autocomplete = require('react-autocomplete')

import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import {AutocompleteProps} from "../../../../types/react-autocomplete/types";

// Not even close to done

@observer
export default class AutocompleteList extends React.Component<AutocompleteProps, {}> {

    @action.bound
    renderMenu(items: Array<any>, value:string, style:{top:string, left:string, minWidth:string}, props:AutocompleteProps){

        let innerResult = null
        if (items.length > 0){
            innerResult = <ul style={{...style, ...this.props.menuStyle}} children={items}/>
        }

        return <div className='typeAhead'>
            {   innerResult   }
        </div>
    }

    @action.bound
    renderItem(item:any, isHighlighted:boolean, props:AutocompleteProps, styles?:object ){
        let className = 'u-marginBottom--0'
        if (isHighlighted){
            className += " is-selected"
        }
        return <li  >
            {this.props.renderItem(item, isHighlighted, styles)}
        </li>
    }

    render(){
        let inputProps = this.props.inputProps || {}
        let baseInputClass = "u-marginBottom--0"
        if (inputProps['className'])
            baseInputClass += inputProps['className']


        let renderItem = (item:any, isHighlighted:boolean, styles?:object) => {return this.renderItem(item, isHighlighted, this.props, styles)}
        let defaultRenderMenu = (items:any[],value:string, style:{top:string, left:string, minWidth:string}) => { return this.renderMenu(items, value, style, this.props)}
        let renderMenu = this.props.renderMenu || defaultRenderMenu




        return <Autocomplete renderItem={renderItem}
                             inputProps={inputProps}
                             renderMenu={renderMenu}
                             {...this.props}/>
    }
}

