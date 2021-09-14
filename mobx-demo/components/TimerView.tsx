import { observer } from 'mobx-react-lite'
import React from 'react'
import { myTimer } from '../src/timer.mobx.CC'
import { tw } from 'twind'

const TimerView: React.FC = observer(() => {
    return (
        <div className={tw`mx-auto`}>
            <span>Seconds passwd: {myTimer.secondsPassed}</span>
        </div>
    )
})
export default TimerView
