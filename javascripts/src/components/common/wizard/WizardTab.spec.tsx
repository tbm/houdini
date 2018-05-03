// License: LGPL-3.0-or-later
import * as React from 'react';
import 'jest';
import WizardTab from './WizardTab'
import { shallow } from 'enzyme';
import { Tab } from 'react-aria-tabpanel';

describe('WizardTab', () => {
    function runTest(enabled:boolean, active:boolean, widthPercentage:number){
      let result =   shallow(<WizardTab widthPercentage={widthPercentage} label={"A label"} id={"our_id"} tabName={"tab name"} enabled={enabled} active={active}/>)
      
      let ourWrapper = result.find(Tab).first()
      expect(ourWrapper.prop('id')).toEqual("our_id")
      let classes = ourWrapper.prop('className').split(' ')
      expect(classes).toContain("wizard-index-label")

      if (active){
        expect(classes).toContain("is-current")
      }
      else{
        expect(classes).not.toContain("is-current")
      }

      if (enabled){
        expect(classes).toContain("is-accessible")
      }
      else{
        expect(classes).not.toContain("is-accessible")
      }
      expect(ourWrapper.prop('style')).toEqual(`width: ${widthPercentage}%`)
      expect(ourWrapper.prop('tag')).toEqual('span')
      expect(ourWrapper.childAt(0).text()).toEqual('A label')
    }
    

    test('inactive, non-current tab displays', () =>{
      runTest(false, false, 20)
    })

    test('active, non-current tab displays', () =>{
      runTest(false, true, 33.33333)
    })

    test('active, current tab displays', () =>{
      runTest(true, true, 50)
    })
})