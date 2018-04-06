// License: LGPL-3.0-or-later
import * as React from 'react';
import * as Api from '../../../api'
import * as $ from 'jquery'
import {ValidationErrorException} from "../../../api";
export interface RegistrationPageProps
{

}




var np = new Api.NonprofitApi()



export default class RegistrationPage extends React.Component<RegistrationPageProps, {}> {

  async home(){
      try {
          var result = await np.postNonprofitRegister(null, null, null, null, null, null, null, null, null, null)


      }
      catch(e){
          if (e instanceof Api.ValidationErrorException)
          {

          }
      }

  }

  render() {
     return <div></div>;
  }
}

