export class SendMailUsecase {
  async execute({ email }: { email: string }) {
    console.log("Email sent to", email)
    return 'ok'
  }
}