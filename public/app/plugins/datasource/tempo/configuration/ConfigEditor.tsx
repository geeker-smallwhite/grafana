import { css } from '@emotion/css';
import React from 'react';

import { DataSourcePluginOptionsEditorProps, GrafanaTheme2 } from '@grafana/data';
import {
  AdvancedHttpSettings,
  Auth,
  ConfigSection,
  ConfigDescriptionLink,
  ConfigSubSection,
  ConnectionSettings,
  convertLegacyAuthProps,
  DataSourceDescription,
} from '@grafana/experimental';
import { config } from '@grafana/runtime';
import { SecureSocksProxySettings, useStyles2, Divider, Stack } from '@grafana/ui';

import { NodeGraphSection } from '../_importedDependencies/components/NodeGraphSettings';
import { SpanBarSection } from '../_importedDependencies/components/TraceView/SpanBarSettings';
import {
  TraceToLogsSection,
  TraceToMetricsSection,
  TraceToProfilesSection,
} from '../_importedDependencies/grafana-traces/src';

import { LokiSearchSettings } from './LokiSearchSettings';
import { QuerySettings } from './QuerySettings';
import { ServiceGraphSettings } from './ServiceGraphSettings';
import { TraceQLSearchSettings } from './TraceQLSearchSettings';

export type Props = DataSourcePluginOptionsEditorProps;

export const ConfigEditor = ({ options, onOptionsChange }: Props) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.container}>
      <DataSourceDescription
        dataSourceName="Tempo"
        docsLink="https://grafana.com/docs/grafana/latest/datasources/tempo"
        hasRequiredFields={false}
      />

      <Divider spacing={4} />
      <ConnectionSettings config={options} onChange={onOptionsChange} urlPlaceholder="http://localhost:3200" />

      <Divider spacing={4} />
      <Auth
        {...convertLegacyAuthProps({
          config: options,
          onChange: onOptionsChange,
        })}
      />

      <Divider spacing={4} />
      <TraceToLogsSection options={options} onOptionsChange={onOptionsChange} />

      <Divider spacing={4} />
      {config.featureToggles.traceToMetrics ? (
        <>
          <TraceToMetricsSection options={options} onOptionsChange={onOptionsChange} />
          <Divider spacing={4} />
        </>
      ) : null}

      {config.featureToggles.traceToProfiles && (
        <>
          <TraceToProfilesSection options={options} onOptionsChange={onOptionsChange} />
          <Divider spacing={4} />
        </>
      )}
      <ConfigSection
        title="Additional settings"
        description="Additional settings are optional settings that can be configured for more control over your data source."
        isCollapsible={true}
        isInitiallyOpen={false}
      >
        <Stack gap={5} direction="column">
          <AdvancedHttpSettings config={options} onChange={onOptionsChange} />

          {config.secureSocksDSProxyEnabled && (
            <>
              <SecureSocksProxySettings options={options} onOptionsChange={onOptionsChange} />
            </>
          )}

          <ConfigSubSection
            title="Service graph"
            description={
              <ConfigDescriptionLink
                description="Select a Prometheus data source that contains the service graph data."
                suffix="tempo/configure-tempo-data-source/#service-graph"
                feature="the service graph"
              />
            }
          >
            <ServiceGraphSettings options={options} onOptionsChange={onOptionsChange} />
          </ConfigSubSection>

          <NodeGraphSection options={options} onOptionsChange={onOptionsChange} />

          <ConfigSubSection
            title="Tempo search"
            description={
              <ConfigDescriptionLink
                description="Modify how traces are searched."
                suffix="tempo/configure-tempo-data-source/#tempo-search"
                feature="Tempo search"
              />
            }
          >
            <TraceQLSearchSettings options={options} onOptionsChange={onOptionsChange} />
          </ConfigSubSection>

          <ConfigSubSection
            title="Loki search"
            description={
              <ConfigDescriptionLink
                description="Select a Loki data source to search for traces. Derived fields must be configured in the Loki data source."
                suffix="tempo/configure-tempo-data-source/#loki-search"
                feature="Loki search"
              />
            }
          >
            <LokiSearchSettings options={options} onOptionsChange={onOptionsChange} />
          </ConfigSubSection>

          <ConfigSubSection
            title="TraceID query"
            description={
              <ConfigDescriptionLink
                description="Modify how TraceID queries are run."
                suffix="tempo/configure-tempo-data-source/#traceid-query"
                feature="the TraceID query"
              />
            }
          >
            <QuerySettings options={options} onOptionsChange={onOptionsChange} />
          </ConfigSubSection>

          <SpanBarSection options={options} onOptionsChange={onOptionsChange} />
        </Stack>
      </ConfigSection>
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  container: css`
    label: container;
    margin-bottom: ${theme.spacing(2)};
    max-width: 900px;
  `,
});
