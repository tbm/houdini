// License: LGPL-3.0-or-later
import * as React from 'react';

import LabeledFieldComponent from "../common/LabeledFieldComponent";
import {WizardPanel} from "../common/wizard/WizardPanel";

import {Form, Field, FieldHooks} from 'mobx-react-form'
import * as validatorjs from 'validatorjs'
import { inject, observer } from 'mobx-react';
import { InnerWizardState } from '../common/wizard/inner_wizard_state';
import { action, computed } from 'mobx';
import {WizardState} from "../common/wizard/wizard_state";
import {InjectedIntlProps, injectIntl, InjectedIntl} from 'react-intl';
import {ThreeColumnFields, TwoColumnFields} from "../common/layout";


import Autocomplete =  require('react-autocomplete')
import AutocompleteList from "../common/AutocompleteList";
import {BasicField} from "../common/fields";

export interface NonprofitInfoPanelProps
{
    tabName:string
    wizardState: WizardState
    buttonText:string

}



class NonprofitInfoPanel extends React.Component<NonprofitInfoPanelProps & InjectedIntlProps, {}> {



  @computed
  get form():Field{
      return this.props.wizardState.tabsByName[this.props.tabName].form
  }
  @computed
  get submit(){
      return this.form.onSubmit
  }

  render() {
      var self = this
      return <WizardPanel  tabName={this.props.tabName}
       wizardState={this.props.wizardState} key={this.props.tabName} form={this.form}
      >

          <BasicField field={this.form.$("organization_name")}/>
          <BasicField field={this.form.$('website')}/>
            <TwoColumnFields>
                <BasicField field={this.form.$('org_email')}/>
                <BasicField field={this.form.$('org_phone')}/>
            </TwoColumnFields>

            <ThreeColumnFields>
                <BasicField field={this.form.$('city')}/>
                <BasicField field={this.form.$('state')}/>
                <BasicField field={this.form.$('zip')}/>
            </ThreeColumnFields>
          <button onClick={this.submit} className="button" disabled={!this.form.isValid}>
            {this.props.intl.formatMessage({id: this.props.buttonText})}</button>
      </WizardPanel>
      
  }
}

export default injectIntl(observer(NonprofitInfoPanel))
