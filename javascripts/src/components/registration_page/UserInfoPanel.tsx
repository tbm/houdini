// License: LGPL-3.0-or-later
import * as React from 'react';
import {observer} from 'mobx-react';
import {InjectedIntlProps, injectIntl} from 'react-intl';
import {Field} from "../../../../types/mobx-react-form";
import {computed} from 'mobx';
import {WizardPanel} from "../common/wizard/WizardPanel";
import {ThreeColumnFields, TwoColumnFields} from "../common/layout";
import {BasicField} from "../common/fields";
import {WizardState} from "../common/wizard/wizard_state";

export interface UserInfoPanelProps {
  tabName: string
  wizardState: WizardState
  buttonText: string
}

class UserInfoPanel extends React.Component<UserInfoPanelProps & InjectedIntlProps, {}> {
  @computed
  get form(): Field {
    return this.props.wizardState.tabsByName[this.props.tabName].form
  }

  @computed
  get submit() {
    return this.form.onSubmit
  }

  render() {
    let parentForm = this.form.container() || this.form.state.form
    let submitting = parentForm.submitting

    return <WizardPanel tabName={this.props.tabName}
                        wizardState={this.props.wizardState} key={this.props.tabName} form={this.form}
    >

      <TwoColumnFields>
        <BasicField field={this.form.$("name")}/>
        <BasicField field={this.form.$('email')}/>
      </TwoColumnFields>

      <BasicField field={this.form.$('password')}/>
      <BasicField field={this.form.$('password_confirmation')}/>


      <button onClick={this.submit} className="button" disabled={!this.form.isValid || submitting}>
        {this.props.intl.formatMessage({id: this.props.buttonText})}
      </button>
    </WizardPanel>;
  }
}

export default injectIntl(observer(UserInfoPanel))



