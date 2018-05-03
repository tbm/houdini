// License: LGPL-3.0-or-later
import { InnerWizardState } from "./inner_wizard_state";
import 'jest';

describe('WizardState', () => {
    describe('empty Wizard state', () => {
        var wizard: InnerWizardState = null
        beforeEach(() => wizard = new InnerWizardState())

        test('adds tab properly', () =>{
            wizard.addTab("tab1", "label1")
            wizard.addTab("tab2", "label2")
            expect(wizard.tabs.length).toEqual(2)
            expect(wizard.tabs[0].tabName).toEqual("tab1")
            expect(wizard.tabs[0].enabled).toEqual(true)
            expect(wizard.tabs[0].active).toEqual(true)
            expect(wizard.tabs[0].label).toEqual("label1")

            expect(wizard.tabs[1].tabName).toEqual("tab2")
            expect(wizard.tabs[1].enabled).toBeFalsy()
            expect(wizard.tabs[1].active).toBeFalsy()
            expect(wizard.tabs[1].label).toEqual("label2")
        })

        test('updates validation State', () =>{
            expect(() => {wizard.updateValidationState('fake name', true)}).not.toThrow()
        })

        test('handles tab change', () => {
            expect(() => wizard.handleTabChange('baobhaob')).not.toThrow()
        })

        test('handles nextTab', () => {
            expect(() => wizard.nextTab()).not.toThrow()
        })
    })

    describe('nonempty Wizard state', () => {
        var wizard: InnerWizardState = null
        beforeEach(() => {wizard = new InnerWizardState(); wizard.addTab("tab1", "label 1");
        wizard.addTab("tab2", "label 2")})


        test('updates validation State', () =>{
            wizard.addTab("tab3", "label 3")
            wizard.updateValidationState('tab3', true)
            expect(wizard.tabs[0].enabled).toEqual(true)
            expect(wizard.tabs[1].enabled).toEqual(true)
            expect(wizard.tabs[2].enabled).toEqual(true)
            

            wizard.updateValidationState('tab2', false)
            expect(wizard.tabs[0].enabled).toEqual(true)
            expect(wizard.tabs[1].enabled).toEqual(false)
            expect(wizard.tabs[2].enabled).toEqual(false)
        })

        test('handles tab change, new tab is disabled', () => {
            wizard.handleTabChange('tab2')
            expect(wizard.tabs[0].active).toEqual(true)
            expect(wizard.tabs[1].active).toBeFalsy()
        })

        test('handles tab change', () => {
            wizard.updateValidationState('tab2', true)
            wizard.handleTabChange('tab2')
            expect(wizard.tabs[0].active).toEqual(false)
            expect(wizard.tabs[1].active).toEqual(true)
        })

        test('handles nextTab next tab is disabled', () => {
            wizard.nextTab()
            expect(wizard.tabs[0].active).toEqual(true)
            expect(wizard.tabs[1].active).toBeFalsy()

        })

        test('handles nextTab', () => {
            wizard.updateValidationState('tab2', true)
            wizard.nextTab()
            expect(wizard.tabs[0].active).toEqual(false)
            expect(wizard.tabs[1].active).toEqual(true)
        })

    })
    
})