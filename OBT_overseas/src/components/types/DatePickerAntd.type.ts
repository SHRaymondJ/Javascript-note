import { Moment } from 'moment'

export interface RangePickerAntdProps {
    onChange: Function
    placeholder: [string, string]
    defaultValue?: [EventValue<Moment>, EventValue<Moment>]
    className?: string
    allowClear: boolean
}
