// License: LGPL-3.0-or-later

interface FieldHooks{
    sync?(e:Field): any
    onChange?(e:Field): any
    onToggle?(e:Field): any
    onFocus?(e:Field): any
    onBlur?(e:Field): any
    onSubmit?(e:Field): any
    onClear?(e:Field): any
    onReset?(e:Field): any
    onAdd?(e:Field): any
    onDel?(e:Field): any
    onSuccess?(e:Field):any
    onError?(e:Field):any

}

export declare class Field implements  SharedFieldFormMethods, FieldProperties, FieldMethods, FieldHandlers {
    readonly bindings: string;
    readonly changed: boolean;
    readonly default: boolean;
    readonly disabled: boolean;
    readonly error: string;
    readonly extra: any;
    readonly files: string;
    readonly focused: boolean;
    readonly hasError: string & boolean;
    readonly hasIncrementalKeys: boolean;
    readonly hasNestedFields: boolean;
    readonly interceptors: object;
    readonly isDefault: boolean;
    readonly isDirty: boolean;
    readonly isEmpty: boolean;
    readonly isPristine: boolean;
    readonly isValid: boolean;
    readonly id: string
    readonly key: string;
    readonly label: string;
    readonly name: string;
    readonly observers: object;
    readonly options: any;
    readonly path: string;
    readonly placeholder: string;
    readonly related: any;
    readonly rules: any;
    readonly size: number;
    readonly submitting: boolean;
    readonly touched: boolean;
    readonly type: string;
    readonly validateWith: string;
    readonly validating: boolean;
    readonly validators: any;
    readonly value: any;

    readonly state: any;

    $(fieldName: string): Field;

    add(obj: any): any;

    bind(): object;

    check(computed: string, deep?: boolean): boolean;

    clear();

    container(): Form

    del(key: any);

    each(callback: (i: Field) => void);

    focus();

    get();
    get(prop: any);

    has(key: string): boolean;

    hasIncrementalKeys(): boolean;

    hasNestedFields(): boolean;

    intercept(obj: any);

    invalidate(msg: string);
    invalidate(msg?: string);

    map(callback: (i: Field) => void);

    observe(obj: any);

    reset();

    resetValidation();

    select(path: string): Field;

    set(val: any);
    set(prop: string, val: any);

    showErrors(bool: boolean);

    submit(obj?: any);

    update(obj: any): void;

    validate(): Promise<Field>;

    onAdd(e: Field): any;

    onChange(e: Field): any;

    onClear(e: Field): any;

    onDel(e: Field): any;

    onError(e: Field): any;

    onReset(e: Field): any;

    onSubmit(e: any): any;

    onSuccess(e: Field): any;

    onToggle(e: Field): any;

    sync(e: Field): any;

    
   
   
}

interface FormHooks {
    onSubmit?(e:Field): any
    onClear?(e:Field): any
    onReset?(e:Field): any
    onAdd?(e:Field): any
    onDel?(e:Field): any
    onSuccess?(e:Field):any
    onError?(e:Field):any
}

interface FieldHandlers {
    sync?(e:Field):any
    onChange(e:Field):any
    onToggle(e:Field):any
    onSubmit?(e:any): any
    onClear?(e:Field): any
    onReset?(e:Field): any
    onAdd?(e:Field): any
    onDel?(e:Field): any
    onSuccess?(e:Field):any
    onError?(e:Field):any
}

interface FieldDefinition {
    name: string
    label?: string
    value?: any
    default?: any
    placeholder?: any
    disabled?: boolean
    related?: any
    bindings?: any
    type?: string
    options?: any
    extra?: any
    hooks?: FieldHooks
    handlers?: FieldHandlers
    fields?: Array<FieldDefinition>
    rules?: string
    id?:string
}

interface FieldProperties{
    readonly submitting: 	boolean
    readonly validating: 	boolean
    readonly bindings: 	string
    readonly observers: 	object
    readonly interceptors: 	object
    readonly size: number
    readonly path: 	string
    readonly key: 	string
    readonly name: 	string
    readonly type:	string
    readonly label: 	string
    readonly placeholder: 	string
    readonly default: 	boolean	
    readonly disabled: 	boolean
    readonly value: 	any
    readonly focused: 	boolean
    readonly touched: 	boolean
    readonly changed: 	boolean
    readonly related: any
    readonly rules: 	any
    readonly validators: any
    readonly validateWith: 	string
    readonly isValid: 	boolean
    readonly isDirty: 	boolean
    readonly isPristine: 	boolean
    readonly isDefault:	boolean
    readonly isEmpty: 	boolean
    readonly hasError: 	boolean
    readonly error: 	string
    readonly options: 	any
    readonly extra: 	any
    readonly files: 	string
    readonly hasNestedFields: 	boolean
    readonly hasIncrementalKeys: 	boolean
}

interface FieldMethods {
    bind():object
    clear()
    reset()
    focus()
    validate() : Promise<Field>
    invalidate(msg?:string)
    resetValidation()
    showErrors(bool:boolean)
}

interface FieldHooks {
    
}



interface FormInitializer{
    fields?: Array<FieldDefinition>
}

interface initializationDefinition {
    fields?:FieldDefinitions[]
}

export class Form implements SharedFieldFormMethods {

    
    constructor(definition:initializationDefinition, options?:any)
    plugins(): void
    setup(): any
    onInit(): void
    onSuccess(form:Form)
    onError(form:Form)
    onChange(values:any)
    onSubmit(...args)

    $(fieldName: string): Field;

    add(obj: any): any;

    check(computed: string, deep?: boolean): boolean;

    del(key: any);

    each(callback: (i: Field) => void);

    get();
    get(prop: any);

    has(key: string): boolean;

    hasIncrementalKeys(): boolean;

    hasNestedFields(): boolean;

    intercept(obj: any);

    invalidate(msg: string);

    map(callback: (i: Field) => void);

    observe(obj: any);

    select(path: string): Field;

    set(val: any);
    set(prop: string, val: any);

    submit(obj?: any);

    update(obj: any): void;

    readonly submitting: boolean;
    
}



interface SharedFieldFormMethods {
    update(obj:any): void
    select(path:string): 	Field
    submit(obj:any)
    check(computed:string,deep?:boolean): boolean
    get()
    get(prop:any)
    set(val:any)
    set(obj:any)
    set(prop:string, val:any) 
    has(key:string):boolean
    map(callback:(i:Field) => void)
    each(callback:(i:Field) => void)
    add(obj:any):any
    del(key:any)
    observe(obj:any)
    intercept(obj:any)
    hasNestedFields(): boolean
    hasIncrementalKeys() : boolean
    invalidate(msg:string)
    $(fieldName:string) : Field
}