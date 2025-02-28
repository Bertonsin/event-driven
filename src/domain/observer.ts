export class Observer {
  handlers: { event: string, callback: Function }[]
  constructor() {
    this.handlers = []
  }

  register(event: string, callback: Function) {
    this.handlers.push({ event, callback })
  }

  notify(event: string, data: any) {
    this.handlers.forEach((handler) => {
      if (handler.event === event) {
        handler.callback(data)
      }
    })
  }
}