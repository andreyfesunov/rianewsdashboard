export interface ConfigEntry {
  readonly key: string;
  readonly defaultValue: string;
}

export const ExporterEnv: ConfigEntry = {
  key: 'EXPORTER_BASE_URL',
  defaultValue: 'http://localhost:8000',
};
