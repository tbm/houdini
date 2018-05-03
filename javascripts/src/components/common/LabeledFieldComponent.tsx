// License: LGPL-3.0-or-later
import * as React from 'react';
import StandardFieldComponent from "./StandardFieldComponent";
import { observer } from 'mobx-react';
import {Field} from "../../../../types/mobx-react-form";
import {injectIntl, InjectedIntl} from 'react-intl';


export interface LabeledFieldComponentProps
{
    inputId: string
    labelText: string
    inError:boolean
    error?:string
    children?:React.ReactNode
    className?:string
    [additionalProperties:string] : any
}

@observer
export default class LabeledFieldComponent extends React.Component<LabeledFieldComponentProps, {}> {
  render() {
     return <fieldset className={this.props.className} {...this.props.additionalProperties}><label htmlFor={this.props.inputId}>{this.props.labelText}</label>
         <StandardFieldComponent inError={this.props.inError && this.props.error !== null && this.props.error !== ""} error={this.props.error} >{this.props.children}</StandardFieldComponent>
     </fieldset>;
  }
}


