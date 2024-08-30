export interface Root {
    name: string;
    type?: string | any;
    classes?: string;
    label?: any;
    placeholder?: string | string[];
    description?: string;
    rule?: Rule;
    select_options?: SelectOption[];
    multiple?: boolean;
    maxlength?: string;
    separator?: string;
    autosize?: boolean | object;
    show_feedback?: boolean;
}
export interface Rule {
    type?: string;
    required?: boolean;
    message?: string | Function;
    trigger?: string[];
    min?: number;
    max?: number;
    pattern?: RegExp;
    validator?: Function;
}
export interface SelectOption {
    label?: string;
    value?: string;
    key?: string;
}
