

export class BaseActionMocked {
    constructor() {

    }

    request<T>(
        data?: any
    ): Promise<T> {
        let { promise } = this.later(2000, data);
        return promise as Promise<T>;
    }

    later<TRequest = any>(delay: number, value: any) {
        let timer: any = 0;
        let reject: any = null;
        const promise = new Promise<TRequest>((resolve, _reject) => {
            reject = _reject;
            timer = setTimeout(resolve, delay, value);
        });
        return {
            get promise() {
                return promise;
            },
            cancel() {
                if (timer) {
                    clearTimeout(timer);
                    timer = 0;
                    reject();
                    reject = null;
                }
            },
        };
    }
}
