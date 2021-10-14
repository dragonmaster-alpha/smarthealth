import {autorun, when} from 'mobx';

/**
 * Management of objects that need to be closed when a React component unmounts.
 *
 * Call onUnmount() from componentWillUnmount()
 *
 * @author Larry 26/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class AutoCloser
{
    private disposers: (() => void)[] = [];

    private intervalTimers = [];

    private listeners: { element: Window | Document | Element, type: string, method: EventListener }[] = [];

    public addEventListener(element: Window | Document | Element, type: string, method: EventListener)
    {
        element.addEventListener(type, method);
        this.listeners.push({ element, type, method });
    }

    public createMobXAutorun(autorunFunction: () => void)
    {
        this.disposers.push(autorun(autorunFunction));
    }

    public createMobXWhen(predicate: () => boolean, effect: () => void)
    {
        this.disposers.push(when(predicate, effect));
    }

    public onUnmount()
    {
        this.listeners.forEach(listener => listener.element.removeEventListener(listener.type, listener.method));
        this.listeners = [];

        this.intervalTimers.forEach(timer => clearInterval(timer));
        this.intervalTimers = [];

        this.disposers.forEach(disposer => disposer());
        this.disposers = [];
    }

    public setInterval(handler: TimerHandler, timeout: number)
    {
        const timer = setInterval(handler, timeout);
        this.intervalTimers.push(timer);
    }
}

export default AutoCloser;
