export interface Subscriber {
  update(context: string): Promise<void>
}