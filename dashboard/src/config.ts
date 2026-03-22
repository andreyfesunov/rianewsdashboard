export interface ConfigEntry {
  readonly key: string;
  readonly defaultValue: string;
}

export const ExporterEnv: ConfigEntry = {
  key: 'EXPORTER_BASE_URL',
  defaultValue: 'http://127.0.0.1:8000',
};
