// License: LGPL-3.0-or-later
import * as React from 'react';
import {observer} from "mobx-react";
import * as _ from 'lodash'


export const TwoColumnFields = observer((props:{children:React.ReactElement<any>[]}) => {
    return <div className="clearfix">
        {
            props.children.map((i:React.ReactElement<any>) => {
                let className = "col-left-6"
                if (_.last(props.children) !== i){
                    className += " u-paddingRight--10"
                }
                if (i.props['className']){
                    className += i.props['className']
                }

                return React.cloneElement(i, {wrapperClassName: className})
        })}
    </div>
})

export const ThreeColumnFields = observer((props:{children:React.ReactElement<any>[]}) => {
    return <div className="clearfix">
        {
            props.children.map((i:React.ReactElement<any>) => {
                let className = "col-left-4"
                if (_.last(props.children) !== i){
                    className += " u-paddingRight--10"
                }
                if (i.props['className']){
                    className += i.props['className']
                }

                return React.cloneElement(i, {wrapperClassName: className})
            })}
    </div>
})