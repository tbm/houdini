// License: LGPL-3.0-or-later
import * as React from 'react';

export interface StandardFieldComponentProps
{
    inError:boolean
    error?:string
    children?:React.ReactNode
    [additional_properties:string]: any
}

export default class StandardFieldComponent extends React.Component<StandardFieldComponentProps, {}> {
    constructor(props:StandardFieldComponentProps){
        super(props)
    }
    renderChildren(childStyle:React.CSSProperties){
        return React.Children.map(this.props.children, child  => {
            return React.cloneElement(child as React.ReactElement<any>,  {
              style: childStyle
            })
        })
    }
  render() {
    let errorState = this.props.inError ? 'invalid' : 'valid'
    let errorMessage = this.props.inError ? this.props.error : undefined
    let styles = this.props.inError ? {borderColor: "#FF4F4F"} : {}
    let errorDivStyle = this.props.inError ? {display:"block"} : {display:"none"}
    let errorDiv = <div style={errorDivStyle} role="alert">{errorMessage}</div>

    return <>
      <div>
        {this.renderChildren(styles)}
        {errorDiv}
      </div>

      </>
  }
}

