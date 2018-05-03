// License: LGPL-3.0-or-later
import * as React from 'react';
import RegistrationWizard from "./RegistrationWizard";

import {configure, observable, action} from 'mobx'
import {observer} from 'mobx-react';
import {InjectedIntlProps, injectIntl, InjectedIntl, FormattedMessage} from 'react-intl';


configure({enforceActions: 'strict', computedRequiresReaction: true})

export interface RegistrationPageProps
{

}

class RegistrationPage extends React.Component<RegistrationPageProps & InjectedIntlProps, {}> {



  render() {
   return <div className="container"><h1><FormattedMessage id="registration.get_started.header"/></h1><p><FormattedMessage id="registration.get_started.description"/></p><RegistrationWizard/></div>

  }
}

export default injectIntl(observer(RegistrationPage))

