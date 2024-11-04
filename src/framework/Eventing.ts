import { CallBack } from "../framework/interfaces/Event.interface"

export class Eventing {
    events : {[key: string] : CallBack[]} = {}

    on = (eventName: string, callback: CallBack) => { // 'click'
        const listeners = this.events[eventName] || []
        listeners.push(callback)
        this.events[eventName] = listeners
    }

    trigger = (eventName: string) => {
        const listeners = this.events[eventName]

        if(!listeners || !listeners.length) return;

        listeners.forEach(callback => {
            callback()
        })
    }
}