import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    content: { text?: string; html?: string },
  ) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      ...content,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new Error('Erro ao enviar email');
    }
  }

  async sendToDiagnostic(
    enterprise: string,
    name: string,
    surname: string,
    email: string,
    link: string,
  ) {
    const emailSend = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;
    if (!emailSend || !emailPass) {
      throw new Error('Credenciais de email não configuradas');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailSend, pass: emailPass },
    });

    const mailOption = {
      from: emailSend,
      to: 'levi.utima@gmail.com',
      subject: `Formulário de Diagnóstico Empresarial – ${enterprise} | Cliente: ${name} ${surname} (${email})`,
      text: `${link} - Acesse esta página para concluir o diagnóstico da empresa ${enterprise}`,
      html: `
      <h2>Novo Diagnóstico Empresarial</h2>
      <p><strong>Empresa:</strong> ${enterprise}</p>
      <p><strong>Cliente:</strong> ${name} ${surname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><a href="${link}" target="_blank">🔗 Acessar Diagnóstico</a></p>
    `,
    };

    try {
      console.log('📧 Enviando email para:', 'comercial@ncmconsultoria.com.br');
      await transporter.sendMail(mailOption); 
      console.log('✅ Email enviado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error.message);
      throw new Error(`Falha no envio de email: ${error.message}`);
    }
  }
}
