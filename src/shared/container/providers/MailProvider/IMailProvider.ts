interface IMailProvider {
  // sendMail(to: string, subject: string, body: string): Promise<void>;
  sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void>;
}

export { IMailProvider };
