// License: LGPL-3.0-or-later
import * as React from 'react';

import {observer, inject} from 'mobx-react'
import NonprofitInfoPanel from './NonprofitInfoPanel'
import {action,  observable, runInAction, computed} from 'mobx';
import {Wizard} from '../common/wizard/Wizard'

import {Form} from 'mobx-react-form';
import {FormattedMessage, injectIntl, InjectedIntlProps} from 'react-intl';
import {WizardState} from "../common/wizard/wizard_state";
import UserInfoPanel from "./UserInfoPanel";
import {
  NonprofitApi,
  PostNonprofit,
  ValidationErrorsException
} from "../../../api";

import _ = require('lodash');

import {initializationDefinition} from "../../../../types/mobx-react-form";
import {ApiManager} from "../../lib/api_manager";

const validatorjs = require('validatorjs');

export interface RegistrationWizardProps {
  ApiManager?: ApiManager
}


interface PathToFormField {
  [props: string]: string
}

type FormFieldToPath = PathToFormField

class StaticFormToErrorAndBackConverter<T> {

  pathToForm: PathToFormField
  formToPath: FormFieldToPath


  constructor(pathToForm: PathToFormField) {
    this.pathToForm = pathToForm
    this.formToPath = _.invert(pathToForm)
  }

  convertFormToObject(form: Form): T {
    let output = {}
    for (let pathToFormKey in this.pathToForm) {
      if (this.pathToForm.hasOwnProperty(pathToFormKey)) {
        let formPath = this.pathToForm[pathToFormKey]
        _.set(output, pathToFormKey, form.$(formPath).value)
      }

    }

    return output as T

  }

  @action.bound
  convertErrorToForm(errorException: ValidationErrorsException, form: Form): void {
    runInAction(() => {
      _.forEach(errorException.item.errors, (error) => {
        let message = error.messages.join(", ")
        _.forEach(error.params, (p) => {
          if (this.pathToForm[p])
            form.$(this.pathToForm[p]).invalidate(message)
          else {
            console.warn(`We couldn't find a form element for path: "${p}"`)
          }

        })

      })
    })
  }
}


export class RegistrationPageForm extends Form {
  converter: StaticFormToErrorAndBackConverter<PostNonprofit>

  constructor(definition: initializationDefinition, options?: any) {
    super(definition, options)
    this.converter = new StaticFormToErrorAndBackConverter<PostNonprofit>(this.inputToForm)
  }

  nonprofitApi: NonprofitApi

  options() {
    return {
      validateOnInit: true,
      validateOnChange: true
    }
  }

  plugins() {
    return {dvr: validatorjs};
  }

  inputToForm = {
    'nonprofit[name]': 'nonprofitTab.organization_name',
    'nonprofit[url]': 'nonprofitTab.website',
    'nonprofit[email]': 'nonprofitTab.org_email',
    'nonprofit[phone]': 'nonprofitTab.org_phone',
    'nonprofit[city]': 'nonprofitTab.city',
    'nonprofit[state_code]': 'nonprofitTab.state',
    'nonprofit[zip_code]': 'nonprofitTab.zip',
    'user[name]': 'userTab.name',
    'user[email]': 'userTab.email',
    'user[password]': 'userTab.password',
    'user[password_confirmation]': 'userTab.password_confirmation'
  }

  hooks() {
    return {
      onSuccess: async (f: Form) => {
        let input = this.converter.convertFormToObject(f)


        try {
          let r = await this.nonprofitApi.postNonprofit(input)
        }
        catch (e) {
          console.log(e)
          if (e instanceof ValidationErrorsException) {
            this.converter.convertErrorToForm(e, f)
          }
        }
      }
    }
  }

}

class RegistrationWizardState extends WizardState {
  @action.bound
  createForm(i: any): Form {
    return new RegistrationPageForm(i)
  }


}

@inject('ApiManager')
@observer
class RegistrationWizard extends React.Component<RegistrationWizardProps, {}> {

  constructor(props: RegistrationWizardProps) {
    super(props)

    this.setRegistrationWizardState()
    this.createForm()
  }


  @observable registrationWizardState: RegistrationWizardState

  @computed
  get form(): RegistrationPageForm {
    return (this.registrationWizardState && this.registrationWizardState.form)as RegistrationPageForm
  }


  @action.bound
  setRegistrationWizardState() {
    this.registrationWizardState = new RegistrationWizardState()
  }


  @action.bound
  createForm() {
    this.registrationWizardState.addTab("nonprofitTab", 'registration.wizard.tabs.nonprofit', {
      fields:
        [
          {
            name: 'organization_name',
            label: 'registration.wizard.nonprofit.name',
            type: 'text',
            rules: 'required'
          },
          {
            name: 'website',
            label: 'registration.wizard.nonprofit.website',
            rules: 'url'
          },
          {
            name: 'org_email',
            label: 'registration.wizard.nonprofit.email',
            rules: 'email'
          },
          {
            name: 'org_phone',
            label: 'registration.wizard.nonprofit.phone',
            rules: 'phone'
          },
          {
            name: 'city',
            label: 'registration.wizard.nonprofit.city',
            rules: 'required'
          },
          {
            name: 'state',
            label: 'registration.wizard.nonprofit.state',
            rules: 'required',
            type: 'text'

          },
          {
            name: 'zip',
            label: 'registration.wizard.nonprofit.zip',
            rules: 'required'
          }


        ],
      hooks: {
        onError: (f: any) => {
          console.log(f)
        },
        onSuccess: (f: any) => {
          console.log(f)
        }

      }
    })

    this.registrationWizardState.addTab("userTab", 'registration.wizard.tabs.contact', {
      fields:
        [
          {
            name: 'name',
            label: 'registration.wizard.contact.name',
            rules: 'required'
          },
          {
            name: 'email',
            label: 'registration.wizard.contact.email',
            rules: 'required|email'
          },
          {
            name: 'password',
            label: 'registration.wizard.contact.password',
            type: 'password',
            rules: 'required',
            related: ['userTab.password_confirmation']
          },
          {
            name: 'password_confirmation',
            label: 'registration.wizard.contact.password_confirmation',
            type: 'password',
            rules: 'same:userTab.password'
          }
        ],
      hooks: {
        onError: (f: any) => {
          console.log(f)
        },
        onSuccess: (f: any) => {
          console.log(f)
        }

      }
    })

    this.registrationWizardState.initialize()
    console.log("inited")
  }


  render() {
    if (!this.form.nonprofitApi) {
      this.form.nonprofitApi = this.props.ApiManager.get(NonprofitApi)
    }
    return <Wizard wizardState={this.registrationWizardState} disableTabs={this.form.submitting}>
      <NonprofitInfoPanel tabName={"nonprofitTab"}
                          wizardState={this.registrationWizardState} buttonText="registration.wizard.next"/>

      <UserInfoPanel tabName={"userTab"}
                     wizardState={this.registrationWizardState} buttonText="registration.wizard.save_and_finish"/>


    </Wizard>
  }
}

export default RegistrationWizard