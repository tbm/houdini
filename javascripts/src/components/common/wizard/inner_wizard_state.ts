// License: LGPL-3.0-or-later
import { observable, action, computed, runInAction } from "mobx";
import _ = require("lodash");

export interface TabInfoProps {
    readonly id: string
    
    /**
     * A identifier for the this tab.in this wizard. Only has to be unique
     * within this wizard instance
     * @type string
     * @memberof TabInfo
     */
    readonly tabName: string

    readonly label:string
    
    /**
     * Whether the tab is enabled for selection or not. Used mostly
     * for preventing moving to a new tab except when the previous ones are
     * validated
     * @type boolean
     * @memberof TabInfo
     */
    readonly enabled:boolean

    /**
     * Whether this tab is active, i.e. shown.
     * @type boolean
     * @memberof TabInfo
     */
    readonly active:boolean
}

export class TabInfo implements TabInfoProps{
    constructor(id:string,tabName:string,  label:string, enabled:boolean=false, active:boolean=false){
        runInAction(() =>{
        this.id = id
        this.tabName = tabName
        this.enabled = enabled
        this.active = active
        this.label = label
    })
    }
    /**
     * Represents the document-unique id of the tab.
     * @type string
     * @memberof TabInfo
     */
    @observable id: string
    
    /**
     * A identifier for the this tab.in this wizard. Only has to be unique
     * within this wizard instance
     * @type string
     * @memberof TabInfo
     */
    @observable tabName: string

    @observable label:string
    
    /**
     * Whether the tab is enabled for selection or not. Used mostly
     * for preventing moving to a new tab except when the previous ones are
     * validated
     * @type boolean
     * @memberof TabInfo
     */
    @observable enabled:boolean

    /**
     * Whether this tab is active, i.e. shown.
     * @type boolean
     * @memberof TabInfo
     */
    @observable active:boolean
    
    
}

/**
 * A MobX managed state for handling all the state of the Wizard
 * @export
 * @class WizardState
 */
export class InnerWizardState {

    @observable tabs : Array<TabInfo> = new Array<TabInfo>()

    
    /**
     * Add a new tab. If it's the first, mark it as active and enabled.
     * @param  {string} tabName the name of the tab to add
     * @return {TabInfoProps} the tab added
     * @memberof WizardState
     */
    @action.bound
    addTab(tabName:string, label:string) : TabInfoProps {
        var self = this
        var newTab = new TabInfo(_.uniqueId('tab'), tabName, label)
        if (self.tabs.length == 0){
            newTab.enabled = true
            newTab.active = true
        }
        
        self.tabs.push(newTab)
        return newTab
    }

    /**
     * Set the enabled status of a tab. If a tab is disabled, all of the tabs
     * after it are as well. If a tab is enabled, all of the tabs before it are
     * as well.
     * @param  {string|TabInfoProps} tab the tabname or reference to the tab 
     * you want to change the validation state for
     * @param  {boolean} enabled Whether to enabled or disable the tab
     * @return {void}
     * @memberof WizardState
     */
    @action.bound
    updateValidationState(tab:string|TabInfoProps, enabled: boolean)
    {
        let self = this
        let indexOfOurState = -1
        if (typeof tab === "string")
        {
            indexOfOurState = _.findIndex(self.tabs, (o) => o.tabName == tab)
        }
        else {
            indexOfOurState = _.findIndex(self.tabs, (o) => o == tab)
        }
        if (indexOfOurState != -1) {
            if (enabled){
                _.slice(self.tabs, 0, indexOfOurState+1).forEach((o) => o.enabled = true)
                _.slice(self.tabs, indexOfOurState+1).forEach((o) => o.enabled = false)
            }
            else
            {
                _.slice(self.tabs, 0, indexOfOurState).forEach((o) => o.enabled = true)
                _.slice(self.tabs, indexOfOurState).forEach((o) => o.enabled = false)
            }

        }
    }

    @action.bound
    getTabByName(tabName:string):TabInfoProps{
        return _.find(this.tabs, (i) => i.tabName === tabName)
    }
    
    @action.bound
    private getTabInfo(tabId:string|TabInfoProps): TabInfo {
        if (typeof tabId === 'string'){
            return _.find(this.tabs, (i) => i.id === tabId)
        }
        else{
            return _.find(this.tabs, (i) => i == tabId)
        }

        
    }

    @action.bound
    peekNextTab(tab?:TabInfo):TabInfo{
        if (!tab)
        {
            tab = this.activeTab
        }
        if (tab)
        {
            let i = _.findIndex(this.tabs, tab)
            if (i < 0)
            {
                return null
            }
            let nextTabIndex =i +1
            if ( nextTabIndex >= this.tabs.length)
            {
                return null
            }
            return this.tabs[nextTabIndex]
        }

        return null
    }

    /**
     * Set a new tab as active. If the tab to be made active is disabled, 
     * we do nothing.
     * @param  {string|TabInfo} tabNameId the tab to set as active
     * @return {TabInfoProps} the tab you made active or null if the tab wasn't
     * found or is disabled
     * @memberof WizardState
     */
    @action.bound
    handleTabChange(tabId:string|TabInfoProps):TabInfoProps {
        let self = this
        
        let tabInfo = self.getTabInfo(tabId)
        if (tabInfo && tabInfo.enabled) {
            _.forEach(_.without(self.tabs, tabInfo), (o) => runInAction(() => o.active = false))
            tabInfo.active = true
            return tabInfo
        }
        return null
    }

    // /**
    //  * Set the next tab as active. If the next tab is disabled, does nothing.
    //  * @return {TabInfoProps} that tab you've now moved to or null if none exists
    //  * @memberof WizardState
    //  */
    // @action
    // nextTab() : TabInfoProps
    // {
    //
    // }

    /**
     * Get the currently active tab
     * @readonly
     * @type TabInfo tab info for the currently active tab
     * @memberof WizardState
     */
    @computed
    get activeTab():TabInfoProps {

        return _.find(this.tabs, (o) => o.active )
    }
}