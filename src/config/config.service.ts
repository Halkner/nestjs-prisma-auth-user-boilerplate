import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class ConfigService {
  private readonly env: Record<string, string | undefined>;

  constructor() {
    dotenv.config({ path: resolve(__dirname, '../../.env') });

    this.env = process.env;
  }

  /** Método para pegar um valor de ENV e definir um padrão caso não esteja definido */
  private get(key: string, defaultValue?: string): string {
    return this.env[key] ?? defaultValue ?? '';
  }

  /** Configuração do App */
  get app() {
    return {
      port: parseInt(this.get('APP_PORT', '3000'), 10),
    };
  }

  /** Configuração do Banco de Dados */
  get database() {
    const username = this.get('DB_USER', 'root');
    const password = this.get('DB_PASSWORD', '');
    const host = this.get('DB_HOST', 'localhost');
    const port = parseInt(this.get('DB_PORT', '3306'), 10);
    const name = this.get('DB_NAME', 'default_db');

    return {
      username,
      password,
      host,
      port,
      name,
      databaseUrl: `mysql://${username}:${password}@${host}:${port}/${name}`,
    };
  }
}
