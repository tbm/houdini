// License: LGPL-3.0-or-later
import * as React from 'react';
import RAT = require('react-aria-tabpanel')
import {inject, observer, Provider} from "mobx-react"
import { Form } from 'mobx-react-form';
import { observable, action, computed, runInAction, toJS } from 'mobx';
import * as _ from 'lodash';

import WizardTabList from "./WizardTabList";
import {WizardState} from './wizard_state';
import {ManagedWrapper} from "./ManagedWrapper";

export interface WizardProps
{
    wizardState: WizardState
    disableTabs: boolean
}


@observer
export class Wizard extends React.Component<WizardProps> {

  render() {
     return <ManagedWrapper onChange={this.props.wizardState.handleTabChange}
                         letterNavigation={true}
                         activeTabId={this.props.wizardState.activeTab.id}
                         tag="section"
                         style={{display: 'table'}} className="wizard-steps" manager={this.props.wizardState.manager}>
         <WizardTabList wizardState={this.props.wizardState} disableTabs={this.props.disableTabs}>
         </WizardTabList>
         <div className="modal-body">

            <form onSubmit={this.props.wizardState.form.onSubmit} >

                        {this.props.children}

            </form>

         </div>
         
     </ManagedWrapper>;
  }
}

