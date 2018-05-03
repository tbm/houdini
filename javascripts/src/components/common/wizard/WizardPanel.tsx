// License: LGPL-3.0-or-later
import * as React from 'react';
import { TabPanel } from "react-aria-tabpanel";
import { InnerWizardState } from "./inner_wizard_state";
import {  observer, Provider } from 'mobx-react'
import { Form, Field } from 'mobx-react-form';
import {WizardState} from './wizard_state';
import {computed} from 'mobx';

export interface WizardPanelProps {
    tabName: string

    wizardState: WizardState
    form:Field

    [props:string]:any
}

@observer
export class WizardPanel extends React.Component<WizardPanelProps, {}> {
    @computed
    get tab(){
        return this.props.wizardState.tabsByName[this.props.tabName]
    }
    @computed
    get isActive(){
        return this.tab.active
    }
    render() {

        let props = this.props.props ? this.props.props : {}
        let style = this.isActive ? {display: "block"} : {display: "none"}
        return <TabPanel tabId={this.tab.id} active={this.isActive}
        {...props} className="wizard-step" style={style}>
                <fieldset>

                        {this.props.children}

                </fieldset>
        </TabPanel>
    }
}

