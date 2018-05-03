// License: LGPL-3.0-or-later
import { observable, action, computed,toJS, runInAction } from "mobx";

import {InnerWizardState, TabInfo, TabInfoProps} from "./inner_wizard_state";

import { Field, Form, FieldDefinition } from "mobx-react-form";
import _ = require("lodash");
import {TabManager} from "./manager"
import {FieldHandlers, FieldHooks} from "../../../../../types/mobx-react-form";

interface SubFormDefinition{
    related?: string[]
    bindings?: any
    options?: any
    extra?: any
    hooks?: FieldHooks
    handlers?: FieldHandlers
    fields?: Array<FieldDefinition>


}

export abstract class WizardState  {

    @observable panels = new Array<WizardTabPanelState>()
    @observable form:Form

    @observable manager:TabManager

    @action.bound
    createInnerWizardState(){
       // this.innerWizardState = new InnerWizardState();
    }

    abstract createForm(i:any):Form;

    @action.bound
    addTab(tabName:string, label:string, tabFieldDefinition:SubFormDefinition) : WizardTabPanelState {

        var newTab = new WizardTabPanelState()
        newTab.id = _.uniqueId('tab')
        newTab.tabName  = tabName
        newTab.label = label
        if (this.panels.length == 0){
            newTab.active = true
        }



        newTab.parent = this
        newTab.panelFormDefinition = tabFieldDefinition as FieldDefinition
        this.panels.push(newTab)

        if (!this.manager){
            this.manager = new TabManager({onChange: this.handleTabChange, letterNavigation: true, activeTabId: this.activeTab.id,
                canChangeTo:this.canChangeTo})
        }


        return newTab;
    }

    @action.bound
    initialize(): void
    {
        if (this.panels.length > 0){
            //let's create the forms
            let lastIndex = this.panels.length
            for(let i = 0; i < lastIndex; i++){
                let ourPanel = this.panels[i]

                ourPanel.originalOnSuccessHook = toJS(ourPanel.panelFormDefinition.hooks['onSuccess'])

                ourPanel.panelFormDefinition.hooks['onSuccess'] = this.onSuccessForPanel

                /// this won't work because the hook is already replaced
                ourPanel.originalOnErrorHook = ourPanel.panelFormDefinition.hooks['onError']
                ourPanel.panelFormDefinition.hooks['onError'] = this.onErrorForPanel

                ourPanel.panelFormDefinition.name = ourPanel.tabName
            }

            //we need to change these back to JS objects because they're likely observable and fieldDefinitions
            // can't handle that
            let fieldDefinition = toJS(this.panels.map((i) => toJS(i.panelFormDefinition)))
            this.form = this.createForm({fields:fieldDefinition})

            _.forEach(this.panels, (i) =>{
                //add the form to each panel
                i.parentForm = this.form
                i.form = this.form.$(i.tabName)
            })


        }


    }

    @action.bound
    getTabByName(tabName:string):WizardTabPanelState{
        return _.find(this.panels, (i) => i.tabName === tabName)
    }

    @computed
    get tabsByName(): {[name:string]:WizardTabPanelState}{
        return  _.fromPairs(this.panels.map((i) => [i.tabName, i]));
    }



    @action.bound
    handleTabChange(tabId:string):WizardTabPanelState{
        let self = this

        let tabInfo = _.find(self.panels, (i) => i.id == tabId)
        if (tabInfo && tabInfo.enabled) {
            _.forEach(_.without(self.panels, tabInfo), (o) => runInAction(() => o.active = false))
            tabInfo.active = true
            return tabInfo
        }
        return null
    }

    @action.bound
    canChangeTo(tabId:string):boolean {

        let tab = _.find(this.panels, (i) => i.id == tabId)
        return tab && tab.enabled

    }

    @action.bound
    moveToNextTab():WizardTabPanelState{
        var self = this
        var indexOfOurTab = _.findIndex(self.panels, (o) => o.tabName === self.activeTab.tabName)
        var nextTab = indexOfOurTab + 1

        if ( nextTab < self.panels.length)
        {
            self.manager.activateTab(self.panels[nextTab].id)
            return self.panels[nextTab]
        }
        return null;
    }

    @action.bound
    onSuccessForPanel(a:Field):void{

        if (this.activeTab.originalOnSuccessHook) {
            this.activeTab.originalOnSuccessHook(a)
        }

        if (a.submitting) {
            if (this.nextTab)
                this.moveToNextTab()
            else
                this.form.submit()
        }
    }


    @action.bound
    onErrorForPanel(a:Field):any{
        if (this.activeTab.originalOnErrorHook){
            this.activeTab.originalOnErrorHook(a)
        }
    }


    @computed
    get activeTab():WizardTabPanelState{
        return _.find(this.panels, (i) => i.active)
    }

    @computed
    get nextTab(): WizardTabPanelState{
        return this.activeTab.next
    }

    @computed
    get previousTab(): WizardTabPanelState{
        return this.activeTab.previous
    }
}

export class WizardTabPanelState {
    @observable parent: WizardState
    
    @observable parentForm: Form
    
    @observable form: Field

    @observable active:boolean
    @observable id: string
    @observable tabName: string
    @observable label: string

    @observable originalOnSuccessHook:Function
    @observable originalOnErrorHook:Function

    panelFormDefinition: FieldDefinition



    @computed
    get enabled(){

        var previous = this.previous
        var next = this.next

        return previous === null || previous.form.isValid;
    }


    @computed
    get previous():WizardTabPanelState {
        let index = _.findIndex(this.parent.panels, (i) => i == this)
        if (index === null){
            // return null but we have a problem here
            return null
        }
        if (index  === 0){
            // there is no previous one because we're first!
            return null;
        }

        return this.parent.panels[index-1]
    }

    @computed
    get next(): WizardTabPanelState {
        let index = _.findIndex(this.parent.panels, (i) => i == this)
        let panelLength = this.parent.panels.length
        if (index === null) {
            // return null but we have a problem here
            return null
        }

        if (index+1 >= panelLength  ){
            //we have no advanced
            return null;
        }

        return this.parent.panels[index]
    }


}