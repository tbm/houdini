// License: LGPL-3.0-or-later
import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { IntlProvider, addLocaleData} from 'react-intl';
const enLocaleData = require('react-intl/locale-data/en');
const deLocaleData = require('react-intl/locale-data/de');
const I18n = require('i18n')
import {convert} from 'dotize'
import {observable} from 'mobx';
import {ApiManager} from "../../lib/api_manager";
import {APIS} from "../../../api";
import {CSRFInterceptor} from "../../lib/csrf_interceptor";

addLocaleData([...enLocaleData, ...deLocaleData])

interface RootProps
{

}


@observer
export default class Root extends React.Component<RootProps, {}> {

  apiManager: ApiManager

  render() {
    if (!this.apiManager){
      this.apiManager = new ApiManager(APIS, CSRFInterceptor)
    }

    return <IntlProvider locale={I18n.locale} defaultLocale={I18n.defaultLocale} messages={convert(I18n.translations[I18n.locale])}>
       <Provider ApiManager={this.apiManager}>
          {this.props.children}
       </Provider>
      </IntlProvider>
  }
}





