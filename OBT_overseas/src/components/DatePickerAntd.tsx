import React from 'react'
import { DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import 'antd/dist/antd.css'
import { RangePickerAntdProps } from './DatePickerAntd.type'

const { RangePicker } = DatePicker

function disabledDate(current: Moment) {
    // 禁止选择当天以前和一年以后的日子
    return (
        current &&
        (current < moment().endOf('day') ||
            current > moment().add(1, 'y').endOf('day'))
    )
}

export const RangePickerAntd = ({
    placeholder,
    onChange,
    defaultValue,
    className,
    allowClear = true,
}: RangePickerAntdProps) => {
    return (
        <div>
            <RangePicker
                defaultValue={defaultValue}
                disabledDate={disabledDate}
                className={className}
                placeholder={placeholder}
                onChange={(dates) => onChange(dates)}
                allowClear={allowClear}
            />
        </div>
    )
}
