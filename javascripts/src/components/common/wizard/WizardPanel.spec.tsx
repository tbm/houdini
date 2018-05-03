// License: LGPL-3.0-or-later
import * as React from 'react';
import 'jest';

import * as Component from './WizardPanel'
import { InnerWizardState } from './inner_wizard_state';
import {Form, Field} from 'mobx-react-form';
import { shallow, render } from 'enzyme';
import {TabPanel, Wrapper} from 'react-aria-tabpanel'
import toJson from 'enzyme-to-json';
const TestRenderer = require('react-test-renderer')

describe('WizardPanel', () => {
    test('shallow render', () => {
        let fields = [{name: 'fun', id: 'fun', label: 'alsofun'}]
        const form = new Form({fields});
        
        const ws = new InnerWizardState()
        
        ws.addTab('something', 'something lable')
        const tree = shallow(<Component.WizardPanel tabId="something"
        wizardState={ws} form={form} subForm={form.$('fun')}/>)
        
        
        expect(toJson(tree)).toMatchSnapshot()
    })

    test('deep render', () =>{
        let fields = [{name: 'fun', id: 'fun', label: 'alsofun'}]
        const form = new Form({fields});
        
        const ws = new InnerWizardState()
        
        ws.addTab('something', 'something lable')
        const tree = TestRenderer.create(<Wrapper onChange={ws.handleTabChange}><Component.WizardPanel tabId="something"
        wizardState={ws} form={form} subForm={form.$('fun')}/></Wrapper>)
        
        
        expect(tree.toJSON()).toMatchSnapshot()
    })
})